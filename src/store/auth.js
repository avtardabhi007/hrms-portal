import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pmsdivol.com/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          first_name: userData.firstName,
          last_name: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(
          data.error || data.message || "Registration failed"
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Login thunk with token handling
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pmsdivol.com/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Store token in localStorage
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Password reset with token
export const requestPasswordReset = createAsyncThunk(
  "auth/requestReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pmsdivol.com/request_reset.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message || "Password reset request failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// Create an API instance for authenticated requests
export const createApiRequest = async (endpoint, options = {}) => {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeader(),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    success: false,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.success = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        const userData = payload.data || payload;
        state.user = userData.user;
        state.token = userData.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", userData.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(requestPasswordReset.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

// Export actions
export const { setCredentials, logout, clearError } = authSlice.actions;

// Export selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthSuccess = (state) => state.auth.success;

// Export reducer
export default authSlice.reducer;
