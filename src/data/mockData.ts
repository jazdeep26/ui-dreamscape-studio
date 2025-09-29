import { Client, Staff, Session, Payment, DashboardStats } from '@/types';

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+91 98765 43210',
    balance: 200.00,
    createdAt: '2024-01-15',
    totalSessions: 12
  },
  {
    id: 'c2',
    name: 'Emily Johnson',
    email: 'emily.j@email.com',
    phone: '+91 87654 32109',
    balance: 150.00,
    createdAt: '2024-02-20',
    totalSessions: 8
  },
  {
    id: 'c3',
    name: 'Michael Davis',
    email: 'michael.davis@email.com',
    phone: '+91 76543 21098',
    balance: 0.00,
    createdAt: '2024-03-10',
    totalSessions: 15
  },
  {
    id: 'c4',
    name: 'Sarah Wilson',
    email: 'sarah.w@email.com',
    phone: '+91 65432 10987',
    balance: 320.00,
    createdAt: '2024-01-08',
    totalSessions: 20
  },
  {
    id: 'c5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+91 54321 09876',
    balance: 80.00,
    createdAt: '2024-04-05',
    totalSessions: 6
  }
];

export const mockStaff: Staff[] = [
  {
    id: 's1',
    name: 'Dr. Brown',
    email: 'dr.brown@clinic.com',
    phone: '+91 99888 77766',
    compensationRate: 70,
    compensationType: 'percentage',
    totalEarnings: 12500,
    sessionsCount: 45
  },
  {
    id: 's2',
    name: 'Dr. Smith',
    email: 'dr.smith@clinic.com',
    phone: '+91 88777 66655',
    compensationRate: 500,
    compensationType: 'fixed',
    totalEarnings: 8500,
    sessionsCount: 32
  },
  {
    id: 's3',
    name: 'Therapist Angela',
    email: 'angela@clinic.com',
    phone: '+91 77666 55544',
    compensationRate: 60,
    compensationType: 'percentage',
    totalEarnings: 6800,
    sessionsCount: 28
  }
];

export const mockSessions: Session[] = [
  {
    id: 'sess1',
    clientId: 'c1',
    staffId: 's1',
    date: '2024-09-29',
    startTime: '09:00',
    duration: 60,
    type: 'offline',
    fee: 100,
    status: 'scheduled',
    notes: 'Regular session'
  },
  {
    id: 'sess2',
    clientId: 'c2',
    staffId: 's2',
    date: '2024-09-29',
    startTime: '10:30',
    duration: 40,
    type: 'online',
    fee: 80,
    status: 'completed',
    markedBy: 's2',
    notes: 'Video consultation completed'
  },
  {
    id: 'sess3',
    clientId: 'c4',
    staffId: 's1',
    date: '2024-09-29',
    startTime: '14:00',
    duration: 60,
    type: 'offline',
    fee: 120,
    status: 'pending',
    notes: 'Follow-up session'
  },
  {
    id: 'sess4',
    clientId: 'c1',
    staffId: 's1',
    date: '2024-09-30',
    startTime: '11:00',
    duration: 60,
    type: 'online',
    fee: 100,
    status: 'scheduled',
    notes: 'Online therapy session'
  },
  {
    id: 'sess5',
    clientId: 'c3',
    staffId: 's3',
    date: '2024-09-30',
    startTime: '15:30',
    duration: 40,
    type: 'offline',
    fee: 90,
    status: 'scheduled',
    notes: 'Regular check-up'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    clientId: 'c3',
    amount: 300,
    date: '2024-09-25',
    method: 'upi',
    sessionIds: ['sess_old1', 'sess_old2', 'sess_old3'],
    notes: 'Payment for 3 sessions'
  },
  {
    id: 'pay2',
    clientId: 'c2',
    amount: 160,
    date: '2024-09-20',
    method: 'cash',
    sessionIds: ['sess_old4', 'sess_old5'],
    notes: 'Cash payment for 2 sessions'
  }
];

export const mockDashboardStats: DashboardStats = {
  todaySessions: 3,
  pendingSessions: 1,
  totalRevenue: 15480,
  outstandingBalance: 750
};

// Helper functions
export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getStaffById = (id: string): Staff | undefined => {
  return mockStaff.find(staff => staff.id === id);
};

export const getSessionsByDate = (date: string): Session[] => {
  return mockSessions.filter(session => session.date === date);
};

export const getTodaySessions = (): Session[] => {
  const today = new Date().toISOString().split('T')[0];
  return getSessionsByDate(today);
};