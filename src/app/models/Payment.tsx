export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  highlighted?: boolean;
  subscriptionId?: number; // <-- thêm trường này
}

export interface User {
  id: string;
  userName?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  tenantId?: number;
  createdAt?: string;
  status?: string;
}

export interface Subscription {
  subscriptionId: number;
  tenantId?: number;
  userId: string;
  planId?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  autoRenew?: boolean;
  user?: User;
  plan?: any;
  tenant?: any;
}

export interface Payment {
  paymentId: number;
  subscriptionId: number;
  amount: number;
  paymentDate: string;
  paymentMethod?: string;
  transactionId: string;
  status: string;
  userId?: string;
  userEmail?: string;
  fullName?: string;
  frontendReturnUrl?: string;
  subscription?: Subscription;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: Payment;
  error?: any;
}

export const PACKAGES: Package[] = [
  {
    id: 'free',
    name: 'FREE',
    subscriptionId: 0,
    price: 0,
    duration: 'Lifetime',
    features: [
      'Quyền truy cập vào các khóa học dành cho người mới bắt đầu.',
      'Kiến thức cơ bản về nhận diện lừa đảo trực tuyến và thủ thuật lừa đảo.',
      'Các bài thực hành tốt nhất để duyệt web an toàn.',
    ],
  },
  {
    id: 'basic',
    name: 'BASIC',
    subscriptionId: 1,
    price: 2800,
    duration: 'Hàng tháng',
    features: [
      'Quyền truy cập vào các khóa học dành cho người mới bắt đầu.',
      'Kiến thức cơ bản về nhận diện lừa đảo trực tuyến và thủ thuật lừa đảo.',
      'Các bài thực hành tốt nhất để duyệt web an toàn.',
      'Quyền truy cập diễn đàn cộng đồng.',
    ],
  },
  {
    id: 'plus',
    name: 'PLUS',
    subscriptionId: 2,
    price: 3500,
    duration: 'Hàng tháng',
    highlighted: true,
    features: [
      'Mọi thứ đều đơn giản.',
      'Quyền truy cập vào các khóa học cấp độ trung cấp.',
      'Hướng dẫn và danh sách kiểm tra có thể tải xuống.',
      'Bản tin cảnh báo lừa đảo hàng tháng.',
      '✔️ Chứng chỉ hoàn thành.',
    ],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    subscriptionId: 3,
    price: 4900,
    duration: 'Hàng tháng',
    features: [
      'Tất cả những gì có trong gói Plus.',
      'Quyền truy cập vào các khóa học cấp độ nâng cao.',
      'Đánh giá rủi ro được cá nhân hóa.',
      'Hỗ trợ hỏi đáp ưu tiên.',
      'Tư vấn chuyên gia 1 kèm 1.',
    ],
  },
];
