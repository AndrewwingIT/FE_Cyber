# Hướng Dẫn Tích Hợp API cho Trang Admin

## 📋 Mục Lục

1. [Tổng Quan](#tổng-quan)
2. [Kiểm Tra API Backend](#kiểm-tra-api-backend)
3. [Cấu Hình Cơ Bản](#cấu-hình-cơ-bản)
4. [Tích Hợp Theo Từng Phần](#tích-hợp-theo-từng-phần)
   - [Dashboard Stats](#1-dashboard-stats)
   - [Feature Management](#2-feature-management)
   - [Subscription Management](#3-subscription-management)
   - [Suspicious Links Management](#4-suspicious-links-management)
   - [Trusted Links Management](#5-trusted-links-management)
   - [Tenant Management](#6-tenant-management)
   - [Payment Management](#7-payment-management)
5. [Tạo Service Files](#tạo-service-files)
6. [Cập Nhật Components](#cập-nhật-components)
7. [Xử Lý Lỗi](#xử-lý-lỗi)
8. [Testing](#testing)

---

## 📖 Tổng Quan

Tài liệu này hướng dẫn cách tích hợp API từ backend vào trang Admin Dashboard. Backend API được cung cấp tại:

**🔗 Swagger Documentation:** [https://user-protection.onrender.com/swagger/index.html](https://user-protection.onrender.com/swagger/index.html)

### Cấu Trúc Hiện Tại

- **Base URL:** `https://user-protection.onrender.com/`
- **Axios Config:** `src/config/axiosConfig.ts`
- **Service Pattern:** Static methods trong service classes
- **Authentication:** Bearer token từ sessionStorage

---

## 🔍 Kiểm Tra API Backend

### Bước 1: Truy Cập Swagger Documentation

1. Mở trình duyệt và truy cập: `https://user-protection.onrender.com/swagger/index.html`
2. Xem các API endpoints có sẵn
3. Ghi lại:
   - Endpoint paths (ví dụ: `/api/Features`, `/api/Subscriptions`)
   - HTTP methods (GET, POST, PUT, DELETE)
   - Request/Response schemas
   - Authentication requirements

### Bước 2: Kiểm Tra Endpoints Cần Thiết

Đối với trang Admin, bạn cần các endpoints sau:

#### Dashboard Stats
- `GET /api/Admin/stats` - Lấy thống kê tổng quan

#### Features
- `GET /api/Features` - Lấy danh sách features
- `GET /api/Features/{id}` - Lấy chi tiết feature
- `POST /api/Features` - Tạo feature mới
- `PUT /api/Features/{id}` - Cập nhật feature
- `DELETE /api/Features/{id}` - Xóa feature

#### Subscriptions
- `GET /api/Subscriptions` - Lấy danh sách subscriptions
- `GET /api/Subscriptions/{id}` - Lấy chi tiết subscription
- `POST /api/Subscriptions` - Tạo subscription mới
- `PUT /api/Subscriptions/{id}` - Cập nhật subscription
- `DELETE /api/Subscriptions/{id}` - Hủy subscription

#### Suspicious Links
- `GET /api/SuspiciousLinks` - Lấy danh sách suspicious links
- `GET /api/SuspiciousLinks/{id}` - Lấy chi tiết
- `POST /api/SuspiciousLinks` - Báo cáo link mới
- `PUT /api/SuspiciousLinks/{id}/status` - Cập nhật trạng thái
- `DELETE /api/SuspiciousLinks/{id}` - Xóa link

#### Trusted Links
- `GET /api/TrustedLinks` - Lấy danh sách trusted links
- `GET /api/TrustedLinks/{id}` - Lấy chi tiết
- `POST /api/TrustedLinks` - Thêm trusted link
- `PUT /api/TrustedLinks/{id}` - Cập nhật trusted link
- `DELETE /api/TrustedLinks/{id}` - Xóa trusted link

#### Tenants
- `GET /api/Tenants` - Lấy danh sách tenants
- `GET /api/Tenants/{id}` - Lấy chi tiết tenant
- `POST /api/Tenants` - Tạo tenant mới
- `PUT /api/Tenants/{id}` - Cập nhật tenant
- `DELETE /api/Tenants/{id}` - Xóa tenant

#### Payments
- `GET /api/Payment` - Lấy danh sách payments (đã có)
- `PUT /api/Payment/{id}/status` - Cập nhật trạng thái (đã có)

> **Lưu ý:** Tên endpoints có thể khác với ví dụ trên. Hãy kiểm tra Swagger documentation để xác định chính xác.

---

## ⚙️ Cấu Hình Cơ Bản

### File: `src/config/axiosConfig.ts`

File này đã được cấu hình sẵn với:
- Base URL: `https://user-protection.onrender.com/`
- Authorization header với Bearer token
- Request/Response interceptors

```typescript
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://user-protection.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
```

---

## 🔧 Tích Hợp Theo Từng Phần

### 1. Dashboard Stats

#### Tạo Service: `src/app/services/AdminService.ts`

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  suspiciousLinks: number;
  trustedLinks: number;
}

export class AdminService {
  static async getDashboardStats(): Promise<{
    success: boolean;
    message?: string;
    data?: DashboardStats;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Admin/stats');
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Get dashboard stats error:', error.response?.data);
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được thống kê',
        error: error.response?.data,
      };
    }
  }
}

export default AdminService;
```

#### Cập Nhật Component: `src/components/Admin/DashboardStats.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import AdminService from '../../app/services/AdminService';
import { toast } from 'react-toastify';

// ... existing imports ...

const DashboardStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    suspiciousLinks: 0,
    trustedLinks: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const response = await AdminService.getDashboardStats();
    if (response.success && response.data) {
      setStats(response.data);
    } else {
      toast.error(response.message || 'Lỗi khi tải thống kê');
    }
  };

  return (
    <Box sx={{ display: 'grid', ... }}>
      {/* ... existing JSX using stats state ... */}
    </Box>
  );
};
```

---

### 2. Feature Management

#### Tạo Service: `src/app/services/FeatureService.ts`

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface Feature {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
}

export class FeatureService {
  static async getAllFeatures(): Promise<{
    success: boolean;
    message?: string;
    data?: Feature[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Features');
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách features',
        error: error.response?.data,
      };
    }
  }

  static async createFeature(featureData: Partial<Feature>): Promise<{
    success: boolean;
    message?: string;
    data?: Feature;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.post('/api/Features', featureData);
      return {
        success: true,
        message: response.data?.message || 'Tạo feature thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Tạo feature thất bại',
        error: error.response?.data,
      };
    }
  }

  static async updateFeature(id: number, featureData: Partial<Feature>): Promise<{
    success: boolean;
    message?: string;
    data?: Feature;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.put(`/api/Features/${id}`, featureData);
      return {
        success: true,
        message: response.data?.message || 'Cập nhật feature thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật feature thất bại',
        error: error.response?.data,
      };
    }
  }

  static async deleteFeature(id: number): Promise<{
    success: boolean;
    message?: string;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.delete(`/api/Features/${id}`);
      return {
        success: true,
        message: response.data?.message || 'Xóa feature thành công',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Xóa feature thất bại',
        error: error.response?.data,
      };
    }
  }
}

export default FeatureService;
```

---

### 3. Subscription Management

#### Tạo Service: `src/app/services/SubscriptionService.ts`

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface Subscription {
  id: number;
  userId: number;
  plan: string;
  status: string;
  startDate: string;
  endDate: string;
  amount: string;
}

export class SubscriptionService {
  static async getAllSubscriptions(): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Subscriptions');
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách subscriptions',
        error: error.response?.data,
      };
    }
  }

  static async createSubscription(subscriptionData: Partial<Subscription>): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.post('/api/Subscriptions', subscriptionData);
      return {
        success: true,
        message: response.data?.message || 'Tạo subscription thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Tạo subscription thất bại',
        error: error.response?.data,
      };
    }
  }

  static async updateSubscription(id: number, subscriptionData: Partial<Subscription>): Promise<{
    success: boolean;
    message?: string;
    data?: Subscription;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.put(`/api/Subscriptions/${id}`, subscriptionData);
      return {
        success: true,
        message: response.data?.message || 'Cập nhật subscription thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật subscription thất bại',
        error: error.response?.data,
      };
    }
  }

  static async cancelSubscription(id: number): Promise<{
    success: boolean;
    message?: string;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.put(`/api/Subscriptions/${id}/cancel`);
      return {
        success: true,
        message: response.data?.message || 'Hủy subscription thành công',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Hủy subscription thất bại',
        error: error.response?.data,
      };
    }
  }
}

export default SubscriptionService;
```

---

### 4. Suspicious Links Management

#### Tạo Service: `src/app/services/SuspiciousLinkService.ts`

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface SuspiciousLink {
  id: number;
  url: string;
  reportedBy: string;
  riskLevel: string;
  status: string;
  reportDate: string;
}

export class SuspiciousLinkService {
  static async getAllSuspiciousLinks(): Promise<{
    success: boolean;
    message?: string;
    data?: SuspiciousLink[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/SuspiciousLinks');
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách suspicious links',
        error: error.response?.data,
      };
    }
  }

  static async createSuspiciousLink(linkData: Partial<SuspiciousLink>): Promise<{
    success: boolean;
    message?: string;
    data?: SuspiciousLink;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.post('/api/SuspiciousLinks', linkData);
      return {
        success: true,
        message: response.data?.message || 'Báo cáo link thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Báo cáo link thất bại',
        error: error.response?.data,
      };
    }
  }

  static async updateLinkStatus(id: number, status: string, action?: string): Promise<{
    success: boolean;
    message?: string;
    data?: SuspiciousLink;
    error?: any;
  }> {
    try {
      const endpoint = action === 'block' 
        ? `/api/SuspiciousLinks/${id}/block`
        : action === 'approve'
        ? `/api/SuspiciousLinks/${id}/approve`
        : `/api/SuspiciousLinks/${id}/status`;
      
      const response = await axiosInstance.put(endpoint, { status });
      return {
        success: true,
        message: response.data?.message || 'Cập nhật trạng thái thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật trạng thái thất bại',
        error: error.response?.data,
      };
    }
  }
}

export default SuspiciousLinkService;
```

---

### 5. Trusted Links Management

#### Tạo Service: `src/app/services/TrustedLinkService.ts`

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface TrustedLink {
  id: number;
  url: string;
  addedBy: string;
  category: string;
  status: string;
  addedDate: string;
}

export class TrustedLinkService {
  static async getAllTrustedLinks(): Promise<{
    success: boolean;
    message?: string;
    data?: TrustedLink[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/TrustedLinks');
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách trusted links',
        error: error.response?.data,
      };
    }
  }

  static async createTrustedLink(linkData: Partial<TrustedLink>): Promise<{
    success: boolean;
    message?: string;
    data?: TrustedLink;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.post('/api/TrustedLinks', linkData);
      return {
        success: true,
        message: response.data?.message || 'Thêm trusted link thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Thêm trusted link thất bại',
        error: error.response?.data,
      };
    }
  }

  static async updateTrustedLink(id: number, linkData: Partial<TrustedLink>): Promise<{
    success: boolean;
    message?: string;
    data?: TrustedLink;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.put(`/api/TrustedLinks/${id}`, linkData);
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

  static async deleteTrustedLink(id: number): Promise<{
    success: boolean;
    message?: string;
    error?: any;
  }> {
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
```

---

### 6. Tenant Management

#### Tạo Service: `src/app/services/TenantService.ts`

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface Tenant {
  id: number;
  name: string;
  domain: string;
  status: string;
  users: number;
  createdDate: string;
}

export class TenantService {
  static async getAllTenants(): Promise<{
    success: boolean;
    message?: string;
    data?: Tenant[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Tenants');
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được danh sách tenants',
        error: error.response?.data,
      };
    }
  }

  static async getTenantById(id: number): Promise<{
    success: boolean;
    message?: string;
    data?: Tenant;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get(`/api/Tenants/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Không lấy được thông tin tenant',
        error: error.response?.data,
      };
    }
  }

  static async createTenant(tenantData: Partial<Tenant>): Promise<{
    success: boolean;
    message?: string;
    data?: Tenant;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.post('/api/Tenants', tenantData);
      return {
        success: true,
        message: response.data?.message || 'Tạo tenant thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Tạo tenant thất bại',
        error: error.response?.data,
      };
    }
  }

  static async updateTenant(id: number, tenantData: Partial<Tenant>): Promise<{
    success: boolean;
    message?: string;
    data?: Tenant;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.put(`/api/Tenants/${id}`, tenantData);
      return {
        success: true,
        message: response.data?.message || 'Cập nhật tenant thành công',
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Cập nhật tenant thất bại',
        error: error.response?.data,
      };
    }
  }

  static async deleteTenant(id: number): Promise<{
    success: boolean;
    message?: string;
    error?: any;
  }> {
    try {
      const response = await axiosInstance.delete(`/api/Tenants/${id}`);
      return {
        success: true,
        message: response.data?.message || 'Xóa tenant thành công',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Xóa tenant thất bại',
        error: error.response?.data,
      };
    }
  }
}

export default TenantService;
```

---

### 7. Payment Management

Payment Management đã được tích hợp một phần. File `src/app/services/PaymentService.ts` đã có sẵn.

#### Kiểm Tra và Hoàn Thiện

Đảm bảo các methods sau đã có trong `PaymentService.ts`:

- ✅ `getAllPayments()` - Lấy danh sách payments
- ✅ `updatePaymentStatus()` - Cập nhật trạng thái payment

Nếu thiếu, thêm vào service.

---

## 📝 Tạo Service Files

### Bước 1: Tạo Thư Mục Services

Các file service nên được đặt trong: `src/app/services/`

### Bước 2: Tạo Model Files (Tùy chọn)

Tạo các model files trong `src/app/models/` để định nghĩa types:

```typescript
// src/app/models/Feature.ts
export interface Feature {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
}
```

### Bước 3: Pattern Chung cho Services

Tất cả services nên follow pattern này:

```typescript
import axiosInstance from '../../config/axiosConfig';

export interface EntityType {
  // Define interface
}

export class EntityService {
  static async getAll(): Promise<{
    success: boolean;
    message?: string;
    data?: EntityType[];
    error?: any;
  }> {
    try {
      const response = await axiosInstance.get('/api/Entities');
      return {
        success: true,
        data: Array.isArray(response.data) ? response.data : [response.data],
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Error message',
        error: error.response?.data,
      };
    }
  }
  
  // Add other methods...
}

export default EntityService;
```

---

## 🔄 Cập Nhật Components

### Bước 1: Cập Nhật AdminDashboard.tsx

Thay thế mock data bằng API calls:

```typescript
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import FeatureService from '../../../app/services/FeatureService';
import SubscriptionService from '../../../app/services/SubscriptionService';
import SuspiciousLinkService from '../../../app/services/SuspiciousLinkService';
import TrustedLinkService from '../../../app/services/TrustedLinkService';
import TenantService from '../../../app/services/TenantService';
import AdminService from '../../../app/services/AdminService';

const AdminDashboard: React.FC = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [suspiciousLinks, setSuspiciousLinks] = useState<SuspiciousLink[]>([]);
  const [trustedLinks, setTrustedLinks] = useState<TrustedLink[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Load all data in parallel
      const [featuresRes, subsRes, suspiciousRes, trustedRes, tenantsRes] = await Promise.all([
        FeatureService.getAllFeatures(),
        SubscriptionService.getAllSubscriptions(),
        SuspiciousLinkService.getAllSuspiciousLinks(),
        TrustedLinkService.getAllTrustedLinks(),
        TenantService.getAllTenants(),
      ]);

      if (featuresRes.success && featuresRes.data) setFeatures(featuresRes.data);
      if (subsRes.success && subsRes.data) setSubscriptions(subsRes.data);
      if (suspiciousRes.success && suspiciousRes.data) setSuspiciousLinks(suspiciousRes.data);
      if (trustedRes.success && trustedRes.data) setTrustedLinks(trustedRes.data);
      if (tenantsRes.success && tenantsRes.data) setTenants(tenantsRes.data);
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Handle refresh when dialog closes
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    loadAllData(); // Reload data after dialog closes
  };

  // ... rest of component
};
```

### Bước 2: Cập Nhật AdminContent.tsx

Thêm handler cho các actions (delete, update status):

```typescript
const handleDelete = async (type: string, id: number) => {
  if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;

  try {
    let response;
    switch (type) {
      case 'feature':
        response = await FeatureService.deleteFeature(id);
        break;
      case 'subscription':
        response = await SubscriptionService.cancelSubscription(id);
        break;
      // ... other cases
    }

    if (response.success) {
      toast.success(response.message || 'Xóa thành công');
      onRefresh?.(); // Call refresh callback
    } else {
      toast.error(response.message || 'Xóa thất bại');
    }
  } catch (error) {
    toast.error('Lỗi khi xóa');
  }
};
```

### Bước 3: Cập Nhật AdminDialog.tsx

Implement form cho từng loại entity:

```typescript
const AdminDialog: React.FC<AdminDialogProps> = ({
  open,
  onClose,
  dialogType,
  selectedItem,
  currentTab, // Add currentTab to know which form to show
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;
      // Determine which service to use based on currentTab
      switch (currentTab) {
        case 0: // Features
          if (dialogType === 'add') {
            response = await FeatureService.createFeature(formData);
          } else {
            response = await FeatureService.updateFeature(selectedItem.id, formData);
          }
          break;
        case 1: // Subscriptions
          if (dialogType === 'add') {
            response = await SubscriptionService.createSubscription(formData);
          } else {
            response = await SubscriptionService.updateSubscription(selectedItem.id, formData);
          }
          break;
        // ... other cases
      }

      if (response.success) {
        toast.success(response.message || 'Thành công');
        onClose();
        onRefresh?.(); // Refresh parent data
      } else {
        toast.error(response.message || 'Thất bại');
      }
    } catch (error) {
      toast.error('Lỗi khi xử lý');
    } finally {
      setLoading(false);
    }
  };

  // Render form based on currentTab and dialogType
};
```

---

## ⚠️ Xử Lý Lỗi

### Error Handling Pattern

Tất cả service methods nên return consistent format:

```typescript
{
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
}
```

### Toast Notifications

Sử dụng `react-toastify` để hiển thị thông báo:

```typescript
import { toast } from 'react-toastify';

// Success
toast.success('Thành công!');

// Error
toast.error('Lỗi xảy ra!');

// Warning
toast.warning('Cảnh báo!');

// Info
toast.info('Thông tin');
```

### Loading States

Thêm loading indicators:

```typescript
const [loading, setLoading] = useState(false);

// In component
{loading && <CircularProgress />}
```

---

## 🧪 Testing

### Bước 1: Test API Endpoints

1. Mở Swagger UI: `https://user-protection.onrender.com/swagger/index.html`
2. Test từng endpoint bằng cách:
   - Click vào endpoint
   - Click "Try it out"
   - Điền thông tin
   - Click "Execute"
   - Xem response

### Bước 2: Test trong Frontend

1. Mở browser DevTools (F12)
2. Vào tab Network
3. Thực hiện các actions trong admin panel
4. Kiểm tra:
   - Request URL đúng chưa?
   - Request headers có Authorization token chưa?
   - Request body đúng format chưa?
   - Response data có đúng structure chưa?

### Bước 3: Test Error Cases

- Test với invalid token
- Test với missing required fields
- Test với invalid IDs
- Test network errors

---

## 📋 Checklist

### Service Files
- [ ] `src/app/services/AdminService.ts` - Dashboard stats
- [ ] `src/app/services/FeatureService.ts` - Feature management
- [ ] `src/app/services/SubscriptionService.ts` - Subscription management
- [ ] `src/app/services/SuspiciousLinkService.ts` - Suspicious links
- [ ] `src/app/services/TrustedLinkService.ts` - Trusted links
- [ ] `src/app/services/TenantService.ts` - Tenant management
- [ ] `src/app/services/PaymentService.ts` - Payment (đã có, kiểm tra)

### Components Update
- [ ] `AdminDashboard.tsx` - Replace mock data with API calls
- [ ] `DashboardStats.tsx` - Load stats from API
- [ ] `AdminContent.tsx` - Add delete/update handlers
- [ ] `AdminDialog.tsx` - Implement forms for each entity type

### Error Handling
- [ ] Add error handling in all service calls
- [ ] Add toast notifications
- [ ] Add loading states
- [ ] Handle unauthorized errors

### Testing
- [ ] Test all CRUD operations
- [ ] Test error scenarios
- [ ] Test with different user roles
- [ ] Test network failures

---

## 🔗 Tài Liệu Tham Khảo

- **Swagger Documentation:** [https://user-protection.onrender.com/swagger/index.html](https://user-protection.onrender.com/swagger/index.html)
- **Axios Config:** `src/config/axiosConfig.ts`
- **Payment Service Example:** `src/app/services/PaymentService.ts`

---

## 📝 Lưu Ý Quan Trọng

1. **Kiểm Tra Swagger Trước:** Luôn kiểm tra Swagger documentation để xác định chính xác:
   - Endpoint paths
   - Request/Response formats
   - Required/Optional fields
   - Authentication requirements

2. **Error Messages:** Đảm bảo error messages hiển thị bằng tiếng Việt cho user

3. **Loading States:** Luôn hiển thị loading indicator khi đang gọi API

4. **Data Refresh:** Sau khi create/update/delete, luôn refresh lại danh sách

5. **Authentication:** Đảm bảo token được gửi trong mọi request (đã setup trong axiosConfig)

6. **Response Format:** Backend có thể trả về format khác, cần kiểm tra và điều chỉnh code cho phù hợp

---

## 🚀 Bước Tiếp Theo

1. Truy cập Swagger documentation để xem chính xác các endpoints
2. Tạo các service files theo pattern đã nêu
3. Cập nhật components để sử dụng services
4. Test từng phần một
5. Fix bugs và optimize performance

---

**Chúc bạn tích hợp thành công! 🎉**

