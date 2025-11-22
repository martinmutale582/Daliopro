
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { ADMIN_NAME, ADMIN_PHONE } from '../constants';
import { ArrowDownLeft, ArrowUpRight, Clock, AlertCircle, UploadCloud, History, ShieldCheck } from 'lucide-react';

interface WalletProps {
  balance: number;
  transactions: Transaction[];
  onDeposit: (amount: number, reference: string) => void;
  onWithdraw: (amount: number) => void;
}

export const Wallet: React.FC<WalletProps> = ({ balance, transactions, onDeposit, onWithdraw }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsLoading(true);

    // Simulate network delay for professional feel
    setTimeout(() => {
      if (activeTab === 'deposit') {
        if (numAmount < 280) {
          alert("Minimum deposit amount is K280.");
          setIsLoading(false);
          return;
        }
        if (numAmount > 100000000) {
            alert("Maximum deposit limit is K100,000,000.");
            setIsLoading(false);
            return;
        }
        if (!reference) {
           alert("Please provide a reference number or proof of payment text.");
           setIsLoading(false);
           return;
        }
        onDeposit(numAmount, reference);
        alert("Deposit request submitted! DalioPro admins will verify shortly.");
      } else {
        if (numAmount > balance) {
          alert("Insufficient funds.");
          setIsLoading(false);
          return;
        }
        onWithdraw(numAmount);
        alert("Withdrawal request submitted. Funds will reflect within 12 hours.");
      }
      setAmount('');
      setReference('');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={120} />
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10">
          <div>
            <p className="text-gray-400 text-sm font-medium mb-1">DalioPro Wallet Balance</p>
            <h2 className="text-4xl font-bold tracking-tight">K{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveTab('deposit')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'deposit' ? 'bg-zambia-green text-white shadow-lg shadow-green-900/20' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
              Deposit
            </button>
            <button 
              onClick={() => setActiveTab('withdraw')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'withdraw' ? 'bg-zambia-orange text-white shadow-lg shadow-orange-900/20' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
            {activeTab === 'deposit' ? <ArrowDownLeft className="text-zambia-green" /> : <ArrowUpRight className="text-zambia-orange" />}
            <h3 className="text-lg font-bold text-gray-900">
              {activeTab === 'deposit' ? 'Fund Your Account' : 'Request Withdrawal'}
            </h3>
          </div>

          {activeTab === 'deposit' ? (
             <div className="space-y-6">
               <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                 <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                   <AlertCircle size={16} className="text-zambia-orange"/> Payment Instructions
                 </h4>
                 <p className="text-sm text-gray-600 mb-3">
                   Please send your investment amount to the following official DalioPro agent via Airtel Money or MTN MoMo.
                 </p>
                 <div className="bg-white p-4 rounded-lg border border-orange-200 text-center shadow-sm">
                   <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Send To</p>
                   <p className="text-2xl font-bold text-gray-900 my-1">{ADMIN_PHONE}</p>
                   <p className="text-sm font-medium text-zambia-orange">{ADMIN_NAME}</p>
                 </div>
                 <div className="mt-3 text-xs text-gray-500 text-center border-t border-orange-200 pt-2">
                    Allowed Limit: <span className="font-bold text-gray-900">K280 - K100,000,000</span>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Amount (ZMW)</label>
                 <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-zambia-green focus:border-transparent outline-none text-lg"
                    placeholder="Min K280"
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Reference / Proof</label>
                 <div className="relative">
                    <input 
                        type="text" 
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-zambia-green focus:border-transparent outline-none"
                        placeholder="Enter Tx ID (e.g., PP2405...)"
                    />
                    <UploadCloud size={20} className="absolute left-3 top-3.5 text-gray-400" />
                 </div>
                 <p className="text-xs text-gray-500 mt-1">Enter the transaction ID from your SMS or upload logic here.</p>
               </div>
             </div>
          ) : (
            <div className="space-y-6">
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                 <Clock className="text-blue-600 mt-1" size={20} />
                 <div>
                    <h4 className="text-sm font-bold text-gray-800">Processing Time</h4>
                    <p className="text-sm text-gray-600">
                        All withdrawals are processed within <span className="font-bold text-gray-900">12 hours</span>. 
                        Please ensure your bank/mobile money details in your profile are correct.
                    </p>
                 </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount (ZMW)</label>
                 <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-zambia-green focus:border-transparent outline-none text-lg"
                    placeholder="0.00"
                 />
                 <p className="text-right text-xs text-gray-500 mt-1">Max withdrawable: K{balance.toLocaleString()}</p>
               </div>
            </div>
          )}

          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full mt-8 py-4 rounded-xl font-bold text-white transition-all ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 
                activeTab === 'deposit' ? 'bg-zambia-green hover:bg-green-700 shadow-lg shadow-green-200' : 
                'bg-gray-900 hover:bg-black shadow-lg shadow-gray-300'
            }`}
          >
            {isLoading ? 'Processing...' : activeTab === 'deposit' ? 'Confirm Payment Sent' : 'Request Withdrawal'}
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <History size={20} className="text-gray-400" />
            <h3 className="font-bold text-gray-900">History</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px] scrollbar-thin">
             {transactions.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-10">No transactions yet.</p>
             ) : (
                transactions.slice().reverse().map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                tx.type === 'DEPOSIT' ? 'bg-green-100 text-green-700' : 
                                tx.type === 'WITHDRAWAL' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                            }`}>
                                {tx.type === 'DEPOSIT' && <ArrowDownLeft size={18} />}
                                {tx.type === 'WITHDRAWAL' && <ArrowUpRight size={18} />}
                                {(tx.type === 'INVESTMENT' || tx.type === 'PROFIT') && <Clock size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 capitalize">{tx.type.toLowerCase()}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`text-sm font-bold ${
                                tx.type === 'DEPOSIT' || tx.type === 'PROFIT' ? 'text-green-600' : 'text-gray-900'
                            }`}>
                                {tx.type === 'DEPOSIT' || tx.type === 'PROFIT' ? '+' : '-'}K{tx.amount.toLocaleString()}
                            </p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                tx.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                tx.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                                {tx.status}
                            </span>
                        </div>
                    </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
