import React, { useState } from 'react';
import {
  Paper, Stack, TextField, Button, IconButton, InputAdornment, Divider, Typography
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple, Facebook } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/Auth/login', { email, password });
      if (res.data?.token) {
        sessionStorage.setItem('token', res.data.token);
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error("Không nhận được token!");
      }
    } catch {
      toast.error("Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={8} sx={{
      p: 4,
      borderRadius: 4,
      backgroundColor: 'rgba(28,28,28,0.92)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Nhập Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          InputLabelProps={{
            sx: {
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: 16
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: 16
            }
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Nhập mật khẩu"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(p => !p)} edge="end" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            sx: {
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: 16
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: 16
            }
          }}
        />
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
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 17,
            letterSpacing: 1,
            '&:hover': { backgroundColor: '#2563eb' },
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
        <Divider
          sx={{
            my: 2,
            borderColor: 'rgba(255,255,255,0.18)',
            background: 'rgba(60,60,60,0.7)',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'Montserrat, sans-serif',
            '&::before, &::after': {
              borderTop: '1.5px solid rgba(255,255,255,0.18)',
            },
          }}
        >
          Hoặc tiếp tục với
        </Divider>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined" startIcon={<Google />} sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.3)',
            fontWeight: 700,
            px: 2,
            background: 'rgba(40,40,40,0.7)',
            fontFamily: 'Montserrat, sans-serif',
            '&:hover': { background: 'rgba(60,60,60,0.9)' }
          }}>
            GOOGLE
          </Button>
          <Button variant="outlined" startIcon={<Apple />} sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.3)',
            fontWeight: 700,
            px: 2,
            background: 'rgba(40,40,40,0.7)',
            fontFamily: 'Montserrat, sans-serif',
            '&:hover': { background: 'rgba(60,60,60,0.9)' }
          }}>
            APPLE
          </Button>
          <Button variant="outlined" startIcon={<Facebook />} sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.3)',
            fontWeight: 700,
            px: 2,
            background: 'rgba(40,40,40,0.7)',
            fontFamily: 'Montserrat, sans-serif',
            '&:hover': { background: 'rgba(60,60,60,0.9)' }
          }}>
            FACEBOOK
          </Button>
        </Stack>
        <Typography variant="body2" sx={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.75)',
          mt: 1,
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500
        }}>
          Chưa có tài khoản? <Link to="/register" style={{ color: '#60a5fa', fontWeight: 600 }}>Đăng kí</Link>
        </Typography>
      </Stack>
    </Paper>
  );
};

export default LoginForm;