import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CTA: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2, color: '#1e293b', fontWeight: 'bold' }}>
            Trình chặn link giả mạo Cyber Rampart:
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, color: '#1e293b', fontWeight: 'bold' }}>
            Cài đặt và dùng thử miễn phí
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#64748b' }}>
            Hãy tham gia cùng chúng tôi để bảo vệ quyền riêng tư của mình bạn thân
            bằng các sản phẩm của Cyber Rampart!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CTA;