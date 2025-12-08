# 🎯 Payment System Implementation Guide

## 📋 Tổng Quan Hệ Thống

Hệ thống thanh toán hoàn chỉnh với flow:
1. **Download** → Bắt login
2. **Login** → Check payment → Redirect to `/payment` nếu chưa pay
3. **Payment** → Hiện gói + QR code → Chờ admin xác nhận
4. **Admin** → Xem danh sách + Update status → Auto gửi email

---

## 📁 Các File Được Tạo/Sửa

### 🆕 File Mới Tạo:

#### 1. **Context & Hooks**
- `src/app/context/PaymentContext.tsx` - Context lưu payment info
- `src/app/context/usePayment.ts` - Hook để sử dụng payment

#### 2. **Models**
- `src/app/models/Payment.tsx` - TypeScript interfaces + mock data packages

#### 3. **Services**
- `src/app/services/PaymentService.ts` - Gọi API payment (create, update status, etc.)
- `src/app/services/EmailService.ts` - Gọi API email notification

#### 4. **Pages**
- `src/app/pages/payment/PaymentPage.tsx` - Trang hiện gói + QR code

#### 5. **Components**
- `src/components/Admin/AdminPaymentManagement.tsx` - Tab Payment cho admin

#### 6. **Documentation**
- `API_ENDPOINTS.md` - Danh sách API endpoints cần implement

### ✏️ File Được Sửa:

1. **`src/main.tsx`** - Thêm PaymentProvider + ToastContainer
2. **`src/app/routes/MainRoute.tsx`** - Thêm route `/payment`
3. **`src/components/Login/LoginForm.tsx`** - Redirect sang `/payment` sau login
4. **`src/components/Home/HomeForm.tsx`** - Bắt login trước download
5. **`src/app/pages/admin/AdminDashboard.tsx`** - Thêm tab Payment
6. **`src/components/Admin/AdminTabs.tsx`** - Thêm Payment tab

---

## 🔄 User Flow

### 1️⃣ Download Without Login
```
User click "Tải xuống" → Check token
├─ Không có token → Redirect /login
└─ Có token → Download file
```

### 2️⃣ After Login
```
LoginForm.handleLogin()
├─ Check role:
│  ├─ Admin → Redirect /admin
│  └─ User → Check payment status:
│     ├─ Chưa có payment → Redirect /payment
│     ├─ Status pending → Redirect /payment
│     └─ Status completed → Redirect /
```

### 3️⃣ Payment Page
```
/payment (PaymentPage)
├─ Hiện 4 gói (FREE, BASIC, PLUS, PREMIUM)
├─ User chọn gói:
│  ├─ Nếu FREE → Completed + Redirect /
│  └─ Nếu paid gói → Generate QR code + Dialog
├─ Dialog hiện QR + Thông tin thanh toán
└─ User click "Xác Nhận" → Save status=pending + Redirect /
```

### 4️⃣ Admin Verification
```
/admin → Tab "Payments"
├─ Hiện bảng danh sách payment (pending status)
├─ Admin click "Xác Nhận" → Dialog update status
├─ Chọn trạng thái (completed/failed/cancelled)
├─ System cập nhật database
└─ System gửi email thông báo tự động
```

---

## 🔌 API Integration Checklist

### Backend Cần Implement (trong `API_ENDPOINTS.md`):

**Payment Endpoints:**
- ✅ POST `/api/Payment/create` - Tạo đơn thanh toán
- ✅ GET `/api/Payment/status/{orderId}` - Lấy trạng thái
- ✅ GET `/api/Payment/user/{email}` - Lấy payment user
- ✅ GET `/api/Payment/all` - Lấy tất cả (admin)
- ✅ PUT `/api/Payment/status/{orderId}` - Update status (admin)
- ✅ POST `/api/Payment/generate-qr` - Tạo QR code

**Email Endpoints:**
- ✅ POST `/api/Email/send-payment-confirmation`
- ✅ POST `/api/Email/send-payment-reminder`
- ✅ POST `/api/Email/send-payment-failure`
- ✅ POST `/api/Email/send-welcome`

---

## 💾 Session Storage Keys

Frontend lưu trữ các thông tin:
```javascript
sessionStorage.getItem('token')           // JWT token
sessionStorage.getItem('userEmail')       // User email
sessionStorage.getItem('userRole')        // 'Admin' hoặc 'User'
sessionStorage.getItem('paymentInfo')     // JSON stringify PaymentInfo
```

**PaymentInfo Structure:**
```typescript
{
  packageName: string,      // 'BASIC', 'PLUS', etc
  price: string,           // '$28'
  status: 'pending' | 'completed' | 'failed' | 'cancelled',
  orderId: string,         // Mã đơn hàng từ backend
  qrCode?: string,         // Data URL của QR code
  createdAt?: string       // ISO datetime
}
```

---

## 🎨 UI Components

### PaymentPage - 4 Package Cards
```
┌─────────────────────────┐
│      FREE BASIC PLUS PREMIUM
│      
│ Mỗi card hiện:
│ - Package name & price
│ - Danh sách features
│ - Button "Sử dụng" hoặc "Thanh toán"
│
│ PLUS có highlight background (pink)
└─────────────────────────┘
```

### Admin Payment Tab
```
┌─────────────────────────┐
│  Quản Lý Thanh Toán
│
│  Bảng với cột:
│  - Mã đơn hàng
│  - Email
│  - Gói
│  - Số tiền
│  - Trạng thái (chip color)
│  - Ngày tạo
│  - Hành động (button)
│
│  Click "Xác Nhận":
│  - Dialog chọn status
│  - Input ghi chú
│  - Submit → Auto gửi email
└─────────────────────────┘
```

---

## 🚀 How to Test

### Test Scenario 1: Free Package
```
1. Click "Tải xuống" → Redirect /login
2. Login (any user)
3. Redirect /payment
4. Click "Sử Dụng" trên FREE
5. Redirect / (completed)
```

### Test Scenario 2: Paid Package
```
1. Login as user
2. Redirect /payment
3. Click "Thanh toán ngay" trên PLUS
4. Dialog hiện QR code
5. Click "Xác Nhận Thanh Toán"
6. Status = pending
7. Redirect /
```

### Test Scenario 3: Admin Verification
```
1. Login as admin (admin@gmail.com)
2. Redirect /admin
3. Click tab "Payments"
4. Thấy danh sách pending payment
5. Click "Xác Nhận"
6. Chọn status = completed
7. Submit
8. Email được gửi (mock or real)
```

---

## 📧 Email Notifications

Các email được gửi khi admin update status:

### ✅ Completed
```
Tiêu đề: "Thanh toán thành công - Gói [PACKAGE_NAME]"
Nội dung:
- Xác nhận thanh toán gói [PACKAGE_NAME]
- Số tiền: [AMOUNT]
- Mã đơn: [ORDER_ID]
- Ngày xác nhận: [DATE]
- Cảm ơn sử dụng dịch vụ
```

### ❌ Failed
```
Tiêu đề: "Thanh toán thất bại - Vui lòng thử lại"
Nội dung:
- Thanh toán gói [PACKAGE_NAME] thất bại
- Vui lòng liên hệ support hoặc thử lại
```

### ❌ Cancelled
```
Tiêu đề: "Đơn thanh toán đã bị hủy"
Nội dung:
- Đơn thanh toán [ORDER_ID] đã bị hủy
- Nếu có thắc mắc liên hệ support
```

---

## 🔐 Security Notes

✅ **Implemented:**
- Check token trước download
- Check payment status sau login
- Only admin có thể update status (route protection needed in backend)
- Email notification để xác thực

⚠️ **TODO Backend:**
- Add authentication middleware (verify admin)
- Validate orderId format
- Sanitize email input
- Rate limiting on payment endpoints
- Logging for payment actions

---

## 📝 Code Structure

```
src/
├── app/
│   ├── context/
│   │   ├── PaymentContext.tsx       ← Context provider
│   │   └── usePayment.ts            ← Custom hook
│   ├── models/
│   │   └── Payment.tsx              ← Types & mock data
│   ├── services/
│   │   ├── PaymentService.ts        ← Payment API calls
│   │   └── EmailService.ts          ← Email API calls
│   ├── pages/
│   │   ├── payment/
│   │   │   └── PaymentPage.tsx      ← Payment UI
│   │   └── admin/
│   │       └── AdminDashboard.tsx   ← Modified
│   └── routes/
│       └── MainRoute.tsx            ← Added /payment route
├── components/
│   ├── Admin/
│   │   ├── AdminPaymentManagement.tsx ← New payment tab
│   │   └── AdminTabs.tsx             ← Modified
│   ├── Home/
│   │   └── HomeForm.tsx              ← Modified (login check)
│   └── Login/
│       └── LoginForm.tsx             ← Modified (redirect logic)
└── main.tsx                          ← Modified (PaymentProvider)
```

---

## ✨ Features Implemented

✅ Free gói không cần thanh toán
✅ Paid gói hiện QR code
✅ Bắt login trước download
✅ Redirect payment sau login
✅ Admin xem danh sách payment
✅ Admin update status
✅ Auto email notification
✅ Session storage lưu payment info
✅ TypeScript full type-safe
✅ Material-UI UI components
✅ Toast notifications

---

## 🐛 Known Limitations

1. **QR Code Generation:**
   - Frontend chỉ tạo placeholder QR
   - Backend cần implement thực tế (qrcode library hoặc API)

2. **Email Sending:**
   - Frontend call API endpoint
   - Backend cần setup email service (SendGrid, NodeMailer, etc.)

3. **Payment Processing:**
   - Hiện là manual verification (admin check + approve)
   - Có thể integrate PayOS hoặc Stripe sau này

4. **Admin Authentication:**
   - Cần implement authorization check trên backend
   - Hiện chỉ check email == 'admin@gmail.com'

---

## 🔄 Next Steps untuk Backend

1. Tạo Payment table + CRUD operations
2. Implement 6 payment endpoints
3. Implement 4 email endpoints
4. Setup email service (SMTP)
5. Add admin authorization middleware
6. Generate QR codes (use qrcode library)
7. Test payment flow end-to-end

---

## 📞 Support

Nếu có lỗi:
1. Check browser console (F12)
2. Check Network tab xem API response
3. Verify session storage có payment info
4. Trace through UserFlow ở trên
