import axiosInstance from '../../config/axiosConfig';

export interface TrustedLink {
  linkId: number;
  domain: string;
  url: string;
  category: string;
  source: string;
  status: string;
}

export interface TrustedLinkResponse {
  success: boolean;
  message?: string;
  data?: TrustedLink | TrustedLink[];
  error?: any;
}

class TrustedLinkService {
  static async getAllTrustedLinks(): Promise<TrustedLinkResponse> {
    try {
      const response = await axiosInstance.get('/api/TrustedLinks');
      let links = Array.isArray(response.data) ? response.data : [response.data];
      return {
        success: true,
        data: links as TrustedLink[],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách trusted links',
        error: error.response?.data,
      };
    }
  }

  static async getTrustedLinkById(id: number): Promise<TrustedLinkResponse> {
    try {
      const response = await axiosInstance.get(`/api/TrustedLinks/${id}`);
      return {
        success: true,
        data: response.data as TrustedLink,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được trusted link',
        error: error.response?.data,
      };
    }
  }

  static async createTrustedLink(data: Omit<TrustedLink, 'linkId'>): Promise<TrustedLinkResponse> {
    try {
      const response = await axiosInstance.post('/api/TrustedLinks', data);
      return {
        success: true,
        message: response.data?.message || 'Tạo trusted link thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Tạo trusted link thất bại',
        error: error.response?.data,
      };
    }
  }

  static async updateTrustedLink(id: number, data: Omit<TrustedLink, 'linkId'>): Promise<TrustedLinkResponse> {
    try {
      // include linkId in body to match backend expectation
      const payload = { linkId: id, ...data };
      const response = await axiosInstance.put(`/api/TrustedLinks/${id}`, payload);
      return {
        success: true,
        message: response.data?.message || 'Cập nhật trusted link thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật trusted link thất bại',
        error: error.response?.data,
      };
    }
  }

  static async deleteTrustedLink(id: number): Promise<TrustedLinkResponse> {
    try {
      const response = await axiosInstance.delete(`/api/TrustedLinks/${id}`);
      return {
        success: true,
        message: response.data?.message || 'Xóa trusted link thành công',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Xóa trusted link thất bại',
        error: error.response?.data,
      };
    }
  }
}

export default TrustedLinkService;
