import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { Security, Facebook, Twitter, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Facebook />, color: '#1877f2' },
    { icon: <Twitter />, color: '#1da1f2' },
    { icon: <Instagram />, color: '#e4405f' },
    { icon: <YouTube />, color: '#ff0000' },
    { icon: <LinkedIn />, color: '#0077b5' },
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: '#1e293b' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          gap: 4 
        }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ mr: 1, color: '#06b6d4' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#f472b6' }}>
                CYBER RAMPART
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
              Được cung cấp bởi FPTU, được xây dựng bởi Airborne Infantry | Bản quyền sử dụng
            </Typography>
          </Box>
          <Box sx={{ flex: 0 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: social.color,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;