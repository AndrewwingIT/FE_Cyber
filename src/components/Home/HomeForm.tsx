import React, { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Avatar, Rating, Stack } from '@mui/material';
import PriceCard from '../Pricing/PriceCard';
import Miki from '../../assets/miki.svg';
import ThumbConcept from '../../assets/thumb-concept-9.svg';

const HomeForm: React.FC = () => {
  const [plan, setPlan] = useState<"month" | "year">("month");
  
  const priceData = [
    {
      title: "FREE",
      price: "FREE",
      features: [
        { text: "Quyền truy cập vào các khóa học dành cho người mới bắt đầu.", active: true },
        { text: "Kiến thức cơ bản về nhận diện lừa đảo trực tuyến và thủ thuật lừa đảo.", active: true },
        { text: "Các bài thực hành tốt nhất để duyệt web an toàn.", active: true },
        { text: "Quyền truy cập diễn đàn cộng đồng.", active: false },
      ],
    },
    {
      title: "BASIC",
      price: plan === "month" ? "$28" : "$280",
      subPrice: plan === "month" ? "/Tháng" : "/Năm",
      features: [
        { text: "Quyền truy cập vào các khóa học dành cho người mới bắt đầu.", active: true },
        { text: "Kiến thức cơ bản về nhận diện lừa đảo trực tuyến và thủ thuật lừa đảo.", active: true },
        { text: "Các bài thực hành tốt nhất để duyệt web an toàn.", active: true },
        { text: "Quyền truy cập diễn đàn cộng đồng.", active: true },
      ],
    },
    {
      title: "PLUS",
      price: plan === "month" ? "$35" : "$350",
      subPrice: plan === "month" ? "/Tháng" : "/Năm",
      highlight: true,
      features: [
        { text: "Mọi thứ đều đơn giản.", active: true },
        { text: "Quyền truy cập vào các khóa học cấp độ trung cấp.", active: true },
        { text: "Hướng dẫn và danh sách kiểm tra có thể tải xuống.", active: true },
        { text: "Bản tin cảnh báo lừa đảo hàng tháng.", active: true },
        { text: "✔️ Chứng chỉ hoàn thành.", active: false },
      ],
    },
    {
      title: "PREMIUM",
      price: plan === "month" ? "$49" : "$490",
      subPrice: plan === "month" ? "/Tháng" : "/Năm",
      features: [
        { text: "Tất cả những gì có trong gói Plus.", active: true },
        { text: "Quyền truy cập vào các khóa học cấp độ nâng cao.", active: true },
        { text: "Đánh giá rủi ro được cá nhân hóa.", active: true },
        { text: "Hỗ trợ hỏi đáp ưu tiên.", active: true },
        { text: "Tư vấn chuyên gia 1 kèm 1.", active: true },
      ],
    },
  ];
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)'
    }}>
      {/* Hero Section - Đúng theo ảnh home.svg */}
      <Container maxWidth="xl" sx={{ pt: 8, pb: 6 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            minHeight: '500px',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4
          }}
        >
          {/* Left side - Text content */}
          <Box sx={{ flex: 1, maxWidth: { md: '50%' } }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#1e293b',
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
                mb: 3
              }}
            >
              Bảo vệ thông tin an toàn và dễ sử dụng!
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#64748b',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Bảo vệ toàn diện cho máy tính của bạn khỏi mọi mối đe dọa từ internet. 
              Giải pháp bảo mật hàng đầu với công nghệ tiên tiến nhất.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#0ea5e9',
                  '&:hover': { bgcolor: '#0284c7' },
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                Dùng thử miễn phí
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: '#0ea5e9',
                  color: '#0ea5e9',
                  '&:hover': { borderColor: '#0284c7', bgcolor: '#f0f9ff' },
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                Xem thêm thông tin
              </Button>
            </Box>
          </Box>

          {/* Right side - Miki mascot */}
          <Box sx={{ flex: 1, textAlign: 'center', maxWidth: { md: '50%' } }}>
            <Box
              sx={{
                width: { xs: 250, md: 350 },
                height: { xs: 250, md: 350 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                position: 'relative'
              }}
            >
              <img 
                src={Miki} 
                alt="Miki - Cyber Rampart Mascot" 
                style={{
                  width: '170%',
                  height: '170%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Features Section - 4 cards như trong ảnh */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          {/* Feature Card 1 - White background */}
          <Card sx={{ 
            minWidth: 250, 
            maxWidth: 280, 
            textAlign: 'center',
            bgcolor: 'white',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: '#0ea5e9', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography sx={{ color: 'white', fontSize: '1.5rem' }}>🛡️</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                Bảo vệ chuyên sâu toàn diện
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.5 }}>
                Giám sát và ngăn chặn mọi mối đe dọa trước khi chúng có thể gây hại cho hệ thống của bạn.
              </Typography>
            </CardContent>
          </Card>

          {/* Feature Card 2 - White background */}
          <Card sx={{ 
            minWidth: 250, 
            maxWidth: 280, 
            textAlign: 'center',
            bgcolor: 'white',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: '#0ea5e9', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography sx={{ color: 'white', fontSize: '1.5rem' }}>⚡</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
                Tăng tốc hoạt động
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.5 }}>
                Tối ưu hóa hiệu suất hệ thống để đem lại trải nghiệm sử dụng tối ưu nhất.
              </Typography>
            </CardContent>
          </Card>

          {/* Feature Card 3 - Blue background */}
          <Card sx={{ 
            minWidth: 250, 
            maxWidth: 280, 
            textAlign: 'center',
            bgcolor: '#0ea5e9',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'white', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography sx={{ color: '#0ea5e9', fontSize: '1.5rem' }}>🎯</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Dễ dàng thiết lập
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.9 }}>
                Cài đặt nhanh chóng và đơn giản với giao diện thân thiện người dùng.
              </Typography>
            </CardContent>
          </Card>

          {/* Feature Card 4 - Blue background */}
          <Card sx={{ 
            minWidth: 250, 
            maxWidth: 280, 
            textAlign: 'center',
            bgcolor: '#0ea5e9',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                width: 60, 
                height: 60, 
                bgcolor: 'white', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Typography sx={{ color: '#0ea5e9', fontSize: '1.5rem' }}>💼</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Hỗ trợ khách hàng
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.5, opacity: 0.9 }}>
                Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giúp đỡ bạn 24/7.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Browser Protection Section với ảnh gia đình */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            minHeight: '400px',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4
          }}
        >
          {/* Left side - Ảnh gia đình */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              sx={{
                width: { xs: 300, md: 400 },
                height: { xs: 250, md: 300 },
                borderRadius: '12px',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f8fafc',
                border: '2px solid #e2e8f0',
                overflow: 'hidden'
              }}
            >
              <img 
                src={ThumbConcept} 
                alt="Family Protection Concept" 
                style={{
                  width: '137%',
                  height: '137%',
                  marginLeft: '75px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </Box>
          </Box>

          {/* Right side - Content với scattered avatars */}
          <Box sx={{ flex: 1, maxWidth: { md: '50%' }, position: 'relative' }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#1e293b',
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                lineHeight: 1.3,
                mb: 3
              }}
            >
              Cyber Rampart cho Browser
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b',
                fontSize: '1rem',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Cyber Rampart cho Windows được tạo ra với chỉ một mục đích duy nhất: Bảo vệ máy tính của bạn khỏi phần mềm độc hại, virus và các mối đe dọa từ internet. Với công nghệ tiên tiến và giao diện thân thiện, chúng tôi cam kết mang đến cho bạn sự an tâm tuyệt đối khi sử dụng máy tính.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  bgcolor: '#1e293b',
                  '&:hover': { bgcolor: '#334155' },
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                Tải xuống
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ 
                  borderColor: '#1e293b',
                  color: '#1e293b',
                  '&:hover': { borderColor: '#334155', bgcolor: '#f8fafc' },
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold'
                }}
              >
                Đọc thêm
              </Button>
            </Box>

            {/* Scattered user avatars như trong ảnh */}
            {/* <Box sx={{ position: 'absolute', right: -50, top: 50, display: { xs: 'none', md: 'block' } }}>
              <Avatar sx={{ bgcolor: '#f59e0b', mb: 2, width: 40, height: 40 }}>👤</Avatar>
              <Avatar sx={{ bgcolor: '#ef4444', ml: 3, width: 40, height: 40 }}>👤</Avatar>
            </Box>
            <Box sx={{ position: 'absolute', right: 20, bottom: 50, display: { xs: 'none', md: 'block' } }}>
              <Avatar sx={{ bgcolor: '#10b981', mb: 2, width: 40, height: 40 }}>👤</Avatar>
              <Avatar sx={{ bgcolor: '#8b5cf6', ml: -2, width: 40, height: 40 }}>👤</Avatar>
            </Box> */}
          </Box>
        </Box>
      </Container>

      {/* Anti-Phishing Title Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1e293b',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 2
            }}
          >
            Trình chặn link giả mạo Cyber Rampart:
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1e293b',
              fontSize: { xs: '1.4rem', md: '1.8rem' }
            }}
          >
            Cài đặt và dùng thử miễn phí
          </Typography>
        </Box>
      </Container>

      {/* Course Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1e293b',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 2
            }}
          >
            Hãy xem khóa học của chúng tôi!
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#64748b',
              fontSize: '1rem',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Cập nhật kiến thức và kỹ năng bảo mật với các khóa học chuyên sâu được thiết kế bởi các chuyên gia hàng đầu trong lĩnh vực an ninh mạng.
          </Typography>
        </Box>

        {/* Course Cards */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mb: 4 }}>
          {/* Course Card 1 */}
          <Card sx={{ 
            width: { xs: '100%', sm: 300 },
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <Box sx={{ 
              height: 200, 
              bgcolor: '#6366f1', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Cyber Course
              </Typography>
            </Box>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Khóa học cơ bản
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Học các kiến thức nền tảng về an ninh mạng và bảo mật thông tin.
              </Typography>
            </CardContent>
          </Card>

          {/* Course Card 2 */}
          <Card sx={{ 
            width: { xs: '100%', sm: 300 },
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <Box sx={{ 
              height: 200, 
              bgcolor: '#ec4899', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Security Training
              </Typography>
            </Box>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Khóa học nâng cao
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Nâng cao kỹ năng phân tích và ứng phó với các mối đe dọa phức tạp.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained"
            sx={{ 
              bgcolor: '#0ea5e9',
              '&:hover': { bgcolor: '#0284c7' },
              mr: 2,
              px: 3,
              py: 1
            }}
          >
            Tìm hiểu thêm
          </Button>
          <Button 
            variant="outlined"
            sx={{ 
              borderColor: '#0ea5e9',
              color: '#0ea5e9',
              '&:hover': { borderColor: '#0284c7', bgcolor: '#f0f9ff' },
              px: 3,
              py: 1
            }}
          >
            Đăng ký ngay
          </Button>
        </Box>
      </Container>

      {/* Pricing Section - Lấy từ PricePage */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          {/* <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
            Bảng giá dịch vụ
          </Typography> */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Button
              variant={plan === "month" ? "contained" : "outlined"}
              onClick={() => setPlan("month")}
              sx={{
                backgroundColor: plan === "month" ? "#38bdf8" : undefined,
                color: "#0f172a",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              Hàng tháng
            </Button>
            <Button
              variant={plan === "year" ? "contained" : "outlined"}
              onClick={() => setPlan("year")}
              sx={{
                backgroundColor: plan === "year" ? "#38bdf8" : undefined,
                color: "#0f172a",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              Hàng năm
            </Button>
          </Stack>
        </Box>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="stretch" justifyContent="center">
          {priceData.map((pkg) => (
            <PriceCard
              key={pkg.title}
              title={pkg.title}
              price={pkg.price}
              subPrice={pkg.subPrice}
              features={pkg.features}
              highlight={pkg.highlight}
            />
          ))}
        </Stack>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="body1"
            sx={{
              color: '#0ea5e9',
              fontWeight: 500,
              fontSize: '1rem',
              mb: 2
            }}
          >
            Một vài lời khuyên khác từ những người điều hành của chúng tôi
          </Typography>
          
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1e293b',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 2
            }}
          >
            Mọi khách hàng đều là những người quan trọng.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#64748b',
              fontSize: '1rem',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Vấn đề được đặt ra để giải quyết 2 yếu tố đó là bảo mật an toàn thông tin của bạn và để sử dụng kể cả đối với người mới.
          </Typography>
        </Box>

        {/* Testimonial Cards */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
          {/* Testimonial 1 */}
          <Card sx={{ 
            width: { xs: '100%', sm: 350 },
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            p: 2
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: '#e2e8f0', width: 60, height: 60 }}>H</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Trần Văn Bình
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Vận động viên bơi lội
                  </Typography>
                </Box>
              </Box>
              <Rating value={4} readOnly size="small" sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Cyber Rampart giúp tôi rất nhiều trong việc bảo vệ an toàn thông tin nhiều, 1 ứng dụng hữu ích!"
              </Typography>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card sx={{ 
            width: { xs: '100%', sm: 350 },
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            p: 2
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: '#e2e8f0', width: 60, height: 60 }}>T</Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Trần Tiến Anh
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Thợ sửa ô tô
                  </Typography>
                </Box>
              </Box>
              <Rating value={4} readOnly size="small" sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Ứng dụng đơn giản dễ sử dụng đến cả người già như tôi cũng làm được haha."
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeForm;