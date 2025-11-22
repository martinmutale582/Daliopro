
export enum View {
  DASHBOARD = 'DASHBOARD',
  MARKETPLACE = 'MARKETPLACE',
  PORTFOLIO = 'PORTFOLIO',
  ADVISOR = 'ADVISOR',
  WALLET = 'WALLET',
  PROFILE = 'PROFILE',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export enum InvestmentType {
  AGRICULTURE = 'Agriculture',
  MINING = 'Mining',
  BONDS = 'Government Bonds',
  TECH = 'Technology',
  REAL_ESTATE = 'Real Estate'
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Investment {
  id: string;
  title: string;
  description: string;
  type: InvestmentType;
  minInvestment: number;
  maxInvestment?: number;
  expectedReturn: string; // e.g., "15-20% p.a."
  risk: RiskLevel;
  duration: string;
  imageUrl: string;
  available: boolean;
}

export interface UserInvestment {
  id: string;
  investmentId: string;
  amountInvested: number;
  dateInvested: string;
  currentValue: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'INVESTMENT' | 'PROFIT';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'REJECTED';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  status: TransactionStatus;
  reference?: string; // For deposit proof
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  nrc: string;
  bankName?: string;
  accountNumber?: string;
}
