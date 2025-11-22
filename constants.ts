
import { Investment, InvestmentType, RiskLevel } from './types';

export const MOCK_INVESTMENTS: Investment[] = [
  {
    id: 'dalio_starter',
    title: 'Dalio Starter (Daily)',
    description: 'Beginner tier for new investors. Secure entry into the market with guaranteed daily returns.',
    type: InvestmentType.AGRICULTURE,
    minInvestment: 280,
    maxInvestment: 500,
    expectedReturn: '5% Daily',
    risk: RiskLevel.LOW,
    duration: '3 Months',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    available: true,
  },
  {
    id: 'dalio_bronze',
    title: 'Dalio Bronze (Daily)',
    description: 'Growth tier backed by short-term government bonds and trade finance.',
    type: InvestmentType.BONDS,
    minInvestment: 501,
    maxInvestment: 2500,
    expectedReturn: '6.5% Daily',
    risk: RiskLevel.LOW,
    duration: '4 Months',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    available: true,
  },
  {
    id: 'dalio_silver',
    title: 'Dalio Silver (Daily)',
    description: 'Commercial tier allocating funds to high-yield mining supply chains.',
    type: InvestmentType.MINING,
    minInvestment: 2501,
    maxInvestment: 10000,
    expectedReturn: '8% Daily',
    risk: RiskLevel.LOW,
    duration: '6 Months',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    available: true,
  },
  {
    id: 'dalio_gold',
    title: 'Dalio Gold (Daily)',
    description: 'Enterprise tier optimized for maximum medium-term gains in the technology sector.',
    type: InvestmentType.TECH,
    minInvestment: 10001,
    maxInvestment: 100000,
    expectedReturn: '10% Daily',
    risk: RiskLevel.LOW,
    duration: '9 Months',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    available: true,
  },
  {
    id: 'dalio_platinum',
    title: 'Dalio Platinum (Daily)',
    description: 'The ultimate institutional tier. Direct asset backing with priority liquidation preference.',
    type: InvestmentType.REAL_ESTATE,
    minInvestment: 100001,
    maxInvestment: 100000000, // 100 Million Limit
    expectedReturn: '15% Daily',
    risk: RiskLevel.LOW,
    duration: '1 Year',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    available: true,
  }
];

export const INITIAL_WALLET_BALANCE = 0.00; // ZMW
export const ADMIN_PHONE = "0978310594";
export const ADMIN_NAME = "MARTIN MUTALE";
