import axiosInstance from '../../config/axiosConfig';

export interface RecentSuspicious {
  linkId: number;
  url: string;
  pageTitle?: string;
  reason?: string | null;
  detectedAt?: string;
  checkResult?: string;
  confidenceScore?: number;
  userId?: string | null;
}

export interface PhishingSuspicious {
  suspiciousId: number;
  tenantId?: number | null;
  userId?: number | null;
  url: string;
  pageTitle?: string;
  pageContent?: string;
  htmlContent?: string;
  detectedAt?: string;
  checkResult?: string;
  confidenceScore?: number;
  matchedPatternId?: number | null;
  actionTaken?: string;
  status?: string;
  matchedPattern?: any;
  tenant?: any;
  user?: any;
}

export interface SuspiciousResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}

class SuspiciousLinkService {
  static async getRecent(limit = 100): Promise<SuspiciousResponse> {
    try {
      const res = await axiosInstance.get('/api/SuspiciousLinks/recent', { params: { limit } });
      return { success: true, data: Array.isArray(res.data) ? res.data as RecentSuspicious[] : [res.data] };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Không lấy được recent', error: err.response?.data };
    }
  }

  static async getPhishingList(): Promise<SuspiciousResponse> {
    try {
      const res = await axiosInstance.get('/api/SuspiciousLinks/phishing');
      return { success: true, data: Array.isArray(res.data) ? res.data as PhishingSuspicious[] : [res.data] };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Không lấy được phishing list', error: err.response?.data };
    }
  }

  // Promote a recent URL -> create phishing record (POST /api/SuspiciousLinks/phishing)
  static async createPhishingFromUrl(payload: { url: string }): Promise<SuspiciousResponse> {
    try {
      const res = await axiosInstance.post('/api/SuspiciousLinks/phishing', payload);
      return { success: true, message: res.data?.message || 'Đã tạo phishing', data: res.data };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Tạo phishing thất bại', error: err.response?.data };
    }
  }

  // Report a suspicious link (POST /api/SuspiciousLinks/report)
  static async reportLink(payload: { url: string; pageTitle?: string; reason?: string }): Promise<SuspiciousResponse> {
    try {
      const res = await axiosInstance.post('/api/SuspiciousLinks/report', payload);
      return { success: true, message: res.data?.message || 'Báo cáo thành công', data: res.data };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Báo cáo thất bại', error: err.response?.data };
    }
  }

  // Update status of a phishing suspicious (PUT /api/SuspiciousLinks?suspiciousId=...)
  static async updatePhishingStatus(suspiciousId: number, status: string): Promise<SuspiciousResponse> {
    try {
      const res = await axiosInstance.put('/api/SuspiciousLinks', { status }, { params: { suspiciousId } });
      return { success: true, message: res.data?.message || 'Cập nhật status thành công', data: res.data };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Cập nhật status thất bại', error: err.response?.data };
    }
  }
}

export default SuspiciousLinkService;