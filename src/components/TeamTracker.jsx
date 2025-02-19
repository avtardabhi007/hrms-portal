import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';

const TeamTracker = () => {
  const theme = useTheme();

  const data = [
    { id: 0, value: 48, label: 'Designer', color: theme.palette.primary.main },
    { id: 1, value: 27, label: 'Developer', color: theme.palette.secondary.main },
    { id: 2, value: 18, label: 'Project manager', color: '#E2E8F0' }
  ];

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Track your team
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', height: 220, mt: 2 }}>
        <PieChart
          series={[
            {
              data,
              innerRadius: 80,
              paddingAngle: 2,
              cornerRadius: 4,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 80, additionalRadius: -30 },
            },
          ]}
          height={220}
        />
        <Typography
          variant="h3"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 600,
          }}
        >
          120
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        Total members
      </Typography>

      <Box sx={{ mt: 3 }}>
        {data.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                }}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {item.value} members
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default TeamTracker; 