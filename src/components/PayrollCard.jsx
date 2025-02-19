import React from 'react';
import { Box, Paper, Typography, Avatar, Chip } from '@mui/material';

const PayrollCard = () => {
  const payrollItems = [
    {
      name: 'Syafarah san',
      amount: '$2,540.00',
      status: 'Waiting',
      date: 'Today',
      avatar: '/avatar1.jpg'
    },
    {
      name: 'Devon Lane',
      amount: '$2,540.00',
      status: 'Done',
      date: 'Today',
      avatar: '/avatar2.jpg'
    },
    {
      name: 'Marvin McKinney',
      amount: '$2,540.00',
      status: 'Done',
      date: 'Yesterday',
      avatar: '/avatar3.jpg'
    },
    {
      name: 'Eleanor Pena',
      amount: '$2,540.00',
      status: 'Failed',
      date: 'Yesterday',
      avatar: '/avatar4.jpg'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'success';
      case 'Waiting':
        return 'warning';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Payroll monthly
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Salaries and incentive
      </Typography>

      <Box sx={{ mt: 3 }}>
        {payrollItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              py: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={item.avatar} />
              <Box>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.amount}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {item.date}
              </Typography>
              <Chip
                label={item.status}
                color={getStatusColor(item.status)}
                size="small"
                sx={{ minWidth: 80 }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default PayrollCard; 