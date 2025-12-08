import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import Logo from '../../../assets/logo.svg';
const Footer: React.FC = () => {
  const socialLinks = [
    { icon: 'FB', color: '#1877f2' },
    { icon: 'TW', color: '#1da1f2' },
    { icon: 'IG', color: '#e4405f' },
    { icon: 'YT', color: '#ff0000' },
    { icon: 'LI', color: '#0077b5' },
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
              <img src={Logo} alt="Cyber Rampart Logo" style={{ marginRight: '8px', width: '100px', height: '100px' }} />
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
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {social.icon}
                  </Typography>
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