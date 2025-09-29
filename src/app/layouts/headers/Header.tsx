import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Security } from '@mui/icons-material';

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Security sx={{ mr: 1, color: '#06b6d4' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            CYBER RAMPART
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          <Button color="inherit">Trang chủ</Button>
          <Button color="inherit">Khóa học</Button>
          <Button color="inherit">Bảng giá</Button>
          <Button color="inherit">Câu hỏi thường gặp</Button>
          <Button color="inherit">Về chúng tôi</Button>
          <Button color="inherit">Đăng nhập</Button>
        </Box>
        <Button 
          variant="contained" 
          sx={{ 
            ml: 2, 
            backgroundColor: '#f472b6', 
            '&:hover': { backgroundColor: '#ec4899' },
            borderRadius: '25px'
          }}
        >
          Đăng ký ngay
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;