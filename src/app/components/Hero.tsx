import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Download } from '@mui/icons-material';

const Hero: React.FC = () => {
  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      pt: 12, pb: 8, minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      width: '100%'
    }}>
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 4,
          width: '100%'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" sx={{ mb: 3, color: '#ffffff', fontWeight: 700 }}>
              Cyber Rampart cho Windows
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, color: '#94a3b8' }}>
              Chặn đường link giả mạo trong các trình duyệt và ứng dụng.
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, color: '#94a3b8' }}>
              Bảo vệ người dùng khỏi lừa đảo.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: '#94a3b8' }}>
              Tải và dùng thử ngay để có trải nghiệm tốt nhất!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              sx={{
                backgroundColor: '#000000',
                color: 'white',
                px: 4, py: 2,
                fontSize: '1.1rem',
                borderRadius: '12px',
                '&:hover': { backgroundColor: '#333333' }
              }}
            >
              Tải xuống
            </Button>
          </Box>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box sx={{
              width: 300, height: 300,
              backgroundColor: '#06b6d4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: '4rem',
            }}>
              🦊
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;