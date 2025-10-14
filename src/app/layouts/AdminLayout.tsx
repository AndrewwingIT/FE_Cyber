import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Avatar,
  Divider
} from '@mui/material';
import {
  ExitToApp as LogoutIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: '#1e293b',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Cyber Rampart Admin
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Welcome, Admin
            </Typography>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#3b82f6' }}>
                A
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
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Profile</Typography>
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
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Settings</Typography>
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
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Spacer for fixed AppBar */}
      <Toolbar />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 2, 
          px: 3, 
          bgcolor: '#f8fafc', 
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Cyber Rampart Admin Panel. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminLayout;