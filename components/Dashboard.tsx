import React from 'react';
import { UserInvestment } from '../types';
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Sprout, Pickaxe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  balance: number;
  investments: UserInvestment[];
  portfolioValue: number;
}

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 4200 },
  { name: 'Apr', value: 5100 },
  { name: 'May', value: 5800 },
  { name: 'Jun', value: 6500 },
];

export const Dashboard: React.FC<DashboardProps> = ({ balance, investments, portfolioValue }) => {
  const totalWealth = balance + portfolioValue;
  const profit = portfolioValue - investments.reduce((acc, inv) => acc + inv.amountInvested, 0);
  const profitPercent = investments.length > 0 ? (profit / investments.reduce((acc, inv) => acc + inv.amountInvested, 0)) * 100 : 0;

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Muli Bwanji, Investor</h2>
        <p className="text-gray-500">Here is your financial overview for today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Wealth Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Wealth (ZMW)</p>
          <h3 className="text-3xl font-bold text-gray-900">
            K{totalWealth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center mt-2 gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={12} /> +12.5%
            </span>
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Portfolio Value Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Active Investments</p>
          <h3 className="text-3xl font-bold text-gray-900">
            K{portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center mt-2 gap-2">
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${profit >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {profit >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {profitPercent.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-400">Net Profit</span>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-zambia-green to-green-700 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm font-medium text-green-100 mb-1">Wallet Balance</p>
          <h3 className="text-3xl font-bold text-white">
            K{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <button className="mt-4 text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-2 rounded-lg backdrop-blur-sm text-white font-medium">
            Top Up Wallet
          </button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Portfolio Performance</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-2 outline-none">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#198a00" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#198a00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} tickFormatter={(value) => `K${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`K${value}`, 'Value']}
                />
                <Area type="monotone" dataKey="value" stroke="#198a00" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Insight */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h3 className="font-bold text-gray-800">Market Highlights</h3>
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
            <div className="p-2 bg-orange-100 text-zambia-orange rounded-lg">
              <Pickaxe size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Copper Prices Up</h4>
              <p className="text-xs text-gray-600 mt-1">Global copper demand has surged, positively impacting mining stocks on LuSE.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
            <div className="p-2 bg-green-100 text-zambia-green rounded-lg">
              <Sprout size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Harvest Season</h4>
              <p className="text-xs text-gray-600 mt-1">Maize & Soy yields in Central Province exceed expectations.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Stable Inflation</h4>
              <p className="text-xs text-gray-600 mt-1">Bank of Zambia reports inflation stabilizing at single digits for the quarter.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
