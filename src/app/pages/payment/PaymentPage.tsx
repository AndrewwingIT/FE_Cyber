import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../layouts/headers/Header';
import { PACKAGES, type Package } from '../../models/Payment';
import PaymentService from '../../services/PaymentService';
import { usePayment } from '../../context/usePayment';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPaymentInfo } = usePayment();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentNotes, setPaymentNotes] = useState('');

  useEffect(() => {
    // Kiểm tra xem user đã login chưa
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Vui lòng đăng nhập trước!');
      navigate('/login');
    }
  }, [navigate]);

  const resolveSubscriptionId = (pkg: Package, index?: number): number | null => {
    if (pkg.subscriptionId !== undefined && pkg.subscriptionId !== null) {
      const n = Number(pkg.subscriptionId);
      return Number.isFinite(n) && n >= 0 ? n : null;
    }
    // fallback: nếu không có, dùng index -> +1 (hoặc map theo tên)
    if (typeof index === 'number') return index + 1;
    return null;
  };

  const handleSelectPackage = async (pkg: Package, index?: number) => {
    setLoading(true);
    try {
      const subscriptionId = resolveSubscriptionId(pkg, index);
      if (!subscriptionId) {
        toast.error('Gói chọn không hợp lệ (thiếu id).');
        setLoading(false);
        return;
      }

      const response = await PaymentService.createPayment(
        subscriptionId,
        Number(pkg.price),
        'bank_transfer'
      );

      if (response && response.success) {
        const generatedOrderId = response.data?.transactionId || `ORDER_${Date.now()}`;
        setOrderId(generatedOrderId);
        setSelectedPackage(pkg);

        // Thay vì dùng đường dẫn theo order, luôn dùng ảnh QR tĩnh trong public
        // Đặt file QR tĩnh vào public/images/qr.png
        const staticQrPath = '/images/qr.png';
        setQrCode(staticQrPath);
        setOpenDialog(true);
      } else {
        toast.error(response?.message || 'Tạo đơn thất bại');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Lỗi khi tạo đơn thanh toán');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedPackage || !orderId) {
      toast.error('Thông tin thanh toán không hợp lệ');
      return;
    }

    setLoading(true);
    try {
      // Lưu thông tin thanh toán
      setPaymentInfo({
        packageName: selectedPackage.name,
        price: selectedPackage.price,
        status: 'pending',
        orderId,
        qrCode,
      });

      toast.success(`Đã ghi nhận thanh toán cho gói ${selectedPackage.name}. Admin sẽ xác nhận sớm!`);
      setOpenDialog(false);
      
      // Chờ một chút rồi quay lại home
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch {
      toast.error('Lỗi khi xác nhận thanh toán');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header />
      
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              textAlign: 'center',
              color: '#fff',
              fontSize: { xs: '24px', md: '36px' }
            }}
          >
            Chọn Gói Thanh Toán
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Hãy chọn gói phù hợp với nhu cầu của bạn để truy cập các tính năng nâng cao
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 6 }}>
          {PACKAGES.map((pkg: Package) => (
            <Box key={pkg.id}>
              <Card
                sx={{
                  background: pkg.highlighted 
                    ? 'linear-gradient(135deg, #ff4081 0%, #ff1744 100%)' 
                    : 'rgba(255,255,255,0.05)',
                  border: pkg.highlighted ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: pkg.highlighted 
                      ? '0 12px 32px rgba(255, 64, 129, 0.4)'
                      : '0 12px 32px rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {pkg.highlighted && (
                    <Typography 
                      sx={{ 
                        color: '#fff', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        mb: 1,
                        textTransform: 'uppercase'
                      }}
                    >
                      Được Chọn Nhiều Nhất
                    </Typography>
                  )}
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#fff',
                      mb: 1
                    }}
                  >
                    {pkg.name}
                  </Typography>

                  <Typography 
                    variant="h3" 
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 'bold',
                      mb: 0.5
                    }}
                  >
                    {pkg.price}
                  </Typography>

                  <Typography 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      fontSize: '12px',
                      mb: 2
                    }}
                  >
                    {pkg.duration}
                  </Typography>

                  <Box sx={{ flex: 1 }}>
                    {pkg.features.map((feature: string, idx: number) => (
                      <Typography 
                        key={idx}
                        sx={{ 
                          color: 'rgba(255,255,255,0.8)', 
                          fontSize: '13px',
                          mb: 1,
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}
                      >
                        <span style={{ marginRight: '8px' }}>✓</span>
                        <span>{feature}</span>
                      </Typography>
                    ))}
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      backgroundColor: pkg.highlighted ? '#fff' : '#ff4081',
                      color: pkg.highlighted ? '#ff4081' : '#fff',
                      fontWeight: 'bold',
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: pkg.highlighted ? 'rgba(255,255,255,0.9)' : '#ff1744',
                      }
                    }}
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    {pkg.id === 'free' ? 'Sử Dụng Miễn Phí' : 'Thanh Toán Ngay'}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Info section */}
        <Paper
          sx={{
            p: 3,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#fff', 
              fontWeight: 'bold',
              mb: 2
            }}
          >
            ℹ️ Hướng Dẫn Thanh Toán
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              lineHeight: '1.8',
              mb: 1
            }}
          >
            1. Chọn gói thanh toán phù hợp với nhu cầu của bạn
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              lineHeight: '1.8',
              mb: 1
            }}
          >
            2. Quét mã QR hoặc nhập thông tin thanh toán
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              lineHeight: '1.8',
              mb: 1
            }}
          >
            3. Hoàn tất thanh toán
          </Typography>
          <Typography 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              lineHeight: '1.8'
            }}
          >
            4. Admin sẽ xác nhận trong vòng 24 giờ và gửi email thông báo
          </Typography>
        </Paper>
      </Container>

      {/* Payment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => !loading && setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ background: '#1a1a1a', color: '#fff' }}>
          {selectedPackage?.name} - Thanh Toán
        </DialogTitle>
        <DialogContent sx={{ background: '#1a1a1a', color: '#fff' }}>
          <Box sx={{ mt: 3 }}>
            {loading ? (
              <Typography sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
                Đang tạo mã QR...
              </Typography>
            ) : qrCode ? (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography sx={{ mb: 2, fontWeight: 'bold' }}>
                    Quét mã QR để thanh toán
                  </Typography>
                  <Box
                    component="img"
                    src={'/images/qrcode.png'} // luôn lấy ảnh từ public
                    alt="QR Code"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      // bảo đảm fallback nếu không load được
                      const img = e.currentTarget;
                      if (!img.dataset.fallback) {
                        img.dataset.fallback = '1';
                        img.src = '/images/qr.png';
                      }
                    }}
                    sx={{
                      width: '100%',
                      maxWidth: '300px',
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderRadius: 1,
                      p: 1,
                      background: '#fff'
                    }}
                  />
                </Box>

                <Typography sx={{ mb: 2, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  <strong>Số tiền:</strong> {selectedPackage?.price}
                </Typography>
                <Typography sx={{ mb: 2, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  <strong>Mã đơn hàng:</strong> {orderId}
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Ghi chú (tùy chọn)"
                  placeholder="Nhập nội dung chuyển khoản hoặc ghi chú..."
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      color: '#fff',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                />
              </>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions sx={{ background: '#1a1a1a', p: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            disabled={loading}
            sx={{ color: '#ff4081' }}
          >
            Đóng
          </Button>
          <Button
            onClick={handleConfirmPayment}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#ff4081',
              '&:hover': { backgroundColor: '#ff1744' }
            }}
          >
            {loading ? 'Đang xử lý...' : 'Xác Nhận Thanh Toán'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentPage;
