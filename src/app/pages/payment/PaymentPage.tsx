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
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../layouts/headers/Header';
import PaymentService from '../../services/PaymentService';
import { usePayment } from '../../context/usePayment';
import axiosInstance from '../../../config/axiosConfig';

interface Plan {
  planId: number;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  isActive: boolean;
  features: { featureId: number; name: string; description: string }[];
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { setPaymentInfo } = usePayment();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [, setQrCode] = useState<string>('');
  const QR_CODE_STATIC = '/images/qrcode.png';

  // Lấy danh sách gói từ API
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Vui lòng đăng nhập!');
      navigate('/login');
      return;
    }

    const fetchPlans = async () => {
      try {
        const res = await axiosInstance.get('/api/Plan/all');
        setPlans(res.data.filter((p: Plan) => p.isActive));
      } catch (err) {
        console.error('Lỗi tải gói:', err);
        toast.error('Không tải được danh sách gói');
      }
    };

    fetchPlans();
  }, [navigate]);

  // Bước 1: Tạo Subscription → lấy subscriptionId
  const createSubscription = async (planId: number): Promise<number | null> => {
    try {
      const res = await axiosInstance.post('/api/Subscription/create', { planId });
      if (res.data && res.data.subscriptionId) {
        toast.success('Đã tạo đăng ký thành công!');
        return res.data.subscriptionId;
      }
      throw new Error('Không nhận được subscriptionId');
    } catch (err: any) {
      console.error('Lỗi tạo subscription:', err);
      toast.error(err.response?.data?.message || 'Tạo đăng ký thất bại');
      return null;
    }
  };

  // Bước 2: Tạo Payment với subscriptionId
  const createPayment = async (subscriptionId: number, amount: number) => {
    const response = await PaymentService.createPayment(subscriptionId, amount, 'bank_transfer');

    if (response.success && response.data && !Array.isArray(response.data)) {
      return response.data.transactionId;
    }

    return `ORDER_${Date.now()}`;
  };

  // Xử lý khi chọn gói
  const handleSelectPlan = async (plan: Plan) => {
    setLoading(true);
    try {
      // Bước 1: Tạo subscription
      const subscriptionId = await createSubscription(plan.planId);
      if (!subscriptionId) return;

      // Bước 2: Tạo payment
      const txnId = await createPayment(subscriptionId, plan.price);

      // Thành công → mở dialog
      setSelectedPlan(plan);
      setOrderId(txnId);
      setQrCode(QR_CODE_STATIC);
      setOpenDialog(true);
      toast.success('Đã tạo đơn thanh toán thành công!');
    } catch (err) {
      console.error('Lỗi thanh toán:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = () => {
    if (!selectedPlan || !orderId) return;

    setPaymentInfo({
      packageName: selectedPlan.name,
      price: selectedPlan.price,
      status: 'pending',
      orderId,
      qrCode: '/images/qr.png',
    });

    toast.success(`Đã ghi nhận thanh toán gói ${selectedPlan.name}! Admin sẽ xác nhận sớm.`);
    setOpenDialog(false);
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', mb: 2 }}>
          Chọn Gói Thành Viên
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#ccc', mb: 6 }}>
          Nâng cấp ngay để mở khóa toàn bộ khóa học và tính năng bảo mật cao cấp
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {plans.map((plan) => (
            <Card
              key={plan.planId}
              raised={plan.price === 70000}
              sx={{
                background: plan.price === 70000
                  ? 'linear-gradient(135deg, #ff4081 0%, #f50057 100%)'
                  : 'rgba(255,255,255,0.05)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'visible',
                '&:hover': { transform: 'translateY(-12px)', boxShadow: 10 },
              }}
            >
              {plan.price === 70000 && (
                <Chip
                  label="Phổ biến nhất"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    color: '#ff4081',
                    fontWeight: 'bold',
                  }}
                />
              )}
              <CardContent sx={{ pt: 5, pb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
                  {plan.description}
                </Typography>

                <Box sx={{ my: 3 }}>
                  <Typography variant="h3" fontWeight="bold">
                    {plan.price.toLocaleString('vi-VN')}đ
                  </Typography>
                  <Typography variant="body2">/{plan.billingCycle}</Typography>
                </Box>

                <Box component="ul" sx={{ pl: 2, mb: 4, '& li': { mb: 1.5 } }}>
                  {plan.features.map((f) => (
                    <li key={f.featureId}>
                      {f.description || f.name}
                    </li>
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  onClick={() => handleSelectPlan(plan)}
                  sx={{
                    background: plan.price === 70000 ? '#fff' : '#ff4081',
                    color: plan.price === 70000 ? '#ff4081' : '#fff',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: plan.price === 70000 ? '#fff' : '#ff1744',
                    },
                  }}
                >
                  {loading ? 'Đang xử lý...' : 'Chọn Gói Này'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Hướng dẫn */}
        <Paper sx={{ mt: 8, p: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" color="#fff" mb={2}>
            Hướng dẫn thanh toán
          </Typography>
          <Typography color="#ddd" sx={{ lineHeight: 1.8 }}>
            1. Chọn gói phù hợp<br />
            2. Hệ thống tự động tạo đăng ký cho bạn<br />
            3. Quét mã QR để chuyển khoản<br />
            4. Admin xác nhận trong vòng 24h → tài khoản được kích hoạt ngay!
          </Typography>
        </Paper>
      </Container>

      {/* Dialog QR */}
      <Dialog open={openDialog} onClose={() => !loading && setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1a1a1a', color: '#fff' }}>
          Thanh toán {selectedPlan?.name}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#1a1a1a', color: '#fff' }}>
          <Box textAlign="center" py={2}>
            <img
              src="/images/qrcode.png"
              alt="QR Thanh toán"
              style={{ maxWidth: '280px', border: '8px solid white', borderRadius: '12px' }}
            />
            <Typography mt={3} fontWeight="bold">
              Số tiền: {selectedPlan?.price.toLocaleString('vi-VN')} VNĐ
            </Typography>
            <Typography fontSize="14px" color="#ccc">
              Mã đơn: {orderId}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Ghi chú chuyển khoản (tùy chọn)"
              value={paymentNotes}
              onChange={(e) => setPaymentNotes(e.target.value)}
              sx={{ mt: 3, '& .MuiOutlinedInput-root': { color: '#fff' } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#1a1a1a', p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} disabled={loading} sx={{ color: '#ff4081' }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmPayment}
            disabled={loading}
            sx={{ bgcolor: '#ff4081', '&:hover': { bgcolor: '#ff1744' } }}
          >
            Đã Thanh Toán
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentPage;
