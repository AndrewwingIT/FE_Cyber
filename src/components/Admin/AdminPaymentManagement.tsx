import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Chip,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import PaymentService from '../../app/services/PaymentService';
import type { Payment } from '../../app/models/Payment';
import EmailService from '../../app/services/EmailService';

const AdminPaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [newStatus, setNewStatus] = useState<'completed' | 'failed' | 'cancelled'>('completed');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const response = await PaymentService.getAllPayments();
      if (response.success && Array.isArray(response.data)) {
        setPayments(response.data);
      } else if (response.success && response.data) {
        setPayments([response.data]);
      }
    } catch {
      toast.error('Lỗi khi tải danh sách thanh toán');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setNewStatus('completed');
    setNotes('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
    setNewStatus('completed');
    setNotes('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedPayment) return;

    try {
      setLoading(true);
      const response = await PaymentService.updatePaymentStatus(
        selectedPayment.orderId,
        newStatus,
        notes
      );

      if (response.success) {
        toast.success('Cập nhật trạng thái thành công!');
        
        // Gửi email thông báo
        if (selectedPayment.userEmail) {
          await EmailService.sendPaymentConfirmation(
            selectedPayment.userEmail,
            {
              orderId: selectedPayment.orderId,
              packageName: selectedPayment.packageName,
              status: newStatus,
              amount: selectedPayment.amount,
            }
          );
        }

        // Reload danh sách
        await loadPayments();
        handleCloseDialog();
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error('Lỗi khi cập nhật trạng thái');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chưa thanh toán';
      case 'failed':
        return 'Thất bại';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  if (loading && payments.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Quản Lý Thanh Toán ({payments.length})
        </Typography>
        <Button
          variant="contained"
          onClick={loadPayments}
          disabled={loading}
        >
          Tải lại
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Mã đơn hàng</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Gói</strong></TableCell>
              <TableCell><strong>Số tiền</strong></TableCell>
              <TableCell><strong>Trạng thái</strong></TableCell>
              <TableCell><strong>Ngày tạo</strong></TableCell>
              <TableCell align="center"><strong>Hành động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography color="textSecondary">Không có đơn thanh toán nào</Typography>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.orderId}</TableCell>
                  <TableCell>{payment.userEmail}</TableCell>
                  <TableCell>{payment.packageName}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(payment.status)}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(payment.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenDialog(payment)}
                      disabled={payment.status === 'completed'}
                    >
                      {payment.status === 'completed' ? 'Đã xác nhận' : 'Xác nhận'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Status Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Cập Nhật Trạng Thái Thanh Toán</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedPayment && (
            <>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>Mã đơn:</strong> {selectedPayment.orderId}
              </Typography>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>Email:</strong> {selectedPayment.userEmail}
              </Typography>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>Gói:</strong> {selectedPayment.packageName} ({selectedPayment.amount})
              </Typography>

              <TextField
                select
                fullWidth
                label="Trạng thái"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as 'completed' | 'failed' | 'cancelled')}
                sx={{ mb: 2 }}
              >
                <MenuItem value="completed">Đã thanh toán</MenuItem>
                <MenuItem value="failed">Thất bại</MenuItem>
                <MenuItem value="cancelled">Đã hủy</MenuItem>
              </TextField>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Ghi chú"
                placeholder="Nhập ghi chú (tùy chọn)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Cập Nhật'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPaymentManagement;
