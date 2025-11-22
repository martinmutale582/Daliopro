
import React, { useState } from 'react';
import { Investment, InvestmentType, RiskLevel } from '../types';
import { MOCK_INVESTMENTS } from '../constants';
import { Filter, Search, Info, ShieldCheck, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface MarketplaceProps {
  onInvest: (investment: Investment, amount: number) => void;
  userBalance: number;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ onInvest, userBalance }) => {
  const [filterType, setFilterType] = useState<InvestmentType | 'All'>('All');
  const [selectedInv, setSelectedInv] = useState<Investment | null>(null);
  const [amount, setAmount] = useState<string>('');

  const filteredInvestments = MOCK_INVESTMENTS.filter(inv => 
    filterType === 'All' ? true : inv.type === filterType
  );

  const handleInvestClick = (inv: Investment) => {
    setSelectedInv(inv);
    setAmount(inv.minInvestment.toString());
  };

  const confirmInvestment = () => {
    if (!selectedInv) return;
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount)) {
      alert("Please enter a valid amount.");
      return;
    }
    
    // Strict Tier Validation
    if (numAmount < selectedInv.minInvestment) {
      alert(`For the ${selectedInv.title}, the minimum investment is K${selectedInv.minInvestment.toLocaleString()}`);
      return;
    }

    if (selectedInv.maxInvestment && numAmount > selectedInv.maxInvestment) {
      alert(`For the ${selectedInv.title}, the maximum investment is K${selectedInv.maxInvestment.toLocaleString()}. Please choose a higher tier plan.`);
      return;
    }

    if (numAmount > 100000000) {
      alert(`DalioPro global investment limit is K100,000,000 per transaction.`);
      return;
    }

    if (numAmount > userBalance) {
      alert("Insufficient wallet balance. Please deposit funds first.");
      return;
    }

    onInvest(selectedInv, numAmount);
    setSelectedInv(null);
    setAmount('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">DalioPro Marketplace</h2>
          <p className="text-gray-500">Select a plan. Higher investment tiers offer increased daily returns.</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {['All', ...Object.values(InvestmentType)].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterType === type 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInvestments.map((inv) => (
          <div key={inv.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
              <img src={inv.imageUrl} alt={inv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide flex items-center gap-1">
                 <ShieldCheck size={12} className="text-zambia-green" />
                 DalioPro Verified
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{inv.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{inv.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><TrendingUp size={10}/> Daily Return</p>
                  <p className="text-sm font-bold text-zambia-green">{inv.expectedReturn}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={10}/> Duration</p>
                  <p className="text-sm font-bold text-gray-800">{inv.duration}</p>
                </div>
                <div className="col-span-2 border-t border-gray-200 pt-2 mt-1">
                  <p className="text-xs text-gray-400">Investment Range</p>
                  <p className="text-sm font-bold text-gray-800">
                    K{inv.minInvestment.toLocaleString()} - K{inv.maxInvestment ? inv.maxInvestment.toLocaleString() : '100M'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => handleInvestClick(inv)}
                className="w-full py-3 bg-gray-900 hover:bg-zambia-green text-white rounded-xl font-medium transition-colors"
              >
                Invest Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Investment Modal */}
      {selectedInv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="h-32 bg-gray-900 relative">
               <img src={selectedInv.imageUrl} className="w-full h-full object-cover opacity-50" />
               <div className="absolute bottom-0 left-0 p-6">
                 <h3 className="text-xl font-bold text-white">{selectedInv.title}</h3>
                 <p className="text-white/80 text-sm">Target: {selectedInv.expectedReturn} / {selectedInv.duration}</p>
               </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <Info size={18} className="text-blue-500 flex-shrink-0" />
                <p>Wallet Balance: <span className="font-bold text-gray-900">K{userBalance.toLocaleString()}</span></p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Invest (ZMW)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-400 font-bold">K</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 pl-8 border border-gray-300 rounded-xl focus:ring-2 focus:ring-zambia-green focus:border-transparent outline-none text-lg font-bold"
                    placeholder={`${selectedInv.minInvestment} - ${selectedInv.maxInvestment}`}
                  />
                </div>
                
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Minimum Required:</span>
                        <span className="font-bold text-gray-800">K{selectedInv.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Maximum Allowed:</span>
                        <span className="font-bold text-gray-800">K{selectedInv.maxInvestment?.toLocaleString()}</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => setSelectedInv(null)}
                  className="py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmInvestment}
                  className="py-3 rounded-xl font-bold bg-zambia-green text-white shadow-lg shadow-green-200 hover:bg-green-700 hover:shadow-xl transition-all"
                >
                  Confirm & Invest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
