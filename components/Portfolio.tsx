import React, { useEffect, useState } from 'react';
import { UserInvestment, Investment } from '../types';
import { MOCK_INVESTMENTS } from '../constants';
import { analyzePortfolio } from '../services/geminiService';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sparkles } from 'lucide-react';

interface PortfolioProps {
  investments: UserInvestment[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ investments }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  // Aggregate data for charts
  const investmentsWithDetails = investments.map(inv => {
    const detail = MOCK_INVESTMENTS.find(m => m.id === inv.investmentId);
    return { ...inv, detail };
  });

  const dataByType = investmentsWithDetails.reduce((acc, curr) => {
    const type = curr.detail?.type || 'Unknown';
    const existing = acc.find(item => item.name === type);
    if (existing) {
      existing.value += curr.amountInvested;
    } else {
      acc.push({ name: type, value: curr.amountInvested });
    }
    return acc;
  }, [] as { name: string, value: number }[]);

  const COLORS = ['#198a00', '#ef7d00', '#000000', '#de2010', '#8884d8'];

  const generateAnalysis = async () => {
    if (investments.length === 0) return;
    setIsLoadingAnalysis(true);
    const portfolioDesc = investmentsWithDetails.map(i => `${i.detail?.title} (${i.detail?.type}): K${i.amountInvested}`).join(', ');
    const result = await analyzePortfolio(portfolioDesc);
    setAnalysis(result);
    setIsLoadingAnalysis(false);
  };

  // Auto-generate analysis on load if not empty
  useEffect(() => {
    if (investments.length > 0 && !analysis) {
      generateAnalysis();
    }
  }, [investments]);

  if (investments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center p-8 bg-white rounded-2xl border border-gray-