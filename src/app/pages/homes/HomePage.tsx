import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, CssBaseline, Toolbar } from '@mui/material';
import { Download, Security, Speed, WebAsset, Engineering } from '@mui/icons-material';
import Header from '../../layouts/headers/Header';
import Footer from '../../layouts/footers/Footer';

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Header */}
      <Header />
      {/* Fixed AppBar spacer */}
      <Toolbar />

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        pt: 4, pb: 8, minHeight: '100vh',
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

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ 
            mb: 6, color: '#1e293b', fontWeight: 'bold' 
          }}>
            Bảo vệ thông tin an toàn và dễ sử dụng!
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {[ 
              { Icon: Security, title: 'Bảo vệ quyền riêng tư', desc: 'Trình chắn quảng cáo Cyber Rampart bảo vệ dữ liệu của bạn và đảm bảo an toàn', color: '#ffffff' },
              { Icon: Speed, title: 'Tiết kiệm thời gian', desc: 'Trình chặn Cyber Rampart bảo vệ người dùng và giúp tiết kiệm thời gian', color: '#ffffff' },
              { Icon: WebAsset, title: 'Bảo vệ duyệt web', desc: 'Trình chặn quảng cáo Cyber Rampart bảo vệ khỏi các trang web lừa đảo và độc hại', color: '#2563eb' },
              { Icon: Engineering, title: 'Công nghệ hàng đầu', desc: 'Trình chặn quảng cáo Cyber Rampart sử dụng những công nghệ tiên tiến nhất đến đầu là AI', color: '#2563eb' },
            ].map(({ Icon, title, desc, color }, idx) => (
              <Card key={idx} sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
                minWidth: '250px',
                backgroundColor: color,
                color: color === '#ffffff' ? '#1e293b' : '#ffffff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                p: 2
              }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Icon sx={{ fontSize: 40, color: color === '#ffffff' ? '#2563eb' : '#ffffff' }} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {title}
                  </Typography>
                  <Typography variant="body2">{desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Product Section */}
      <Box sx={{ py: 8, backgroundColor: '#0f172a' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
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
                Cyber Rampart cho Windows vượt xa một trình chặn đường link giả mạo. Đây là một công cụ mạnh mẽ, đa chức năng, gọi gọn tất cả những tính năng thên chốt để bạn tận hưởng trải nghiệm web hoàn hảo: chặn triệt để link giả mạo và các trang nguy hiểm, tăng tốc duyệt web, và đảm bảo an toàn cho con trẻ khi trực tuyến.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" startIcon={<Download />} sx={{ backgroundColor: '#000000', px: 4, py: 2, borderRadius: '12px' }}>
                  Tải xuống
                </Button>
                <Button variant="outlined" size="large" sx={{ borderColor: '#ffffff', color: '#ffffff', px: 4, py: 2, borderRadius: '12px', '&:hover': { borderColor: '#06b6d4', color: '#06b6d4' } }}>
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

      {/* CTA Section */}
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

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;

