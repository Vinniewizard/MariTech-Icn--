import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Coins, 
  HelpCircle, 
  History, 
  Moon, 
  Sun, 
  RefreshCw, 
  Laptop, 
  ChevronRight, 
  Sparkles, 
  Wallet,
  Settings,
  Lock,
  User,
  Activity
} from 'lucide-react';
import { Account } from '../types';

interface HeaderProps {
  account: Account;
  onSwitchAccount: (mode: 'demo' | 'real') => void;
  onResetDemo: () => void;
  onOpenCashier: () => void;
  onOpenGuide: () => void;
  theme: 'dark' | 'light';
  themeMode?: 'dark' | 'light' | 'auto';
  onToggleTheme: () => void;
  activeView: 'trade' | 'history' | 'stats';
  onSwitchView: (view: 'trade' | 'history' | 'stats') => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
  onOpenAdmin?: () => void;
  currentUser?: any;
}

export default function Header({
  account,
  onSwitchAccount,
  onResetDemo,
  onOpenCashier,
  onOpenGuide,
  theme,
  themeMode,
  onToggleTheme,
  activeView,
  onSwitchView,
  onOpenSettings,
  onOpenAuth,
  onOpenAdmin,
  currentUser
}: HeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1005);
    return () => clearInterval(timer);
  }, []);

  const formatBalance = (bal: number) => {
    return bal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 flex h-18 w-full items-center justify-between border-b px-4 sm:px-6 transition-all duration-300 backdrop-blur-md shadow-sm gap-2 overflow-x-auto ${
      isDark 
        ? 'border-slate-800 bg-slate-900/85 text-slate-100 shadow-slate-950/20' 
        : 'border-slate-200 bg-white/95 text-slate-800 shadow-slate-100/50'
    }`}>
      {/* Brand & core navigation */}
      <div className="flex items-center space-x-3 md:space-x-6 flex-shrink-0">
        <div 
          className="flex items-center space-x-2.5 cursor-pointer flex-shrink-0 user-none group" 
          onClick={() => onSwitchView('trade')}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isDark 
              ? 'bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-900 shadow-[0_0_15px_rgba(20,184,166,0.35)] group-hover:scale-105' 
              : 'bg-gradient-to-tr from-slate-900 to-slate-800 text-white shadow-md shadow-slate-400/20'
          }`}>
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm font-black tracking-wider uppercase leading-none font-sans ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              MARITECH <span className={isDark ? 'text-teal-400 font-medium' : 'text-indigo-600 font-medium'}>INC.</span>
            </span>
            <span className="text-[8px] font-bold text-slate-400 tracking-widest mt-0.5">FINANCIAL GATEWAY</span>
          </div>
        </div>

        {/* View Selection Tabs */}
        <nav className="hidden md:flex items-center space-x-1 border-l pl-4 md:pl-6 border-slate-700/20">
          {[
            { id: 'trade', label: 'Trader', icon: Coins },
            { id: 'history', label: 'Reports', icon: History }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSwitchView(tab.id as any)}
                className={`flex items-center space-x-2 text-[11px] font-black uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDark 
                      ? 'bg-slate-800/85 text-teal-400 border border-teal-500/25 shadow-[0_2px_10px_rgba(20,184,166,0.06)]' 
                      : 'bg-slate-100 text-slate-900 border border-slate-200 shadow-sm'
                    : isDark 
                      ? 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <IconComponent className={`h-3.5 w-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
          
          <button
            onClick={onOpenGuide}
            className={`flex items-center space-x-2 text-[11px] font-black uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              isDark 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5 text-teal-500" />
            <span>Platform Academy</span>
          </button>
        </nav>
      </div>

      {/* Center - Real-time UTC Standard Watch */}
      <div className={`hidden lg:flex items-center space-x-2 rounded-lg px-3 py-1.5 text-xs font-mono transition-all duration-300 shadow-sm ${
        isDark 
          ? 'bg-slate-950/70 text-slate-300 border border-slate-800' 
          : 'bg-slate-50 text-slate-600 border border-slate-150'
      }`}>
        <span className={`h-1.5 w-1.5 rounded-full animate-pulse flex-shrink-0 ${isDark ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`} />
        <span className="tracking-tight select-none">UTC {time.toISOString().replace('T', ' ').substring(0, 19)}</span>
      </div>

      {/* Right UI: Switcher + Balance + Cashier */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 ml-auto">
        
        {/* SMART ACCOUNT SWITCHER PILL (Direct-to-click toggle) */}
        <div className={`relative flex items-center p-1 rounded-full transition-all duration-300 shadow-inner ${
          isDark 
            ? 'bg-slate-950 border border-slate-850' 
            : 'bg-slate-100 border border-slate-200'
        } select-none font-sans`}>
          {/* Demo account option */}
          <button
            onClick={() => onSwitchAccount('demo')}
            className={`relative px-3.5 py-1.5 text-[10px] sm:text-xs font-black tracking-wider uppercase transition-all duration-300 rounded-full flex items-center space-x-1.5 cursor-pointer ${
              account.mode === 'demo'
                ? isDark
                  ? 'bg-teal-500/10 text-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.12)] border border-teal-500/30 font-extrabold'
                  : 'bg-white text-emerald-600 shadow-sm border border-emerald-200'
                : 'text-slate-400 hover:text-slate-350 border border-transparent font-medium'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-all flex-shrink-0 ${
              account.mode === 'demo' ? 'bg-teal-400 animate-pulse' : 'bg-slate-450'
            }`} />
            <span>Demo</span>

            {/* In-app Reset Funds button */}
            {account.mode === 'demo' && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onResetDemo();
                }}
                className={`ml-1 rounded-full p-0.5 transition-all text-teal-400 hover:bg-teal-900/40 hover:text-white`}
                title="Replenish Virtual Funds ($10,000)"
              >
                <RefreshCw className="h-2.5 w-2.5" />
              </span>
            )}
          </button>

          {/* Real account option */}
          <button
            onClick={() => onSwitchAccount('real')}
            className={`relative px-3.5 py-1.5 text-[10px] sm:text-xs font-black tracking-wider uppercase transition-all duration-300 rounded-full flex items-center space-x-1.5 cursor-pointer ${
              account.mode === 'real'
                ? isDark
                  ? 'bg-amber-500/15 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)] border border-amber-500/30'
                  : 'bg-amber-50 text-amber-750 shadow-sm border border-amber-200'
                : 'text-slate-400 hover:text-slate-350 border border-transparent font-medium'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-all flex-shrink-0 ${
              account.mode === 'real' ? 'bg-amber-500 animate-pulse' : 'bg-slate-450'
            }`} />
            <span>Real</span>
          </button>
        </div>

        {/* Total Balance block - highly visible, clean design */}
        <div className={`hidden sm:flex flex-col justify-center px-3 py-1 border-r border-slate-700/20 text-right`}>
          <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold select-none leading-none mb-1">
            Total Balance
          </div>
          <div className={`text-sm sm:text-base font-mono font-black tracking-tight flex items-center justify-end space-x-1 ${
            account.mode === 'real' 
              ? isDark ? 'text-amber-400' : 'text-amber-600'
              : isDark ? 'text-teal-400' : 'text-slate-900'
          }`}>
            <span className="text-xs font-semibold select-none">$</span>
            <span>{formatBalance(account.balance)}</span>
          </div>
        </div>

        {/* Glowing Cashier Action Button / Login */}
        <button
          onClick={() => {
            if (!currentUser) {
              onOpenAuth();
              return;
            }
            onOpenCashier();
          }}
          className={`relative px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
            currentUser
              ? isDark 
                ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 hover:opacity-90 shadow-teal-500/10' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/15'
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
          }`}
          title={currentUser ? 'Open Cashier' : 'Login required to access Cashier'}
        >
          {currentUser ? (
            <>
              <Wallet className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Cashier</span>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Login / Sign Up</span>
            </>
          )}
        </button>

        {/* theme toggle button container */}
        <div className="flex items-center space-x-1">
          {/* Active theme switcher */}
          <button
            onClick={onToggleTheme}
            className={`rounded-lg p-2 transition-all duration-200 cursor-pointer border flex-shrink-0 ${
              isDark 
                ? 'border-slate-800 bg-slate-950/50 text-slate-450 hover:text-white hover:bg-slate-900' 
                : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={
              themeMode === 'auto'
                ? 'Theme Mode: Auto Device'
                : themeMode === 'dark'
                ? 'Theme: Dark Night'
                : 'Theme: Light'
            }
          >
            {themeMode === 'auto' ? (
              <Laptop className="h-3.5 w-3.5 text-teal-400 animate-pulse" />
            ) : themeMode === 'dark' ? (
              <Moon className="h-3.5 w-3.5 text-indigo-400" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-500" />
            )}
          </button>

          {/* User Settings Icon */}
          <button
            onClick={onOpenSettings}
            className={`rounded-lg p-2 transition-all duration-200 cursor-pointer border flex-shrink-0 ${
              isDark 
                ? 'border-slate-800 bg-slate-950/50 text-slate-450 hover:text-white hover:bg-slate-900' 
                : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Personal Settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </button>

          {/* Admin Indicator Icon if enabled */}
          {currentUser?.email === 'admin@maritech.com' && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="rounded-lg p-2 border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/25 animate-pulse cursor-pointer flex-shrink-0"
              title="MariTech Guard Console"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
