import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  requestPasswordReset,
  selectAuthLoading,
  selectAuthError,
  selectAuthSuccess,
  clearError,
} from "../../store/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(requestPasswordReset(email));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        p: 3,
      }}
    >
      <Paper
        sx={{
          maxWidth: 480,
          width: "100%",
          p: 4,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Link
            component="button"
            onClick={() => navigate("/login")}
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "text.secondary",
              mb: 3,
            }}
          >
            <ArrowBack fontSize="small" />
            Back to login
          </Link>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Forgot Password?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No worries, we'll send you reset instructions.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              mb: 2,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </Box>

        <Snackbar
          open={!!error || !!success}
          autoHideDuration={6000}
          onClose={() => dispatch(clearError())}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => dispatch(clearError())}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error ||
              (success
                ? "Password reset instructions sent to your email!"
                : "")}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
