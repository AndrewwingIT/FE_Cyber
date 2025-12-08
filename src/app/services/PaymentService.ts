import axiosInstance from '../../config/axiosConfig';
import type { PaymentResponse } from '../models/Payment';

export class PaymentService {
  // Tạo đơn thanh toán manual (không qua VNPay)
  static async createPayment(
    subscriptionId: number,
    amount: number,
    paymentMethod: string = 'bank_transfer'
  ): Promise<PaymentResponse> {
    console.log('createPayment payload', { subscriptionId, amount, paymentMethod });
    if (Number.isNaN(subscriptionId) || subscriptionId <= 0) {
      return { success: false, message: 'Invalid subscriptionId', error: 'subscriptionId must be a positive number' };
    }

    try {
      const transactionId = `TXN_${Date.now()}`;
      const res = await axiosInstance.post('/api/Payment/manual', {
        subscriptionId: Number(subscriptionId),
        amount: Number(amount),
        paymentMethod,
        status: 'pending',
        transactionId,
      });

      // Treat any 2xx as success (including 201 Created)
      if (res.status >= 200 && res.status < 300) {
        return {
          success: true,
          message: res.data?.message || 'Created',
          data: res.data,
        };
      }

      return {
        success: false,
        message: res.data?.message || `Unexpected status ${res.status}`,
        error: res.data,
      };
    } catch (error: any) {
      console.error('Payment error:', error?.response?.data ?? error);
      return {
        success: false,
        message: error?.response?.data?.message || 'Tạo đơn thất bại',
        error: error?.response?.data ?? error.message,
      };
    }
  }

  // Lấy thanh toán theo transaction ID
  static async getPaymentStatus(txnId: string): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get(`/api/Payment/${txnId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get payment status error:', error.response?.status, error.response?.data);
      return {
        success: false,
        message: 'Không lấy được trạng thái thanh toán',
        error: error.message,
      };
    }
  }

  // Lấy thanh toán theo payment ID
  static async getPaymentById(paymentId: number): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get(`/api/Payment/${paymentId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get payment by ID error:', error.response?.status, error.response?.data);
      return {
        success: false,
        message: 'Cannot get payment details',
        error: error.message,
      };
    }
  }

  // Cập nhật số tiền thanh toán
  static async updatePaymentAmount(
    paymentId: number,
    amount: number
  ): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.put(`/api/Payment/${paymentId}/amount`, {
        amount,
      });
      return response.data;
    } catch (error: any) {
      console.error('Update payment amount error:', error.response?.status, error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update payment amount',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  // Lọc thanh toán theo trạng thái
  static async getPaymentsByStatus(status: string): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get(`/api/Payment/status/${status}`);
      return response.data;
    } catch (error: any) {
      console.error('Get payments by status error:', error.response?.status, error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Cannot get payments by status',
        error: error.response?.data || error.message,
      };
    }
  }

  // Cập nhật trạng thái thanh toán (chỉ dùng trong admin)
  static async updatePaymentStatus(
    paymentId: string,
    status: 'pending' | 'succeeded',
    notes?: string
  ): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.put(`/api/Payment/${paymentId}/status`, {
        status,
        notes,
      });
      console.log('Update payment status response:', response);
      
      // Check if response has success field
      if (response.data && typeof response.data === 'object' && 'success' in response.data) {
        return response.data;
      }
      
      // If API returns 200/204, consider it success
      if (response.status >= 200 && response.status < 300) {
        return {
          success: true,
          message: 'Payment status updated successfully',
          data: response.data,
        };
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Update payment status error:', error.response?.status, error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật trạng thái thanh toán thất bại',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  // Generate QR (VNPay)
  static async generateQRCode(orderId: string, amount: string): Promise<string> {
    try {
      const response = await axiosInstance.post('/api/Payment/vnpay', {
        orderId,
        amount,
      });
      const qr = response.data?.qrCode;
      if (qr) return qr;
      return `/images/qr/${orderId}.png`;
    } catch {
      return `/images/qr/${orderId}.png`;
    }
  }

  // Callback từ VNPay
  static async handleVNPayCallback(data: any): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.post('/api/Payment/callback', data);
      return response.data;
    } catch (error: any) {
      console.error('VNPay callback error:', error.response?.data);
      return {
        success: false,
        message: 'Xử lý callback thất bại',
        error: error.message,
      };
    }
  }

  // Lấy danh sách thanh toán (admin)
  static async getAllPayments(): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get('/api/Payment');
      console.log('Get all payments response:', response.data);
      
      // Check if response is already in correct format
      if (response.data && typeof response.data === 'object' && 'success' in response.data) {
        return response.data;
      }
      
      // If response is an array, wrap it
      if (Array.isArray(response.data)) {
        return {
          success: true,
          message: 'Success',
          data: response.data,
        };
      }
      
      // Otherwise return as-is wrapped in success response
      return {
        success: true,
        message: 'Success',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Get all payments error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách thanh toán',
        error: error.response?.data || error.message,
      };
    }
  }
}

export default PaymentService;
