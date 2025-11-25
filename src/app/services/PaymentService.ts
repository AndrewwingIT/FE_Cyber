import axiosInstance from '../../config/axiosConfig';
import type { PaymentResponse } from '../models/Payment';

export class PaymentService {
  static async createPayment(
    packageId: string,
    packageName: string,
    amount: string
  ): Promise<PaymentResponse> {
    try {
      const userEmail = sessionStorage.getItem('userEmail');
      const response = await axiosInstance.post('/api/Payment/create', {
        packageId,
        packageName,
        amount,
        userEmail,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Tạo đơn thanh toán thất bại',
        error: err,
      };
    }
  }

  static async getPaymentStatus(orderId: string): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get(`/api/Payment/status/${orderId}`);
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Lấy trạng thái thanh toán thất bại',
        error: err,
      };
    }
  }

  static async getPaymentByUserEmail(userEmail: string): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get(`/api/Payment/user/${userEmail}`);
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Lấy thông tin thanh toán thất bại',
        error: err,
      };
    }
  }

  static async getAllPayments(): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.get('/api/Payment/all');
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Lấy danh sách thanh toán thất bại',
        error: err,
      };
    }
  }

  static async updatePaymentStatus(
    orderId: string,
    status: 'completed' | 'failed' | 'cancelled',
    notes?: string
  ): Promise<PaymentResponse> {
    try {
      const response = await axiosInstance.put(`/api/Payment/status/${orderId}`, {
        status,
        notes,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Cập nhật trạng thái thanh toán thất bại',
        error: err,
      };
    }
  }

  static async generateQRCode(orderId: string, amount: string): Promise<string> {
    try {
      const response = await axiosInstance.post('/api/Payment/generate-qr', {
        orderId,
        amount,
      });
      return response.data.qrCode;
    } catch {
      // Fallback: generate QR code locally (placeholder)
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='white'/%3E%3Ctext x='50' y='100' font-size='12'%3EQR: ${orderId}%3C/text%3E%3C/svg%3E`;
    }
  }
}

export default PaymentService;
