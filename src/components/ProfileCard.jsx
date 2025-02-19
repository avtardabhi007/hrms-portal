import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import { Phone, Email } from '@mui/icons-material';

const ProfileCard = () => {
  const theme = useTheme();
  
  return (
    <Paper 
      sx={{ 
        p: 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, #ffffff 100%)`,
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ position: 'relative', width: 'fit-content' }}>
          <Avatar
            sx={{ 
              width: 140, 
              height: 140, 
              mb: 2,
              border: '4px solid white',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}
            alt="Chris Jonathan"
            src="/profile-image.jpg"
          />
          <Chip
            label="4+ years experience"
            size="small"
            sx={{
              position: 'absolute',
              bottom: 24,
              left: 8,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              height: 24,
              '& .MuiChip-label': {
                px: 1,
                fontSize: '0.75rem'
              }
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
          Chris Jonathan
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          General manager
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            size="small"
            sx={{ 
              border: '1px solid #eee',
              borderRadius: 2,
              width: 36,
              height: 36,
              backgroundColor: 'white'
            }}
          >
            <Phone sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              border: '1px solid #eee',
              borderRadius: 2,
              width: 36,
              height: 36,
              backgroundColor: 'white'
            }}
          >
            <Email sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileCard; 