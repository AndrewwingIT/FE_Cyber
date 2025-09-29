import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { Security, Speed, WebAsset, Engineering } from '@mui/icons-material';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Security />,
      title: 'Bảo vệ quyền riêng tư',
      description: 'Trình chắn quảng cáo Cyber Rampart bảo vệ dữ liệu của bạn và đảm bảo an toàn',
      color: '#ffffff'
    },
    {
      icon: <Speed />,
      title: 'Tiết kiệm thời gian',
      description: 'Trình chặn Cyber Rampart bảo vệ người dùng và giúp tiết kiệm thời gian',
      color: '#ffffff'
    },
    {
      icon: <WebAsset />,
      title: 'Bảo vệ duyệt web',
      description: 'Trình chặn quảng cáo Cyber Rampart bảo vệ khỏi các trang web lừa đảo và độc hại',
      color: '#2563eb'
    },
    {
      icon: <Engineering />,
      title: 'Công nghệ hàng đầu',
      description: 'Trình chặn quảng cáo Cyber Rampart sử dụng những công nghệ tiên tiến nhất đến đầu là AI',
      color: '#2563eb'
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" sx={{ 
          mb: 6, color: '#1e293b', fontWeight: 'bold' 
        }}>
          Bảo vệ thông tin an toàn và dễ sử dụng!
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3, 
          justifyContent: 'center' 
        }}>
          {features.map((feature, index) => (
            <Card key={index} sx={{ 
              width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 12px)' },
              minWidth: '250px',
              backgroundColor: feature.color,
              color: feature.color === '#ffffff' ? '#1e293b' : '#ffffff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              borderRadius: '16px',
              p: 2
            }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  {React.cloneElement(feature.icon, { 
                    sx: { 
                      fontSize: 40, 
                      color: feature.color === '#ffffff' ? '#2563eb' : '#ffffff' 
                    } 
                  })}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;