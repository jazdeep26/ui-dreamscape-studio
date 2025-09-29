export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  createdAt: string;
  totalSessions: number;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  compensationRate: number; // percentage or fixed amount
  compensationType: 'percentage' | 'fixed';
  totalEarnings: number;
  sessionsCount: number;
}

export interface Session {
  id: string;
  clientId: string;
  staffId: string;
  date: string;
  startTime: string;
  duration: number; // in minutes
  type: 'online' | 'offline';
  fee: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  markedBy?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'upi' | 'bank_transfer';
  sessionIds?: string[]; // sessions this payment covers
  notes?: string;
}

export interface DashboardStats {
  todaySessions: number;
  pendingSessions: number;
  totalRevenue: number;
  outstandingBalance: number;
}