export interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  highlighted?: boolean;
  subscriptionId?: number; // <-- thêm trường này
}

export interface Payment {
  paymentId: number;
  subscriptionId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
  frontendReturnUrl?: string;
  subscription?: any; // Subscription object nếu cần
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: Payment | Payment[];
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
    price: 40000,
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
    price: 100000,
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
    price: 200000,
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
