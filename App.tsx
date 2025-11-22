import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Marketplace } from './components/Marketplace';
import { Portfolio } from './components/Portfolio';
import { Advisor } from './components/Advisor';
import { Wallet } from './components/Wallet';
import { Profile } from './components/Profile';
import { AdminDashboard } from './components/AdminDashboard';
import { View, UserInvestment, Investment, Transaction } from './types';
import { INITIAL_WALLET_BALANCE } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // State
  const [walletBalance, setWalletBalance] = useState(INITIAL_WALLET_BALANCE);
  const [userInvestments, setUserInvestments] = useState<UserInvestment[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleInvest = (investment: Investment, amount: number) => {
    if (walletBalance < amount) return;

    // Deduct from wallet
    setWalletBalance(prev => prev - amount);

    // Add to portfolio
    const newInvestment: UserInvestment = {
      id: `uinv_${Date.now()}`,
      investmentId: investment.id,
      amountInvested: amount,
      dateInvested: new Date().toLocaleDateString('en-ZM'),
      currentValue: amount // Initially same as invested
    };
    
    // Add Transaction Record
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'INVESTMENT',
      amount: amount,
      date: new Date().toLocaleString('en-ZM'),
      status: 'COMPLETED',
      description: `Investment in ${investment.title}`
    };

    setUserInvestments(prev => [...prev, newInvestment]);
    setTransactions(prev => [...prev, newTx]);
    setCurrentView(View.PORTFOLIO);
  };

  const handleDepositRequest = (amount: number, reference: string) => {
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'DEPOSIT',
      amount: amount,
      date: new Date().toLocaleString('en-ZM'),
      status: 'PENDING',
      reference: reference,
      description: 'Wallet Deposit'
    };
    setTransactions(prev => [...prev, newTx]);
  };

  const handleWithdrawRequest = (amount: number) => {
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'WITHDRAWAL',
      amount: amount,
      date: new Date().toLocaleString('en-ZM'),
      status: 'PENDING',
      description: 'Wallet Withdrawal'
    };
    setTransactions(prev => [...prev, newTx]);
  };

  const handleAdminAction = (id: string, action: 'approve' | 'reject') => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === id) {
        const newStatus = action === 'approve' ? 'COMPLETED' : 'REJECTED';
        
        // If approving a deposit, increase user balance
        if (action === 'approve' && tx.type === 'DEPOSIT') {
          setWalletBalance(b => b + tx.amount);
        }
        // If approving a withdrawal, decrease user balance
        if (action === 'approve' && tx.type === 'WITHDRAWAL') {
          setWalletBalance(b => b - tx.amount);
        }

        return { ...tx, status: newStatus };
      }
      return tx;
    }));
  };

  const portfolioValue = userInvestments.reduce((acc, inv) => acc + inv.currentValue, 0);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard balance={walletBalance} investments={userInvestments} portfolioValue={portfolioValue} />;
      case View.MARKETPLACE:
        return <Marketplace onInvest={handleInvest} userBalance={walletBalance} />;
      case View.PORTFOLIO:
        return <Portfolio investments={userInvestments} />;
      case View.ADVISOR:
        return <Advisor />;
      case View.WALLET:
        return (
          <Wallet 
            balance={walletBalance} 
            transactions={transactions} 
            onDeposit={handleDepositRequest} 
            onWithdraw={handleWithdrawRequest}
          />
        );
      case View.PROFILE:
        return <Profile />;
      case View.ADMIN_DASHBOARD:
        return <AdminDashboard transactions={transactions} onProcessTransaction={handleAdminAction} />;
      default:
        return <Dashboard balance={walletBalance} investments={userInvestments} portfolioValue={portfolioValue} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onChangeView={setCurrentView} 
      isAdmin={isAdmin}
      onToggleRole={() => setIsAdmin(!isAdmin)}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;