import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  userId: string;
  email: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  hasValidSubscription?: string | boolean; // Hỗ trợ cả string và boolean từ backend
  exp: number;
  iss: string;
  aud: string;
  [key: string]: any; // cho phép các field linh tinh khác
}

export const decodeAndStoreToken = (token: string): void => {
  try {
    const decoded: DecodedToken = jwtDecode(token);

    // Lưu các field cơ bản
    sessionStorage.setItem('userId', decoded.userId || '');
    sessionStorage.setItem('userEmail', decoded.email || '');
    sessionStorage.setItem('tenantId', decoded.tenantId || '');
    sessionStorage.setItem('firstName', decoded.firstName || '');
    sessionStorage.setItem('lastName', decoded.lastName || '');
    sessionStorage.setItem('userName', `${decoded.firstName || ''} ${decoded.lastName || ''}`.trim());

    // QUAN TRỌNG: Xử lý hasValidSubscription linh hoạt (string hoặc boolean)
    const subscriptionValue = decoded.hasValidSubscription;
    const isValid =
      subscriptionValue === true || 
      subscriptionValue === 'true' || 
      subscriptionValue === 'True' || 
      subscriptionValue === 'TRUE';

    sessionStorage.setItem('hasValidSubscription', isValid ? 'true' : 'false');

  } catch (error) {
    console.error('Error decoding token:', error);
    sessionStorage.clear();
    window.location.href = '/login';
  }
};

export const handleLoginSuccess = (token: string): void => {
  sessionStorage.setItem('token', token);
  decodeAndStoreToken(token);
  window.location.href = '/';
};

// Helper tiện lợi để dùng ở bất kỳ đâu trong app
export const hasValidSubscription = (): boolean => {
  return sessionStorage.getItem('hasValidSubscription') === 'true';
};

// (Tùy chọn) Helper để logout sạch sẽ
export const logout = (): void => {
  sessionStorage.clear();
  window.location.href = '/login';
};