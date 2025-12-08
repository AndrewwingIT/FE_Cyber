# API Endpoints Cần Implement

## Payment Endpoints

### 1. Tạo Đơn Thanh Toán
**POST** `/api/Payment/create`

Request:
```json
{
  "packageId": "basic",
  "packageName": "BASIC",
  "amount": "$28",
  "userEmail": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Đơn thanh toán đã được tạo",
  "data": {
    "id": "pay_123",
    "orderId": "ORDER_1234567890",
    "userId": "user_123",
    "userEmail": "user@example.com",
    "packageId": "basic",
    "packageName": "BASIC",
    "amount": "$28",
    "status": "pending",
    "createdAt": "2024-11-16T10:00:00Z",
    "qrCode": "data:image/png;base64,..."
  }
}
```

---

### 2. Lấy Trạng Thái Thanh Toán
**GET** `/api/Payment/status/{orderId}`

Response:
```json
{
  "success": true,
  "data": {
    "id": "pay_123",
    "orderId": "ORDER_1234567890",
    "status": "pending",
    "amount": "$28",
    "packageName": "BASIC"
  }
}
```

---

### 3. Lấy Thanh Toán Của User
**GET** `/api/Payment/user/{userEmail}`

Response:
```json
{
  "success": true,
  "data": {
    "id": "pay_123",
    "orderId": "ORDER_1234567890",
    "userEmail": "user@example.com",
    "packageName": "BASIC",
    "status": "completed",
    "amount": "$28",
    "createdAt": "2024-11-16T10:00:00Z"
  }
}
```

---

### 4. Lấy Tất Cả Thanh Toán (Admin)
**GET** `/api/Payment/all`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "pay_123",
      "orderId": "ORDER_1234567890",
      "userId": "user_123",
      "userEmail": "user@example.com",
      "packageName": "BASIC",
      "status": "pending",
      "amount": "$28",
      "createdAt": "2024-11-16T10:00:00Z",
      "updatedAt": null
    },
    {
      "id": "pay_124",
      "orderId": "ORDER_1234567891",
      "userId": "user_124",
      "userEmail": "user2@example.com",
      "packageName": "PREMIUM",
      "status": "completed",
      "amount": "$49",
      "createdAt": "2024-11-15T10:00:00Z",
      "updatedAt": "2024-11-15T12:00:00Z"
    }
  ]
}
```

---

### 5. Cập Nhật Trạng Thái Thanh Toán (Admin)
**PUT** `/api/Payment/status/{orderId}`

Request:
```json
{
  "status": "completed",
  "notes": "Thanh toán qua chuyển khoản ngân hàng"
}
```

Response:
```json
{
  "success": true,
  "message": "Trạng thái thanh toán đã được cập nhật",
  "data": {
    "id": "pay_123",
    "orderId": "ORDER_1234567890",
    "status": "completed",
    "amount": "$28",
    "packageName": "BASIC",
    "userEmail": "user@example.com",
    "updatedAt": "2024-11-16T10:30:00Z"
  }
}
```

---

### 6. Tạo QR Code
**POST** `/api/Payment/generate-qr`

Request:
```json
{
  "orderId": "ORDER_1234567890",
  "amount": "$28"
}
```

Response:
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,..."
}
```

---

## Email Endpoints

### 1. Gửi Email Xác Nhận Thanh Toán
**POST** `/api/Email/send-payment-confirmation`

Request:
```json
{
  "userEmail": "user@example.com",
  "orderId": "ORDER_1234567890",
  "packageName": "BASIC",
  "status": "completed",
  "amount": "$28"
}
```

Response:
```json
{
  "success": true,
  "message": "Email đã được gửi"
}
```

---

### 2. Gửi Email Nhắc Nhở Thanh Toán
**POST** `/api/Email/send-payment-reminder`

Request:
```json
{
  "userEmail": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "Email nhắc nhở đã được gửi"
}
```

---

### 3. Gửi Email Thanh Toán Thất Bại
**POST** `/api/Email/send-payment-failure`

Request:
```json
{
  "userEmail": "user@example.com",
  "orderId": "ORDER_1234567890",
  "packageName": "BASIC",
  "amount": "$28"
}
```

Response:
```json
{
  "success": true,
  "message": "Email thông báo lỗi đã được gửi"
}
```

---

### 4. Gửi Email Chào Mừng
**POST** `/api/Email/send-welcome`

Request:
```json
{
  "userEmail": "user@example.com",
  "userName": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "message": "Email chào mừng đã được gửi"
}
```

---

## Database Schema (Reference)

### Payment Table
```sql
CREATE TABLE Payments (
  id VARCHAR(50) PRIMARY KEY,
  orderId VARCHAR(50) UNIQUE NOT NULL,
  userId VARCHAR(50),
  userEmail VARCHAR(255) NOT NULL,
  packageId VARCHAR(50) NOT NULL,
  packageName VARCHAR(100) NOT NULL,
  amount VARCHAR(20) NOT NULL,
  status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
  qrCode LONGTEXT,
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Frontend Integration Notes

1. **Payment Flow:**
   - User chưa login → Click download → Redirect to `/login`
   - User login → Check payment status → If not completed → Redirect to `/payment`
   - User chọn gói → System tạo QR code → User thanh toán → Chờ Admin xác nhận

2. **Admin Flow:**
   - Admin vào `/admin` → Tab "Payments"
   - Xem danh sách pending payments
   - Click "Xác Nhận" → Cập nhật status → Hệ thống tự động gửi email

3. **Email Templates (Backend cần implement):**
   - Payment Confirmation: "Thanh toán thành công - Gói {packageName}"
   - Payment Failure: "Thanh toán thất bại - Vui lòng thử lại"
   - Payment Reminder: "Bạn còn gói chưa thanh toán"
   - Welcome: "Chào mừng {userName} đến với Cyber Rampart"
