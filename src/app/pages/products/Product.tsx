import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Download } from '@mui/icons-material';

const Product: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#0f172a' }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          gap: 4 
        }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{
              width: '100%', height: 300,
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}>
              👥 People Image
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ mb: 3, color: '#ffffff', fontWeight: 'bold' }}>
              Cyber Rampart cho Browser
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#94a3b8', lineHeight: 1.8 }}>
              Cyber Rampart cho Windows vượt xa một trình chặn đường link giả mạo.
              Đây là một công cụ mạnh mẽ, đa chức năng, gọi gọn tất cả những tính
              năng thên chốt để bạn tận hưởng trải nghiệm web hoàn hảo: chặn triệt để
              link giả mạo và các trang nguy hiểm, tăng tốc duyệt web, và đảm bảo an
              toàn cho con trẻ khi trực tuyến.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Download />}
                sx={{
                  backgroundColor: '#000000',
                  px: 4, py: 2,
                  borderRadius: '12px',
                }}
              >
                Tải xuống
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  px: 4, py: 2,
                  borderRadius: '12px',
                  '&:hover': { borderColor: '#06b6d4', color: '#06b6d4' }
                }}
              >
                Đọc thêm
              </Button>
            </Box>
          </Box>
        </Box>
        
        {/* Network visualization placeholder */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Box sx={{
            width: { xs: 250, md: 400 },
            height: { xs: 250, md: 400 },
            backgroundColor: '#1e293b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '2rem',
          }}>
            🌐 Network
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Product;