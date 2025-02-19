import React from 'react';
import { Box, Paper, Typography, Avatar, Button, LinearProgress, useTheme } from '@mui/material';
import { VideoCall } from '@mui/icons-material';

const TalentRecruitment = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Talent recruitment
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 3 }}>
        <Avatar src="/candidate1.jpg" sx={{ width: 48, height: 48 }} />
        <Avatar src="/candidate2.jpg" sx={{ width: 48, height: 48 }} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<VideoCall />}
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          Join call
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">120 Talent</Typography>
          <Typography variant="body2">80 Talent</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={75}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#E2E8F0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" sx={{ color: theme.palette.success.main }}>
            Matched
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Not match
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 16,
              height: 16,
              borderRadius: 1,
              backgroundColor: index < 8 ? theme.palette.primary.main : '#E2E8F0',
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default TalentRecruitment; 