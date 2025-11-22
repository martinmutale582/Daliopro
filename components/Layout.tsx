import React, { useState } from 'react';
import { View } from '../types';
import { 
  LayoutDashboard, 
  TrendingUp, 
  PieChart, 
  Bot, 
  Wallet, 
  Menu, 
  X,
  Bird,
  UserCircle,
  ShieldAlert,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onChangeView: (view: View) => void;
  isAdmin: boolean;
  onToggleRole: () => void;
}

const NavItem = ({ 
  view, 
  currentView, 
  icon: Icon, 
  label, 
  onClick 
}: { 
  view: View; 
  currentView: View; 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void;
}) => {
  const isActive = view === currentView;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
        isActive 
          ? 'bg-zambia-green text-white shadow-lg shadow-green-200' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, isAdmin, onToggleRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view: View) => {
    onChangeView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 bg-zambia-orange rounded-full flex items-center justify-center text-white shadow-sm">
            <Bird size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dalio<span className="text-zambia-orange">Pro</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {isAdmin ? 'Admin Console' : 'Investor Portal'}
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {isAdmin ? (
            // Admin Navigation
            <>
              <NavItem view={View.ADMIN_DASHBOARD} currentView={currentView} icon={ShieldAlert} label="Admin Dashboard" onClick={() => handleNav(View.ADMIN_DASHBOARD)} />
            </>
          ) : (
            // User Navigation
            <>
              <NavItem view={View.DASHBOARD} currentView={currentView} icon={LayoutDashboard} label="Home" onClick={() => handleNav(View.DASHBOARD)} />
              <NavItem view={View.MARKETPLACE} currentView={currentView} icon={TrendingUp} label="Investment" onClick={() => handleNav(View.MARKETPLACE)} />
              <NavItem view={View.PORTFOLIO} currentView={currentView} icon={PieChart} label="My Profit & Portfolio" onClick={() => handleNav(View.PORTFOLIO)} />
              <NavItem view={View.WALLET} currentView={currentView} icon={Wallet} label="Wallet" onClick={() => handleNav(View.WALLET)} />
              <NavItem view={View.PROFILE} currentView={currentView} icon={UserCircle} label="Profile" onClick={() => handleNav(View.PROFILE)} />
              <div className="pt-4 mt-4 border-t border-gray-100">
                <NavItem view={View.ADVISOR} currentView={currentView} icon={Bot} label="AI Advisor" onClick={() => handleNav(View.ADVISOR)} />
              </div>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={onToggleRole}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 w-full px-2 py-2 rounded hover:bg-gray-50 transition-colors"
          >
            <LogOut size={14} />
            {isAdmin ? 'Switch to Investor View' : 'Switch to Admin View (Demo)'}
          </button>
          <div className="mt-2 text-center text-[10px] text-gray-300">
            &copy; 2025 DalioPro Ltd.
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zambia-orange rounded-full flex items-center justify-center text-white">
            <Bird size={18} />
          </div>
          <div>
            <span className="font-bold text-lg text-gray-900">Dalio<span className="text-zambia-orange">Pro</span></span>
          </div>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-20 pt-20 px-4 space-y-2">
          {isAdmin ? (
             <NavItem view={View.ADMIN_DASHBOARD} currentView={currentView} icon={ShieldAlert} label="Admin Dashboard" onClick={() => handleNav(View.ADMIN_DASHBOARD)} />
          ) : (
            <>
              <NavItem view={View.DASHBOARD} currentView={currentView} icon={LayoutDashboard} label="Home" onClick={() => handleNav(View.DASHBOARD)} />
              <NavItem view={View.MARKETPLACE} currentView={currentView} icon={TrendingUp} label="Investment" onClick={() => handleNav(View.MARKETPLACE)} />
              <NavItem view={View.PORTFOLIO} currentView={currentView} icon={PieChart} label="My Profit & Portfolio" onClick={() => handleNav(View.PORTFOLIO)} />
              <NavItem view={View.WALLET} currentView={currentView} icon={Wallet} label="Wallet" onClick={() => handleNav(View.WALLET)} />
              <NavItem view={View.PROFILE} currentView={currentView} icon={UserCircle} label="Profile" onClick={() => handleNav(View.PROFILE)} />
              <NavItem view={View.ADVISOR} currentView={currentView} icon={Bot} label="AI Advisor" onClick={() => handleNav(View.ADVISOR)} />
            </>
          )}
           <button 
            onClick={() => {
              onToggleRole();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm text-gray-500 border-t border-gray-100 mt-4"
          >
            {isAdmin ? 'Switch to Investor View' : 'Switch to Admin View (Demo)'}
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 mt-16 md:mt-0 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};