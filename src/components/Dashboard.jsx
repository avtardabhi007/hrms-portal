import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
} from "@mui/material";
import { Add, Search, NotificationsOutlined, Email } from "@mui/icons-material";
import ProfileCard from "./ProfileCard";
import TeamStats from "./TeamStats";
import TeamTracker from "./TeamTracker";
import TalentRecruitment from "./TalentRecruitment";
import PayrollCard from "./PayrollCard";

const Dashboard = () => {
  return (
    <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "white",
          py: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "primary.main",
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  "& button": {
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    padding: "6px 12px",
                  },
                }}
              >
                <IconButton>Dashboard</IconButton>
                <IconButton>Calendar</IconButton>
                <IconButton>Projects</IconButton>
                <IconButton>Team</IconButton>
                <IconButton>Documents</IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 2,
                  padding: "4px 12px",
                }}
              >
                <Search sx={{ color: "text.secondary", mr: 1 }} />
                <InputBase placeholder="Search..." />
              </Box>
              <IconButton>
                <Badge badgeContent={2} color="error">
                  <Email />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsOutlined />
                </Badge>
              </IconButton>
              <Avatar sx={{ width: 32, height: 32 }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Portal / Dashboard
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              Good morning Jhon
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <IconButton
              sx={{
                border: "1px solid #eee",
                borderRadius: 2,
                padding: "8px 16px",
              }}
            >
              <Add sx={{ mr: 1 }} />
              <Typography variant="body2">Add widget</Typography>
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid #eee",
                borderRadius: 2,
                padding: "8px 16px",
              }}
            >
              18 - 22 November
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: 2,
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Add report
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ProfileCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <TeamStats />
          </Grid>
          <Grid item xs={12} md={4}>
            <TeamTracker />
          </Grid>
          <Grid item xs={12} md={4}>
            <TalentRecruitment />
          </Grid>
          <Grid item xs={12} md={4}>
            <PayrollCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
