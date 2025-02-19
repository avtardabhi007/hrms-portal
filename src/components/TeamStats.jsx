import React from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const TeamStats = () => {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2D3748' }}>
            46.5
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            avg hours / weeks
          </Typography>
          <Typography variant="body2" sx={{ color: '#4CAF50' }}>
            +0.5%
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
            <CircularProgress
              variant="determinate"
              value={80}
              size={64}
              thickness={4}
              sx={{ color: 'primary.main' }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                80%
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">Onsite team</Typography>
          <Typography variant="body2" sx={{ color: '#4CAF50' }}>
            +2.6%
          </Typography>
        </Box>
      </Box>

      <Box sx={{ height: 120, mt: 2 }}>
        <LineChart
          series={[
            {
              data: [6, 8, 7, 8, 6, 8, 7],
              color: '#7BC4A0',
              area: true,
              showMark: false,
            },
          ]}
          xAxis={[{ 
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            scaleType: 'point',
          }]}
          height={120}
          margin={{ top: 10, bottom: 20, left: 5, right: 5 }}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiAreaElement-root': {
              fillOpacity: 0.1,
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default TeamStats; 