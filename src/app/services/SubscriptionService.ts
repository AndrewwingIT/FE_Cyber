import axiosInstance from '../../config/axiosConfig';
import type { Subscription, CreateSubscriptionRequest, UpdateSubscriptionRequest } from '../models/Subscription';

export class SubscriptionService {
  /**
   * Lấy tất cả subscriptions
   */
  static async getAllSubscriptions(): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Subscription');
      return {
        success: true,
        data: response.data,
        message: 'Lấy danh sách subscriptions thành công',
      };
    } catch (error: any) {
      console.error('Get all subscriptions error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy danh sách subscriptions',
        error: error.response?.data,
      };
    }
  }

  /**
   * Lấy subscription theo ID
   */
  static async getSubscriptionById(id: number): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get(`/api/Subscription/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Lấy subscription thành công',
      };
    } catch (error: any) {
      console.error('Get subscription by ID error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy subscription',
        error: error.response?.data,
      };
    }
  }

  /**
   * Lấy danh sách subscriptions đang pending
   */
  static async getPendingSubscriptions(): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Subscription/pending');
      return {
        success: true,
        data: response.data,
        message: 'Lấy danh sách pending subscriptions thành công',
      };
    } catch (error: any) {
      console.error('Get pending subscriptions error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy pending subscriptions',
        error: error.response?.data,
      };
    }
  }

  /**
   * Tạo subscription mới
   */
  static async createSubscription(subscriptionData: CreateSubscriptionRequest): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.post('/api/Subscription/create', subscriptionData);
      return {
        success: true,
        data: response.data,
        message: 'Tạo subscription thành công',
      };
    } catch (error: any) {
      console.error('Create subscription error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi tạo subscription',
        error: error.response?.data,
      };
    }
  }

  /**
   * Cập nhật status/autoRenew/endDate của subscription
   */
  static async updateSubscriptionStatus(
    id: number,
    updateData: UpdateSubscriptionRequest
  ): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.patch(`/api/Subscription/${id}/status`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Cập nhật subscription thành công',
      };
    } catch (error: any) {
      console.error('Update subscription status error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi cập nhật subscription',
        error: error.response?.data,
      };
    }
  }

  /**
   * Lấy subscription của user hiện tại (me)
   */
  static async getMySubscription(): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Subscription/me');
      return {
        success: true,
        data: response.data,
        message: 'Lấy subscription thành công',
      };
    } catch (error: any) {
      console.error('Get my subscription error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy subscription',
        error: error.response?.data,
      };
    }
  }
}

export default SubscriptionService;
