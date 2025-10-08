import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Divider,
  Toolbar,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple, Facebook } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Header from '../../app/layouts/headers/Header';

interface AuthFormProps {
  mode: 'login' | 'register';
}

const RegisterForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      {/* Spacer to offset fixed AppBar so content starts at the same Y on all pages */}
      <Toolbar />
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 8 },
          minHeight: 600,
        }}>
          {/* Left side: chỉ hình lớn */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 500,
          }}>
            <img
                src="/images/register.jpg"
                alt="Register Illustration"
                style={{
                    width: '100%',
                    maxWidth: '520px',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
                    background: 'transparent',
                }}
            />
          </Box>
          {/* Right side: form */}
          <Box sx={{ width: { xs: '100%', md: 420 }, zIndex: 3 }}>
            <Paper elevation={8} sx={{ p: 3, borderRadius: 3, backgroundColor: 'rgba(28,28,28,0.9)', backdropFilter: 'blur(6px)' }}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Nhập Email"
                  type="email"
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Nhập mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((p) => !p)} edge="end" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                  sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
                />

                {isRegister && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Xác nhận mật khẩu"
                    type={showConfirm ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirm((p) => !p)} edge="end" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
                    sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
                  />
                )}

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{
                    mt: 1,
                    backgroundColor: '#3b82f6',
                    borderRadius: 2,
                    py: 1.2,
                    fontWeight: 700,
                    '&:hover': { backgroundColor: '#2563eb' },
                  }}
                >
                  {isRegister ? 'Đăng kí' : 'Đăng nhập'}
                </Button>

                <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.12)' }}>Hoặc tiếp tục với</Divider>

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button variant="outlined" startIcon={<Google />} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                    Google
                  </Button>
                  <Button variant="outlined" startIcon={<Apple />} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                    Apple
                  </Button>
                  <Button variant="outlined" startIcon={<Facebook />} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                    Facebook
                  </Button>
                </Stack>

                <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)' }}>
                  {isRegister ? (
                    <>Đã có tài khoản? <Link to="/login" style={{ color: '#60a5fa' }}>Đăng nhập</Link></>
                  ) : (
                    <>Chưa có tài khoản? <Link to="/register" style={{ color: '#60a5fa' }}>Đăng kí</Link></>
                  )}
                </Typography>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterForm;
