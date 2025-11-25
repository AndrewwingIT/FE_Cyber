import axiosInstance from '../../config/axiosConfig';

export interface PaymentEmailData {
  orderId: string;
  packageName: string;
  status: 'completed' | 'failed' | 'cancelled';
  amount: string;
}

export class EmailService {
  static async sendPaymentConfirmation(
    userEmail: string,
    paymentData: PaymentEmailData
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.post('/api/Email/send-payment-confirmation', {
        userEmail,
        orderId: paymentData.orderId,
        packageName: paymentData.packageName,
        status: paymentData.status,
        amount: paymentData.amount,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending payment confirmation email:', err);
      return {
        success: false,
        message: 'Lỗi khi gửi email',
      };
    }
  }

  static async sendPaymentReminder(userEmail: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.post('/api/Email/send-payment-reminder', {
        userEmail,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending payment reminder email:', err);
      return {
        success: false,
        message: 'Lỗi khi gửi email',
      };
    }
  }

  static async sendPaymentFailureNotification(
    userEmail: string,
    paymentData: PaymentEmailData
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.post('/api/Email/send-payment-failure', {
        userEmail,
        orderId: paymentData.orderId,
        packageName: paymentData.packageName,
        amount: paymentData.amount,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending payment failure email:', err);
      return {
        success: false,
        message: 'Lỗi khi gửi email',
      };
    }
  }

  static async sendWelcomeEmail(userEmail: string, userName: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axiosInstance.post('/api/Email/send-welcome', {
        userEmail,
        userName,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error sending welcome email:', err);
      return {
        success: false,
        message: 'Lỗi khi gửi email',
      };
    }
  }
}

export default EmailService;
