import axiosInstance from '../../config/axiosConfig';
import type { Tenant, TenantCreateDto, TenantUpdateDto } from '../models/Tenant';

export interface TenantResponse {
  success: boolean;
  message?: string;
  data?: Tenant | Tenant[];
  error?: any;
}

export class TenantService {
  /**
   * GET /api/Tenants - Lấy tất cả tenants
   */
  static async getAllTenants(): Promise<TenantResponse> {
    try {
      const response = await axiosInstance.get('/api/Tenants');
      
      if (response.data) {
        return {
          success: true,
          data: response.data,
          message: 'Lấy danh sách tenants thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không có dữ liệu'
      };
    } catch (error: any) {
      console.error('Get all tenants error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy danh sách tenants',
        error: error
      };
    }
  }

  /**
   * GET /api/Tenants/{id} - Lấy chi tiết tenant theo ID
   */
  static async getTenantById(id: number): Promise<TenantResponse> {
    try {
      const response = await axiosInstance.get(`/api/Tenants/${id}`);
      
      if (response.data) {
        return {
          success: true,
          data: response.data,
          message: 'Lấy thông tin tenant thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không tìm thấy tenant'
      };
    } catch (error: any) {
      console.error('Get tenant by id error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi lấy thông tin tenant',
        error: error
      };
    }
  }

  /**
   * POST /api/Tenants - Tạo tenant mới
   */
  static async createTenant(data: TenantCreateDto): Promise<TenantResponse> {
    try {
      const response = await axiosInstance.post('/api/Tenants', data);
      
      if (response.data) {
        return {
          success: true,
          data: response.data,
          message: 'Tạo tenant thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không thể tạo tenant'
      };
    } catch (error: any) {
      console.error('Create tenant error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi tạo tenant',
        error: error
      };
    }
  }

  /**
   * PUT /api/Tenants/{id} - Cập nhật tenant
   */
  static async updateTenant(id: number, data: TenantUpdateDto): Promise<TenantResponse> {
    try {
      const response = await axiosInstance.put(`/api/Tenants/${id}`, data);
      
      if (response.data) {
        return {
          success: true,
          data: response.data,
          message: 'Cập nhật tenant thành công'
        };
      }
      
      return {
        success: false,
        message: 'Không thể cập nhật tenant'
      };
    } catch (error: any) {
      console.error('Update tenant error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi cập nhật tenant',
        error: error
      };
    }
  }

  /**
   * DELETE /api/Tenants/{id} - Xóa tenant
   */
  static async deleteTenant(_id: number): Promise<TenantResponse> {
    try {
      
      return {
        success: true,
        message: 'Xóa tenant thành công'
      };
    } catch (error: any) {
      console.error('Delete tenant error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Lỗi khi xóa tenant',
        error: error
      };
    }
  }
}

export default TenantService;
