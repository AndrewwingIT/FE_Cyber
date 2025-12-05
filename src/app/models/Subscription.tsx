export interface Payment {
  paymentId: number;
  amount: number;
  paymentMethod: string;
  status: string;
  paymentDate: string;
  transactionId: string;
}

export interface Subscription {
  subscriptionId: number;
  planId: number;
  tenantId: number | null;
  userId: string;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  payment: Payment | null;
}

export interface CreateSubscriptionRequest {
  planId: number;
  userId?: string;
}

export interface UpdateSubscriptionRequest {
  status: string; // Backend chỉ cho phép update status
}
