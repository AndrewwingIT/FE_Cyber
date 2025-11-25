import React from 'react';
import {
  Box, Container, Typography, Stack, Toolbar
} from '@mui/material';
import Header from './headers/Header';

interface AuthLayoutProps {
  mode: 'login' | 'register';
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ mode, children }) => {
  const isRegister = mode === 'register';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'radial-gradient(80% 60% at 20% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 60%), radial-gradient(70% 50% at 90% 10%, rgba(255,200,0,0.1) 0%, rgba(0,0,0,0) 50%), #0b0b0b',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        pt: 0,
      }}
    >
      <Header />
      <Toolbar />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: { xs: 4, md: 8 } }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isRegister ? (
              <img
                src="/images/register.jpg" 
                alt="Tạo tài khoản"
                style={{ maxWidth: '100%', width: 500, borderRadius: 12 }}
              />
            ) : (
              <Stack spacing={2}>
                <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>
                  Chào mừng trở lại
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>
                  của bạn tại đây!
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>
                  Đăng nhập để tiếp tục khám phá Cyber Rampart.
                </Typography>
              </Stack>
            )}
          </Box>
          <Box sx={{ width: { xs: '100%', md: 420 } }}>
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;