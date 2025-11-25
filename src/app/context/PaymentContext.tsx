import React, { createContext, useState, useCallback } from 'react';

export interface PaymentInfo {
  userId?: number;
  packageName: string;
  price: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  orderId?: string;
  createdAt?: string;
  qrCode?: string;
}

interface PaymentContextType {
  paymentInfo: PaymentInfo | null;
  setPaymentInfo: (info: PaymentInfo) => void;
  clearPaymentInfo: () => void;
  hasCompletedPayment: boolean;
  checkPaymentStatus: () => boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(() => {
    // Load from sessionStorage
    const stored = sessionStorage.getItem('paymentInfo');
    return stored ? JSON.parse(stored) : null;
  });

  const handleSetPaymentInfo = useCallback((info: PaymentInfo) => {
    setPaymentInfo(info);
    sessionStorage.setItem('paymentInfo', JSON.stringify(info));
  }, []);

  const handleClearPaymentInfo = useCallback(() => {
    setPaymentInfo(null);
    sessionStorage.removeItem('paymentInfo');
  }, []);

  const checkPaymentStatus = useCallback((): boolean => {
    const stored = sessionStorage.getItem('paymentInfo');
    if (!stored) return false;
    try {
      const info = JSON.parse(stored);
      return info.status === 'completed';
    } catch {
      return false;
    }
  }, []);

  const hasCompletedPayment = paymentInfo?.status === 'completed';

  return (
    <PaymentContext.Provider
      value={{
        paymentInfo,
        setPaymentInfo: handleSetPaymentInfo,
        clearPaymentInfo: handleClearPaymentInfo,
        hasCompletedPayment,
        checkPaymentStatus,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
