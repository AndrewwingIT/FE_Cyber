import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemIcon, ListItemText, Avatar, Divider, Paper, Chip,
  Button, Breadcrumbs, Link, Grid, Alert, Collapse, IconButton
} from '@mui/material';
import {
  Person as PersonIcon, CreditCard as SubscriptionIcon, Logout as LogoutIcon,
  Home as HomeIcon, ArrowBack as ArrowBackIcon, ExpandMore, ExpandLess,
  CheckCircle, AccessTime, Cancel, Warning, Download as DownloadIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axiosConfig';

const DRAWER_WIDTH = 280;
const GOOGLE_DRIVE_LINK = 'https://drive.google.com/drive/folders/1-lxMPM2RWUZKBeToOvC0xpVqvqskomNq?usp=sharing';

interface Payment {
  paymentId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  paymentDate: string;
  transactionId: string;
}

interface Subscription {
  subscriptionId: number;
  planName: string;
  planDescription: string;
  status: 'Pending' | 'Active' | 'Expired' | 'Cancelled';
  startDate: string;
  endDate: string | null;
  features: string[];
  payments?: Payment[];
}

interface UserSubscriptionResponse {
  userId: string;
  subscriptions: Subscription[];
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserSubscriptionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const firstName = sessionStorage.getItem('firstName') || 'User';
  const lastName = sessionStorage.getItem('lastName') || '';
  const email = sessionStorage.getItem('userEmail') || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.error('Vui lòng đăng nhập!');
      navigate('/login');
      return;
    }

    axiosInstance.get('/api/Subscription/me')
      .then(res => setData(res.data))
      .catch(() => toast.error('Không tải được thông tin gói'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success('Đăng xuất thành công!');
    navigate('/');
  };

  const handleBackToHome = () => navigate('/');

  const formatDate = (d: string) => new Date(d).toLocaleDateString('vi-VN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return { color: '#10b981', bg: '#ecfdf5', label: 'Đang hoạt động', icon: <CheckCircle fontSize="small" /> };
      case 'pending': return { color: '#f59e0b', bg: '#fffbeb', label: 'Chờ duyệt', icon: <AccessTime fontSize="small" /> };
      case 'expired': return { color: '#ef4444', bg: '#fef2f2', label: 'Hết hạn', icon: <Warning fontSize="small" /> };
      case 'cancelled': return { color: '#94a3b8', bg: '#f8fafc', label: 'Đã hủy', icon: <Cancel fontSize="small" /> };
      default: return { color: '#64748b', bg: '#f1f5f9', label: status, icon: null };
    }
  };

  // ĐÃ FIX LỖI CHẠY AN TOÀN DÙ payments LÀ undefined
  const latestBankTransfer = (payments?: Payment[]): Payment | undefined => {
    if (!Array.isArray(payments) || payments.length === 0) return undefined;

    return payments
      .filter((p): p is Payment => !!p?.paymentMethod)
      .filter(p => p.paymentMethod.toLowerCase() === 'bank_transfer')
      .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())[0];
  };

  const activeOrPending = data?.subscriptions.filter(s => ['Active', 'Pending'].includes(s.status)) || [];
  const hasActiveSubscription = data?.subscriptions.some(s => s.status === 'Active') || false;
  const history = data?.subscriptions.filter(s => !['Active', 'Pending'].includes(s.status)) || [];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH, flexShrink: 0, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, bgcolor: '#1e293b', color: 'white' } }}>
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Button fullWidth variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBackToHome} sx={{ color: 'white', borderColor: '#475569', mb: 4 }}>
            Quay về Trang chủ
          </Button>
          <Box textAlign="center" mb={4}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#f472b6', fontSize: '2rem', fontWeight: 'bold' }}>
              {initials}
            </Avatar>
            <Typography variant="h6" fontWeight={600}>{firstName} {lastName}</Typography>
            <Typography variant="body2" color="#cbd5e1">{email}</Typography>
          </Box>
          <Divider sx={{ bgcolor: '#334155', my: 3 }} />
          <List>
            <ListItem button {...({} as any)}>
              <ListItemIcon sx={{ color: '#94a3b8' }}><PersonIcon /></ListItemIcon>
              <ListItemText primary="Thông tin cá nhân" />
            </ListItem>
            <ListItem button selected {...({} as any)}>
              <ListItemIcon sx={{ color: '#f472b6' }}><SubscriptionIcon /></ListItemIcon>
              <ListItemText primary="Gói đăng ký" />
            </ListItem>
          </List>
          <Box sx={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
            <Button fullWidth variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ color: 'white', borderColor: '#475569' }}>
              Đăng xuất
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` } }}>
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, ml: { sm: `${DRAWER_WIDTH}px` }, bgcolor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <Toolbar>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" onClick={handleBackToHome} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} /> Trang chủ
              </Link>
              <Typography color="text.primary" fontWeight={500}>Gói đăng ký</Typography>
            </Breadcrumbs>
          </Toolbar>
        </AppBar>
        <Toolbar />

        <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 3, sm: 4 }, py: 8 }}>
          <Typography variant="h3" fontWeight="bold" textAlign="center" mb={8} color="#1e293b">
            Gói đăng ký của bạn
          </Typography>

          {hasActiveSubscription && (
            <Paper sx={{ p: 4, mb: 6, textAlign: 'center', borderRadius: 4, bgcolor: '#f0fdf4', border: '2px solid #22c55e' }}>
              <Typography variant="h5" fontWeight="bold" color="#166534" mb={2}>
                Chúc mừng! Bạn đã có thể tải sản phẩm
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={() => window.open(GOOGLE_DRIVE_LINK, '_blank')}
                sx={{
                  bgcolor: '#22c55e',
                  '&:hover': { bgcolor: '#16a34a' },
                  px: 6, py: 2, borderRadius: 3,
                  fontSize: '1.1rem', fontWeight: 'bold'
                }}
              >
                Tải sản phẩm ngay
              </Button>
            </Paper>
          )}

          {loading ? (
            <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4, boxShadow: 3 }}>
              <Typography color="text.secondary">Đang tải thông tin...</Typography>
            </Paper>
          ) : activeOrPending.length === 0 && history.length === 0 ? (
            <Paper sx={{ p: 8, textAlign: 'center', borderRadius: 4, boxShadow: 3 }}>
              <Typography variant="h5" mb={4} color="#64748b">Bạn chưa có gói đăng ký nào</Typography>
              <Button variant="contained" size="large" onClick={() => navigate('/payment')}
                sx={{ bgcolor: '#f472b6', '&:hover': { bgcolor: '#ec4899' }, px: 6, py: 2, borderRadius: 3 }}>
                Nâng cấp ngay hôm nay
              </Button>
            </Paper>
          ) : (
            <>
              {/* Gói hiện tại */}
              {activeOrPending.map(sub => {
                const cfg = getStatusConfig(sub.status);
                const payment = latestBankTransfer(sub.payments);

                return (
                  <Paper key={sub.subscriptionId} elevation={8} sx={{ borderRadius: 4, overflow: 'hidden', mb: 6 }}>
                    <Box sx={{ bgcolor: '#f0abfc', p: { xs: 4, sm: 6 }, color: 'white' }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="h4" fontWeight="bold">{sub.planName}</Typography>
                          <Typography variant="h6" sx={{ opacity: 0.9, mt: 1 }}>{sub.planDescription}</Typography>
                        </Box>
                        <Chip icon={cfg.icon} label={cfg.label} sx={{ bgcolor: 'rgba(255,255,255,0.3)', color: 'white', fontWeight: 'bold', fontSize: '1rem', height: 44 }} {...({} as any)} />
                      </Box>
                    </Box>

                    <Box sx={{ p: { xs: 4, sm: 6 } }}>
                      <Grid container spacing={4} {...({} as any)}>
                        <Grid item xs={12} sm={6} {...({} as any)}>
                          <Typography color="text.secondary" gutterBottom>Bắt đầu</Typography>
                          <Typography fontWeight="bold" fontSize="1.2rem">{formatDate(sub.startDate)}</Typography>
                        </Grid>
                        {sub.endDate && (
                          <Grid item xs={12} sm={6} {...({} as any)}>
                            <Typography color="text.secondary" gutterBottom>Kết thúc</Typography>
                            <Typography fontWeight="bold" fontSize="1.2rem">{formatDate(sub.endDate)}</Typography>
                          </Grid>
                        )}
                        {payment && (
                          <Grid item xs={12} {...({} as any)}>
                            <Typography color="text.secondary" gutterBottom>Thanh toán gần nhất</Typography>
                            <Typography fontWeight="bold" fontSize="1.2rem" color={payment.status.toLowerCase() === 'pending' ? '#f59e0b' : '#10b981'}>
                              {payment.amount.toLocaleString('vi-VN')}đ • {payment.status.toLowerCase() === 'pending' ? 'Chờ duyệt' : 'Thành công'}
                            </Typography>
                            <Typography fontSize="0.95rem" color="#64748b">Mã: {payment.transactionId}</Typography>
                          </Grid>
                        )}
                      </Grid>

                      <Box mt={6}>
                        <Typography variant="h6" fontWeight="bold" mb={3}>Tính năng bao gồm</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                          {(sub.features || []).map((f, i) => (
                            <Chip key={i} label={f} sx={{ bgcolor: '#f0abfc', color: '#6b21a8', fontWeight: 'bold', height: 36 }} />
                          ))}
                        </Box>
                      </Box>

                      {sub.status === 'Pending' && (
                        <Alert severity="warning" sx={{ mt: 5, borderRadius: 3, fontSize: '1rem' }}>
                          Đang chờ Admin duyệt thanh toán. Vui lòng chờ tối đa 24h!
                        </Alert>
                      )}
                    </Box>
                  </Paper>
                );
              })}

              {/* Lịch sử */}
              {history.length > 0 && (
                <Paper sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
                  <Box
                    sx={{ bgcolor: '#f1f5f9', p: 4, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onClick={() => setShowHistory(!showHistory)}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#475569">
                      Lịch sử gói cũ ({history.length})
                    </Typography>
                    <IconButton>{showHistory ? <ExpandLess /> : <ExpandMore />}</IconButton>
                  </Box>
                  <Collapse in={showHistory}>
                    <Box p={4}>
                      <Grid container spacing={3} justifyContent="center" {...({} as any)}>
                        {history.map(sub => (
                          <Grid item xs={12} sm={6} md={4} key={sub.subscriptionId} {...({} as any)}>
                            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px solid #e2e8f0' }}>
                              <Typography fontWeight="bold" mb={1}>{sub.planName}</Typography>
                              <Chip size="small" label={getStatusConfig(sub.status).label}
                                sx={{ bgcolor: getStatusConfig(sub.status).bg, color: getStatusConfig(sub.status).color }} />
                              <Typography fontSize="0.9rem" color="#64748b" mt={2}>
                                {formatDate(sub.startDate)} → {sub.endDate ? formatDate(sub.endDate) : '—'}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Collapse>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;