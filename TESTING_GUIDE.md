# 🧪 Payment System Testing Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Application
```
http://localhost:5173
```

---

## 📱 Test Accounts

### User Account
- **Email:** user@example.com
- **Password:** password123
- **Role:** User
- **Expected Flow:** Home → Download (login check) → Payment → Admin approve

### Admin Account  
- **Email:** admin@gmail.com
- **Password:** admin123
- **Role:** Admin
- **Expected Flow:** Login → Admin Dashboard → Payment Tab

---

## ✅ Test Scenarios

### Scenario 1: Download Without Login ✨
**Steps:**
1. Goto http://localhost:5173
2. Click "Tải xuống" button
3. **Expected:** Redirect to /login

**Verify:**
- Toast message: (if implemented)
- URL changes to `/login`
- LoginForm displays

---

### Scenario 2: Login as User 🔐
**Steps:**
1. Enter email: `user@example.com`
2. Enter password: `password123`
3. Click "Đăng nhập"
4. **Expected:** Redirect to /payment

**Verify:**
- Token saved in sessionStorage
- userEmail stored
- userRole = 'User'
- Redirects to /payment (not /)
- Payment page hiện 4 gói

---

### Scenario 3: Select Free Package 🎁
**Steps:**
1. On /payment page
2. Click "Sử Dụng Miễn Phí" on FREE package
3. **Expected:** Redirect to / (home)

**Verify:**
- sessionStorage paymentInfo = {status: 'completed'}
- Toast: "Đã sử dụng gói FREE!"
- Home page displays

---

### Scenario 4: Select Paid Package 💳
**Steps:**
1. Go back to /payment (or login again)
2. Click "Thanh toán ngay" on BASIC package
3. Dialog opens with QR code
4. Review order info
5. Click "Xác Nhận Thanh Toán"
6. **Expected:** Redirect to /

**Verify:**
- Dialog displays order details
- QR code image renders
- sessionStorage paymentInfo.status = 'pending'
- Toast: "Đã ghi nhận thanh toán"
- After 2 seconds: redirect to /

---

### Scenario 5: Already Paid User 💰
**Steps:**
1. Logout (clear sessionStorage)
2. Add to sessionStorage:
   ```javascript
   sessionStorage.setItem('paymentInfo', JSON.stringify({
     packageName: 'PLUS',
     price: '$35',
     status: 'completed'
   }))
   ```
3. Login with same user
4. **Expected:** Redirect to / (not /payment)

**Verify:**
- No redirect to /payment
- Direct to home page
- Download works immediately

---

### Scenario 6: Admin Login 🔐
**Steps:**
1. Click logout (if any)
2. Goto http://localhost:5173/login
3. Enter email: `admin@gmail.com`
4. Enter password: `admin123`
5. **Expected:** Redirect to /admin

**Verify:**
- URL = `/admin`
- Admin Dashboard displays
- userRole = 'Admin'

---

### Scenario 7: Admin View Payments 📊
**Steps:**
1. On /admin page
2. Click "Payments" tab
3. **Expected:** Payment table displays

**Verify:**
- Tab changes to payment management
- Table header shows columns
- If no payments: "Không có đơn thanh toán nào"
- "Tải lại" button works

---

### Scenario 8: Admin Update Payment Status ✏️
**Precondition:**
- Have pending payment in database (from Scenario 4)
- OR manually insert mock data

**Steps:**
1. On Payments tab
2. Find pending payment row
3. Click "Xác Nhận" button
4. Dialog opens
5. Select status: "Đã thanh toán"
6. (Optional) Add ghi chú
7. Click "Cập Nhật"
8. **Expected:** Payment status updated

**Verify:**
- Dialog closes
- Table refreshes
- Payment status changes to "Đã thanh toán" (green chip)
- "Xác Nhận" button disabled
- Toast: "Cập nhật trạng thái thành công!"

---

## 🔍 Browser DevTools Inspection

### Check Session Storage
```javascript
// Open Console (F12)
console.log(sessionStorage.getItem('paymentInfo'))
console.log(sessionStorage.getItem('token'))
console.log(sessionStorage.getItem('userRole'))
```

### Expected Output for Paid User:
```javascript
{
  "packageName": "BASIC",
  "price": "$28",
  "status": "pending",
  "orderId": "ORDER_1234567890",
  "qrCode": "data:image/svg+xml,...",
  "createdAt": "2024-11-16T10:00:00Z"
}
```

### Check Network Requests
1. Open DevTools → Network tab
2. Do login/payment actions
3. Check API calls:
   - POST /api/Auth/login
   - POST /api/Payment/create
   - GET /api/Payment/all (admin)
   - PUT /api/Payment/status/{orderId} (admin)

---

## 🧩 Component Integration Tests

### PaymentPage Component
```typescript
// Test imports work
import PaymentPage from './src/app/pages/payment/PaymentPage'

// Should render without errors
expect(<PaymentPage />).toBeDefined()

// Should display 4 package cards
expect(screen.getByText('FREE')).toBeInTheDocument()
expect(screen.getByText('BASIC')).toBeInTheDocument()
expect(screen.getByText('PLUS')).toBeInTheDocument()
expect(screen.getByText('PREMIUM')).toBeInTheDocument()
```

### Admin Payment Management
```typescript
// Test component renders
expect(<AdminPaymentManagement />).toBeDefined()

// Should display payment table
expect(screen.getByText('Quản Lý Thanh Toán')).toBeInTheDocument()
```

---

## ⚠️ Common Issues & Fixes

### Issue 1: Login redirects to / instead of /payment
**Cause:** No payment info in sessionStorage
**Fix:** 
```javascript
// Manually set before login
sessionStorage.setItem('paymentInfo', JSON.stringify({
  packageName: 'PENDING',
  price: '$0',
  status: 'pending'
}))
```

### Issue 2: QR Code doesn't show
**Cause:** Backend /api/Payment/generate-qr not implemented
**Fix:** Frontend has fallback to generate placeholder QR code
**Note:** Will display SVG placeholder until backend implements

### Issue 3: Email not sent
**Cause:** Backend /api/Email/* endpoints not implemented
**Fix:** Check backend logs and implement endpoints
**Frontend:** Toast shows success even if backend fails (currently)

### Issue 4: Cannot update payment status
**Cause:** No authorization check
**Fix:** Only admin users can access update endpoint (TBD on backend)

### Issue 5: Payment info cleared on page refresh
**Expected:** Data persists (saved in sessionStorage)
**Verify:** Refresh page and check sessionStorage

---

## 📋 Test Checklist

### Frontend Flow ✅
- [ ] Download button bắt login
- [ ] Login redirects to /payment
- [ ] Free package works without dialog
- [ ] Paid package shows dialog with QR
- [ ] Payment info saved in sessionStorage
- [ ] Already paid user skips /payment
- [ ] Admin login redirects to /admin
- [ ] Payment tab visible for admin
- [ ] Admin can see payment list
- [ ] Admin can update status
- [ ] Status updates are reflected in UI

### UI Components ✅
- [ ] PaymentPage renders correctly
- [ ] Package cards display properly
- [ ] QR code dialog shows
- [ ] Admin payment table displays
- [ ] Update status dialog works
- [ ] Toast notifications appear
- [ ] Responsive design (mobile/tablet/desktop)

### Data Flow ✅
- [ ] Session storage updated after login
- [ ] Session storage updated after payment
- [ ] Payment info persists on refresh
- [ ] Status changes reflected immediately
- [ ] No errors in console

---

## 🐛 Debug Mode

### Enable Logging
```javascript
// Add to PaymentService.ts
console.log('Creating payment:', { packageId, packageName, amount })
console.log('Payment response:', response)

// Add to AdminPaymentManagement.tsx
console.log('Payments loaded:', payments)
console.log('Updating status:', { orderId, newStatus })
```

### Mock API Responses
```javascript
// In PaymentService, override for testing:
static async createPayment(...) {
  return {
    success: true,
    data: {
      orderId: 'ORDER_TEST_' + Date.now(),
      qrCode: 'data:image/svg+xml,...'
    }
  }
}
```

---

## 📊 Performance Testing

### Bundle Size
```bash
npm run build
# Check dist folder size
```

### Network Performance
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Test payment flow
4. Verify UX is still smooth

### Local Storage Size
```javascript
console.log(new Blob([JSON.stringify(sessionStorage)]).size, 'bytes')
```

---

## ✨ Final Verification

Before deployment:

1. ✅ All imports resolve without errors
2. ✅ No TypeScript compilation errors
3. ✅ All test scenarios pass
4. ✅ Console has no errors/warnings
5. ✅ Session storage persists data
6. ✅ Download requires login
7. ✅ Payment flow complete
8. ✅ Admin can verify payments
9. ✅ Responsive on mobile
10. ✅ Toast notifications work

---

## 📞 Troubleshooting

### If tests fail:
1. Clear sessionStorage: `sessionStorage.clear()`
2. Refresh page: `Ctrl+Shift+R` (hard refresh)
3. Check Console: `F12 → Console`
4. Check Network: `F12 → Network → XHR`
5. Verify backend is running
6. Check API endpoints in `API_ENDPOINTS.md`

### If payment doesn't save:
1. Check if sessionStorage is enabled
2. Verify PaymentProvider wraps MainRoute
3. Check browser privacy settings

---

**Last Updated:** 2024-11-16  
**Version:** 1.0  
**Status:** ✅ Ready for testing
