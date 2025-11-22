import React from 'react';
import { Transaction } from '../types';
import { CheckCircle, XCircle, Clock, Users, Banknote, ShieldAlert } from 'lucide-react';

interface AdminDashboardProps {
  transactions: Transaction[];
  onProcessTransaction: (id: string, action: 'approve' | 'reject') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ transactions, onProcessTransaction }) => {
  const pendingTransactions = transactions.filter(t => t.status === 'PENDING');
  const totalDeposited = transactions.filter(t => t.type === 'DEPOSIT' && t.status === 'COMPLETED').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingValue = pendingTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-zambia-orange" /> 
            Admin Console
          </h2>
          <p className="text-gray-500">Manage requests and oversee platform liquidity.</p>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase">Pending Requests</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{pendingTransactions.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase">Total Verified Deposits</p>
          <h3 className="text-3xl font-bold text-zambia-green mt-1">K{totalDeposited.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <p className="text-xs font-medium text-gray-500 uppercase">Pending Liquidity Needed</p>
           <h3 className="text-3xl font-bold text-gray-900 mt-1">K{pendingValue.toLocaleString()}</h3>
        </div>
      </div>

      {/* Transaction Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Pending Approvals</h3>
        </div>
        
        {pendingTransactions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Clock size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No pending transactions to review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Details / Ref</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50">
                    <td className="p-4 text-gray-600">{tx.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        tx.type === 'DEPOSIT' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-900">K{tx.amount.toLocaleString()}</td>
                    <td className="p-4 text-gray-600">
                      {tx.type === 'DEPOSIT' ? (
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">{tx.reference}</span>
                      ) : (
                        <span>Withdrawal Request</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onProcessTransaction(tx.id, 'reject')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle size={20} />
                        </button>
                        <button 
                          onClick={() => onProcessTransaction(tx.id, 'approve')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};