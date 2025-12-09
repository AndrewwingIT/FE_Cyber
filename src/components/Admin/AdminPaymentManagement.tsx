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
  TablePagination,
} from '@mui/material';
import { toast } from 'react-toastify';
import PaymentService from '../../app/services/PaymentService';
import type { Payment } from '../../app/models/Payment';

const AdminPaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [newStatus, setNewStatus] = useState<'pending' | 'succeeded'>('succeeded');
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async (status?: string) => {
    setLoading(true);
    try {
      // Always get all payments, then filter on frontend
      const response = await PaymentService.getAllPayments();
      console.log('Payment response:', response);
      
      if (response.success && response.data) {
        let paymentsData: Payment[] = [];
        
        // Handle if data is array
        if (Array.isArray(response.data)) {
          paymentsData = response.data;
        } else if (typeof response.data === 'object') {
          // Handle if data is a single object
          paymentsData = [response.data];
        }
        
        // Sort by paymentId ascending
        paymentsData.sort((a, b) => a.paymentId - b.paymentId);
        
        // Filter out test emails (admin, customer, manager, employee)
        const testKeywords = ['admin', 'customer', 'manager', 'employee'];
        paymentsData = paymentsData.filter((p: Payment) => {
          const email = p.userEmail?.toLowerCase() || '';
          return !testKeywords.some(keyword => email.includes(keyword));
        });
        
        // Filter on frontend if status specified
        if (status && status !== 'all') {
          const filtered = paymentsData.filter((p: Payment) => 
            p.status.toLowerCase() === status.toLowerCase()
          );
          setPayments(filtered);
        } else {
          setPayments(paymentsData);
        }
      } else {
        console.error('Payment response error:', response);
        toast.error(response.message || 'Error loading payment list');
        setPayments([]);
      }
    } catch (error) {
      console.error('Load payments error:', error);
      toast.error('Error loading payment list');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setPage(0); // Reset to first page when filter changes
    loadPayments(status);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (payment: Payment) => {
    setSelectedPayment(payment);
    setNewStatus('succeeded');
    setNotes('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
    setNewStatus('succeeded');
    setNotes('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedPayment) return;

    try {
      setLoading(true);
      console.log('Updating payment:', {
        paymentId: selectedPayment.paymentId,
        newStatus,
        notes,
      });
      
      const response = await PaymentService.updatePaymentStatus(
        String(selectedPayment.paymentId),
        newStatus,
        notes
      );
      
      console.log('Update response:', response);

      if (response.success) {
        toast.success('Payment status updated successfully!');
        
        // Reload list
        await loadPayments(filterStatus);
        handleCloseDialog();
      } else {
        console.error('Update failed:', response);
        toast.error(response.message || 'Failed to update payment status');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Error updating payment status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'succeeded') {
      return 'success';
    } else if (lowerStatus === 'pending') {
      return 'warning';
    }
    return 'default';
  };

  const getStatusLabel = (status: string): string => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'succeeded') {
      return 'Succeeded';
    } else if (lowerStatus === 'pending') {
      return 'Pending';
    }
    return status;
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
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Payment Management ({payments.length})
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            select
            size="small"
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="all">All Payments</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="succeeded">Succeeded</MenuItem>
          </TextField>
          <Button
            variant="contained"
            onClick={() => loadPayments(filterStatus)}
            disabled={loading}
          >
            Reload
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Payment ID</strong></TableCell>
              <TableCell><strong>Full Name</strong></TableCell>
              <TableCell><strong>User Email</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Payment Date</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography color="textSecondary">No payments available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              payments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((payment) => (
                <TableRow key={payment.paymentId} hover>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {payment.fullName || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontSize: '13px' }}>
                      {payment.userEmail || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={`${payment.amount.toLocaleString('vi-VN')} VND`} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(payment.status)}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(payment.paymentDate).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpenDialog(payment)}
                      disabled={payment.status.toLowerCase() === 'succeeded'}
                    >
                      {payment.status.toLowerCase() === 'succeeded' ? 'Confirmed' : 'Confirm'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={payments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Update Status Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Payment Status</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedPayment && (
            <>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>Payment ID:</strong> {selectedPayment.paymentId}
              </Typography>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>Full Name:</strong> {selectedPayment.fullName || '-'}
              </Typography>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>User Email:</strong> {selectedPayment.userEmail || '-'}
              </Typography>
              <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
                <strong>Amount:</strong> {selectedPayment.amount.toLocaleString('vi-VN')} VND
              </Typography>

              <TextField
                select
                fullWidth
                label="Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as 'pending' | 'succeeded')}
                sx={{ mb: 2 }}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="succeeded">Succeeded</MenuItem>
              </TextField>

              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                placeholder="Enter notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleUpdateStatus}
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPaymentManagement;
