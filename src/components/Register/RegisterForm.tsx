import React, { useState } from 'react';
import {
  Paper, Stack, TextField, Button, IconButton, InputAdornment, Divider, Typography, Box
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Apple, Facebook } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  // Check for at least one uppercase and one lowercase letter
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  return hasUpperCase && hasLowerCase;
};

const handleRegister = async () => {
  if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    toast.error("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (!isValidEmail(email)) {
    toast.error("Email không hợp lệ!");
    return;
  }
  if (password !== confirmPassword) {
    toast.error("Mật khẩu xác nhận không khớp!");
    return;
  }
  if (password.length < 6) {
    toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
    return;
  }
  if (!isValidPassword(password)) {
    toast.error("Mật khẩu phải chứa ít nhất một chữ in hoa và một chữ thường!");
    return;
  }
  setLoading(true);
  try {
    await axiosInstance.post('/api/Auth/register', {
      tenantId: 0,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    });
    toast.success("Đăng ký thành công!");
    navigate("/login");
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Đăng ký thất bại!";
    toast.error(errorMessage);
    console.error("Error details:", error.response?.data);
  } finally {
    setLoading(false);
  }
};
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      gap: { xs: 6, md: 10 }
    }}>
      <Box sx={{ width: { xs: '100%', md: 420 }, display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={8} sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(28,28,28,0.92)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)'
        }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Họ"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Tên"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Nhập Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
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
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Xác nhận mật khẩu"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(p => !p)} edge="end" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
              sx={{ '& .MuiOutlinedInput-root': { color: '#fff' } }}
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
                '&:hover': { backgroundColor: '#2563eb' },
              }}
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng kí'}
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
                '&:hover': { background: 'rgba(60,60,60,0.9)' }
              }}>
                FACEBOOK
              </Button>
            </Stack>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.75)', mt: 1 }}>
              Đã có tài khoản? <Link to="/login" style={{ color: '#60a5fa', fontWeight: 600 }}>Đăng nhập</Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterForm;