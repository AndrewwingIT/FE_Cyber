import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, 
  Avatar, Menu, MenuItem, Divider 
} from '@mui/material';
import { 
  AccountCircle as AccountIcon, 
  Settings as SettingsIcon, 
  ExitToApp as LogoutIcon 
} from '@mui/icons-material';
import logo from '../../../assets/logo.svg';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token trong sessionStorage
    const token = sessionStorage.getItem('token');
    const email = sessionStorage.getItem('userEmail');
    const role = sessionStorage.getItem('userRole');
    const name = sessionStorage.getItem('userName');
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(email || 'User');
      setUserRole(role || 'User');
      setUserName(name || 'User');
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole('');
    setUserName('');
    setAnchorEl(null);
    toast.success("Đăng xuất thành công!");
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={logo} alt="Cyber Rampart Logo" style={{ marginRight: '8px', width: '100px', height: '100px' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            CYBER RAMPART
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button color="inherit" component={RouterLink} to="/">Trang chủ</Button>
          <Button color="inherit">Khóa học</Button>
          <Button color="inherit" component={RouterLink} to="/price">Bảng giá</Button>
          <Button color="inherit">Câu hỏi thường gặp</Button>
          <Button color="inherit">Về chúng tôi</Button>
          {!isAuthenticated && (
            <Button color="inherit" component={RouterLink} to="/login">Đăng nhập</Button>
          )}
        </Box>
        
        {/* Thêm khoảng cách giữa navigation và user menu */}
        <Box sx={{ flexGrow: isAuthenticated ? 0 : 1 }} />
        
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                display: { xs: 'none', sm: 'block' }, 
                color: userRole === 'Admin' ? '#3b82f6' : '#f472b6',
                fontWeight: 700,
                fontSize: '16px',
                textShadow: userRole === 'Admin' ? '0 0 10px rgba(59, 130, 246, 0.5)' : '0 0 10px rgba(244, 114, 182, 0.5)',
                letterSpacing: '0.5px',
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              Welcome, {userRole === 'Admin' ? 'Admin' : 'User'}
            </Typography>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: userRole === 'Admin' ? '#3b82f6' : '#f472b6'
              }}>
                {userRole === 'Admin' ? 'A' : (userName || userEmail).charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableScrollLock={true}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  mt: 1.5,
                  minWidth: '200px',
                  maxWidth: '250px',
                  transform: 'translateX(-50px) !important'
                },
                '& .MuiList-root': {
                  padding: '8px 0'
                }
              }}
            >
              {userRole === 'Admin' && (
                <MenuItem 
                  onClick={() => {
                    handleClose();
                    navigate('/admin');
                  }}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    '&:hover': { 
                      backgroundColor: '#eff6ff' 
                    }
                  }}
                >
                  <SettingsIcon sx={{ mr: 2, color: '#3b82f6', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937' }}>Admin Dashboard</Typography>
                </MenuItem>
              )}
              <MenuItem 
                onClick={handleClose} 
                sx={{ 
                  py: 1.5,
                  px: 2,
                  '&:hover': { 
                    backgroundColor: '#f1f5f9' 
                  }
                }}
              >
                <AccountIcon sx={{ mr: 2, color: '#64748b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937' }}>Profile</Typography>
              </MenuItem>
              <MenuItem 
                onClick={handleClose}
                sx={{ 
                  py: 1.5,
                  px: 2,
                  '&:hover': { 
                    backgroundColor: '#f1f5f9' 
                  }
                }}
              >
                <SettingsIcon sx={{ mr: 2, color: '#64748b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937' }}>Settings</Typography>
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem 
                onClick={handleLogout}
                sx={{ 
                  py: 1.5,
                  px: 2,
                  '&:hover': { 
                    backgroundColor: '#fef2f2',
                    '& .MuiSvgIcon-root': { color: '#dc2626' },
                    '& .MuiTypography-root': { color: '#dc2626' }
                  }
                }}
              >
                <LogoutIcon sx={{ mr: 2, color: '#64748b', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            variant="contained"
            component={RouterLink}
            to="/register"
            sx={{
              ml: 2,
              backgroundColor: '#f472b6',
              '&:hover': { backgroundColor: '#ec4899' },
              borderRadius: '25px'
            }}
          >
            Đăng ký ngay
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;