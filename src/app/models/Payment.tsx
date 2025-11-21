export interface Package {
  id: string;
  name: string;
  price: string;
  priceInCents: number;
  duration: string;
  features: string[];
  highlighted?: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  userEmail: string;
  packageId: string;
  packageName: string;
  amount: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  orderId: string;
  createdAt: string;
  updatedAt?: string;
  qrCode?: string;
  notes?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: Payment;
  error?: string;
}

export const PACKAGES: Package[] = [
  {
    id: 'free',
    name: 'FREE',
    price: 'FREE',
    priceInCents: 0,
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
    price: '$28/Tháng',
    priceInCents: 2800,
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
    price: '$35/Tháng',
    priceInCents: 3500,
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
    price: '$49/Tháng',
    priceInCents: 4900,
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
