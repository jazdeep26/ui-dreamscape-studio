import { Client, Staff, Session, Payment, DashboardStats } from '@/types';

export const mockClients: Client[] = [
  {
    id: 'c1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+91 98765 43210',
    balance: 2800.00,
    createdAt: '2024-01-15',
    totalSessions: 12
  },
  {
    id: 'c2',
    name: 'Emily Johnson',
    email: 'emily.j@email.com',
    phone: '+91 87654 32109',
    balance: 1500.00,
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
    balance: 3200.00,
    createdAt: '2024-01-08',
    totalSessions: 20
  },
  {
    id: 'c5',
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+91 54321 09876',
    balance: 800.00,
    createdAt: '2024-04-05',
    totalSessions: 6
  },
  {
    id: 'c6',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    phone: '+91 43210 98765',
    balance: 0.00,
    createdAt: '2024-03-18',
    totalSessions: 10
  },
  {
    id: 'c7',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+91 32109 87654',
    balance: 1200.00,
    createdAt: '2024-05-12',
    totalSessions: 7
  },
  {
    id: 'c8',
    name: 'Jennifer Martinez',
    email: 'jennifer.m@email.com',
    phone: '+91 21098 76543',
    balance: 0.00,
    createdAt: '2024-02-28',
    totalSessions: 14
  },
  {
    id: 'c9',
    name: 'William Garcia',
    email: 'william.g@email.com',
    phone: '+91 10987 65432',
    balance: 2100.00,
    createdAt: '2024-06-03',
    totalSessions: 9
  },
  {
    id: 'c10',
    name: 'Patricia Lee',
    email: 'patricia.l@email.com',
    phone: '+91 09876 54321',
    balance: 950.00,
    createdAt: '2024-04-22',
    totalSessions: 5
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
  // September sessions
  {
    id: 'sess1',
    clientId: 'c1',
    staffId: 's1',
    date: '2024-09-02',
    startTime: '09:00',
    duration: 60,
    type: 'offline',
    fee: 1200,
    status: 'completed',
    notes: 'Regular session'
  },
  {
    id: 'sess2',
    clientId: 'c2',
    staffId: 's2',
    date: '2024-09-03',
    startTime: '10:30',
    duration: 40,
    type: 'online',
    fee: 800,
    status: 'completed',
    notes: 'Video consultation'
  },
  {
    id: 'sess3',
    clientId: 'c3',
    staffId: 's3',
    date: '2024-09-05',
    startTime: '14:00',
    duration: 60,
    type: 'offline',
    fee: 1000,
    status: 'completed',
    notes: 'Follow-up session'
  },
  {
    id: 'sess4',
    clientId: 'c4',
    staffId: 's1',
    date: '2024-09-06',
    startTime: '11:00',
    duration: 60,
    type: 'online',
    fee: 1200,
    status: 'completed',
    notes: 'Online therapy'
  },
  {
    id: 'sess5',
    clientId: 'c5',
    staffId: 's2',
    date: '2024-09-08',
    startTime: '15:30',
    duration: 40,
    type: 'offline',
    fee: 900,
    status: 'completed',
    notes: 'Regular check-up'
  },
  {
    id: 'sess6',
    clientId: 'c6',
    staffId: 's3',
    date: '2024-09-09',
    startTime: '10:00',
    duration: 60,
    type: 'online',
    fee: 1000,
    status: 'completed',
    notes: 'Video session'
  },
  {
    id: 'sess7',
    clientId: 'c7',
    staffId: 's1',
    date: '2024-09-11',
    startTime: '13:00',
    duration: 60,
    type: 'offline',
    fee: 1200,
    status: 'completed',
    notes: 'Initial consultation'
  },
  {
    id: 'sess8',
    clientId: 'c8',
    staffId: 's2',
    date: '2024-09-12',
    startTime: '09:30',
    duration: 40,
    type: 'online',
    fee: 800,
    status: 'completed',
    notes: 'Follow-up'
  },
  {
    id: 'sess9',
    clientId: 'c9',
    staffId: 's3',
    date: '2024-09-14',
    startTime: '16:00',
    duration: 60,
    type: 'offline',
    fee: 1100,
    status: 'completed',
    notes: 'Regular session'
  },
  {
    id: 'sess10',
    clientId: 'c10',
    staffId: 's1',
    date: '2024-09-15',
    startTime: '11:30',
    duration: 60,
    type: 'online',
    fee: 1200,
    status: 'completed',
    notes: 'Online consultation'
  },
  {
    id: 'sess11',
    clientId: 'c1',
    staffId: 's2',
    date: '2024-09-17',
    startTime: '14:30',
    duration: 40,
    type: 'offline',
    fee: 900,
    status: 'completed',
    notes: 'Follow-up session'
  },
  {
    id: 'sess12',
    clientId: 'c2',
    staffId: 's3',
    date: '2024-09-18',
    startTime: '10:00',
    duration: 60,
    type: 'online',
    fee: 1000,
    status: 'completed',
    notes: 'Video therapy'
  },
  {
    id: 'sess13',
    clientId: 'c4',
    staffId: 's1',
    date: '2024-09-20',
    startTime: '15:00',
    duration: 60,
    type: 'offline',
    fee: 1200,
    status: 'completed',
    notes: 'Regular session'
  },
  {
    id: 'sess14',
    clientId: 'c7',
    staffId: 's2',
    date: '2024-09-21',
    startTime: '09:00',
    duration: 40,
    type: 'online',
    fee: 800,
    status: 'completed',
    notes: 'Online session'
  },
  {
    id: 'sess15',
    clientId: 'c9',
    staffId: 's3',
    date: '2024-09-23',
    startTime: '13:30',
    duration: 60,
    type: 'offline',
    fee: 1100,
    status: 'completed',
    notes: 'Follow-up'
  },
  {
    id: 'sess16',
    clientId: 'c3',
    staffId: 's1',
    date: '2024-09-24',
    startTime: '10:30',
    duration: 60,
    type: 'online',
    fee: 1200,
    status: 'completed',
    notes: 'Video consultation'
  },
  {
    id: 'sess17',
    clientId: 'c6',
    staffId: 's2',
    date: '2024-09-25',
    startTime: '16:00',
    duration: 40,
    type: 'offline',
    fee: 900,
    status: 'completed',
    notes: 'Regular check-up'
  },
  {
    id: 'sess18',
    clientId: 'c8',
    staffId: 's3',
    date: '2024-09-26',
    startTime: '11:00',
    duration: 60,
    type: 'online',
    fee: 1000,
    status: 'completed',
    notes: 'Online therapy'
  },
  // Current week sessions
  {
    id: 'sess19',
    clientId: 'c1',
    staffId: 's1',
    date: '2024-09-29',
    startTime: '09:00',
    duration: 60,
    type: 'offline',
    fee: 1200,
    status: 'scheduled',
    notes: 'Regular session'
  },
  {
    id: 'sess20',
    clientId: 'c2',
    staffId: 's2',
    date: '2024-09-29',
    startTime: '10:30',
    duration: 40,
    type: 'online',
    fee: 800,
    status: 'completed',
    markedBy: 's2',
    notes: 'Video consultation completed'
  },
  {
    id: 'sess21',
    clientId: 'c4',
    staffId: 's1',
    date: '2024-09-29',
    startTime: '14:00',
    duration: 60,
    type: 'offline',
    fee: 1200,
    status: 'pending',
    notes: 'Follow-up session'
  },
  {
    id: 'sess22',
    clientId: 'c5',
    staffId: 's3',
    date: '2024-09-30',
    startTime: '11:00',
    duration: 60,
    type: 'online',
    fee: 900,
    status: 'scheduled',
    notes: 'Online therapy session'
  },
  {
    id: 'sess23',
    clientId: 'c7',
    staffId: 's2',
    date: '2024-09-30',
    startTime: '15:30',
    duration: 40,
    type: 'offline',
    fee: 800,
    status: 'scheduled',
    notes: 'Regular check-up'
  }
];

// September payments (25-30 entries)
export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    clientId: 'c3',
    amount: 3000,
    date: '2024-09-05',
    method: 'upi',
    sessionIds: ['sess3'],
    notes: 'Payment for session'
  },
  {
    id: 'pay2',
    clientId: 'c6',
    amount: 2000,
    date: '2024-09-09',
    method: 'cash',
    sessionIds: ['sess6'],
    notes: 'Cash payment'
  },
  {
    id: 'pay3',
    clientId: 'c8',
    amount: 3200,
    date: '2024-09-12',
    method: 'card',
    sessionIds: ['sess8'],
    notes: 'Card payment'
  },
  {
    id: 'pay4',
    clientId: 'c3',
    amount: 2400,
    date: '2024-09-16',
    method: 'upi',
    sessionIds: ['sess16'],
    notes: 'UPI transfer'
  },
  {
    id: 'pay5',
    clientId: 'c6',
    amount: 1800,
    date: '2024-09-17',
    method: 'bank_transfer',
    sessionIds: ['sess17'],
    notes: 'Bank transfer'
  },
  {
    id: 'pay6',
    clientId: 'c8',
    amount: 2000,
    date: '2024-09-18',
    method: 'upi',
    sessionIds: ['sess18'],
    notes: 'Payment received'
  },
  {
    id: 'pay7',
    clientId: 'c3',
    amount: 2400,
    date: '2024-09-24',
    method: 'cash',
    sessionIds: ['sess1'],
    notes: 'Cash payment'
  },
  {
    id: 'pay8',
    clientId: 'c1',
    amount: 2400,
    date: '2024-09-02',
    method: 'upi',
    sessionIds: ['sess1'],
    notes: 'UPI payment'
  },
  {
    id: 'pay9',
    clientId: 'c2',
    amount: 1600,
    date: '2024-09-03',
    method: 'card',
    sessionIds: ['sess2'],
    notes: 'Card payment'
  },
  {
    id: 'pay10',
    clientId: 'c5',
    amount: 1800,
    date: '2024-09-08',
    method: 'cash',
    sessionIds: ['sess5'],
    notes: 'Cash received'
  },
  {
    id: 'pay11',
    clientId: 'c10',
    amount: 2400,
    date: '2024-09-15',
    method: 'upi',
    sessionIds: ['sess10'],
    notes: 'Payment received'
  },
  {
    id: 'pay12',
    clientId: 'c1',
    amount: 1800,
    date: '2024-09-17',
    method: 'bank_transfer',
    sessionIds: ['sess11'],
    notes: 'Bank transfer'
  },
  {
    id: 'pay13',
    clientId: 'c2',
    amount: 2000,
    date: '2024-09-18',
    method: 'upi',
    sessionIds: ['sess12'],
    notes: 'Online payment'
  },
  {
    id: 'pay14',
    clientId: 'c3',
    amount: 3600,
    date: '2024-09-20',
    method: 'card',
    sessionIds: ['sess13'],
    notes: 'Card payment'
  },
  {
    id: 'pay15',
    clientId: 'c6',
    amount: 2700,
    date: '2024-09-25',
    method: 'cash',
    sessionIds: ['sess17'],
    notes: 'Payment for multiple sessions'
  },
  {
    id: 'pay16',
    clientId: 'c8',
    amount: 3000,
    date: '2024-09-26',
    method: 'upi',
    sessionIds: ['sess18'],
    notes: 'UPI transfer'
  },
  {
    id: 'pay17',
    clientId: 'c1',
    amount: 1200,
    date: '2024-09-04',
    method: 'cash',
    sessionIds: [],
    notes: 'Advance payment'
  },
  {
    id: 'pay18',
    clientId: 'c4',
    amount: 2400,
    date: '2024-09-06',
    method: 'upi',
    sessionIds: ['sess4'],
    notes: 'Payment received'
  },
  {
    id: 'pay19',
    clientId: 'c7',
    amount: 2400,
    date: '2024-09-11',
    method: 'card',
    sessionIds: ['sess7'],
    notes: 'Card payment'
  },
  {
    id: 'pay20',
    clientId: 'c9',
    amount: 2200,
    date: '2024-09-14',
    method: 'bank_transfer',
    sessionIds: ['sess9'],
    notes: 'Bank transfer'
  },
  {
    id: 'pay21',
    clientId: 'c7',
    amount: 1600,
    date: '2024-09-21',
    method: 'cash',
    sessionIds: ['sess14'],
    notes: 'Cash payment'
  },
  {
    id: 'pay22',
    clientId: 'c9',
    amount: 2200,
    date: '2024-09-23',
    method: 'upi',
    sessionIds: ['sess15'],
    notes: 'UPI payment'
  },
  {
    id: 'pay23',
    clientId: 'c4',
    amount: 1200,
    date: '2024-09-10',
    method: 'cash',
    sessionIds: [],
    notes: 'Partial payment'
  },
  {
    id: 'pay24',
    clientId: 'c5',
    amount: 900,
    date: '2024-09-13',
    method: 'upi',
    sessionIds: [],
    notes: 'Advance payment'
  },
  {
    id: 'pay25',
    clientId: 'c10',
    amount: 1200,
    date: '2024-09-19',
    method: 'card',
    sessionIds: [],
    notes: 'Partial payment'
  },
  {
    id: 'pay26',
    clientId: 'c1',
    amount: 2400,
    date: '2024-09-22',
    method: 'bank_transfer',
    sessionIds: [],
    notes: 'Payment received'
  },
  {
    id: 'pay27',
    clientId: 'c2',
    amount: 1600,
    date: '2024-09-27',
    method: 'upi',
    sessionIds: [],
    notes: 'Advance for next session'
  },
  {
    id: 'pay28',
    clientId: 'c4',
    amount: 2400,
    date: '2024-09-28',
    method: 'cash',
    sessionIds: [],
    notes: 'Cash payment'
  },
];

export const mockDashboardStats: DashboardStats = {
  todaySessions: 3,
  pendingSessions: 1,
  totalRevenue: 62800,
  outstandingBalance: 12550
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
