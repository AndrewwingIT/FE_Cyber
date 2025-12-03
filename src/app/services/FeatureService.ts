import axiosInstance from '../../config/axiosConfig';

export interface Feature {
  featureId: number;
  name: string;
  description: string;
}

export interface FeatureResponse {
  success: boolean;
  message?: string;
  data?: Feature | Feature[];
  error?: any;
}

export class FeatureService {
  // Lấy danh sách tất cả features
  static async getAllFeatures(): Promise<FeatureResponse> {
    try {
      const response = await axiosInstance.get('/api/Feature');
      // Normalize data - API trả về với field featureId
      let features = Array.isArray(response.data) ? response.data : [response.data];
      return {
        success: true,
        data: features as Feature[],
      };
    } catch (error: any) {
      console.error('Get all features error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách features',
        error: error.response?.data,
      };
    }
  }

  // Lấy chi tiết feature theo ID
  static async getFeatureById(id: number): Promise<FeatureResponse> {
    try {
      const response = await axiosInstance.get(`/api/Feature/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Get feature by id error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được thông tin feature',
        error: error.response?.data,
      };
    }
  }

  // Tạo feature mới
  static async createFeature(featureData: { name: string; description: string }): Promise<FeatureResponse> {
    try {
      const response = await axiosInstance.post('/api/Feature', {
        name: featureData.name,
        description: featureData.description,
      });
      return {
        success: true,
        message: response.data?.message || 'Tạo feature thành công',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Create feature error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Tạo feature thất bại',
        error: error.response?.data,
      };
    }
  }

  // Cập nhật feature
  static async updateFeature(id: number, featureData: { name: string; description: string }): Promise<FeatureResponse> {
    try {
      const response = await axiosInstance.put(`/api/Feature/${id}`, {
        name: featureData.name,
        description: featureData.description,
      });
      return {
        success: true,
        message: response.data?.message || 'Cập nhật feature thành công',
        data: response.data,
      };
    } catch (error: any) {
      console.error('Update feature error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật feature thất bại',
        error: error.response?.data,
      };
    }
  }

  // Xóa feature
  static async deleteFeature(id: number): Promise<FeatureResponse> {
    try {
      const response = await axiosInstance.delete(`/api/Feature/${id}`);
      return {
        success: true,
        message: response.data?.message || 'Xóa feature thành công',
      };
    } catch (error: any) {
      console.error('Delete feature error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Xóa feature thất bại',
        error: error.response?.data,
      };
    }
  }
}

export default FeatureService;

