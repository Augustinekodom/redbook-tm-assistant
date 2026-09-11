import React from 'react';
import { ShieldCheck, HardHat, Settings, BookOpen, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 bg-slate-950/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Logo & Statutory Title */}
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('chat')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <HardHat className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-heading leading-tight">
                RedBook <span className="text-amber-400">AI</span>
              </h1>
              <span className="px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                NRSWA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Safety at Street Works & Road Works Field Assistant
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs (Hidden on Mobile, replaced by MobileBottomNav) */}
        <nav className="hidden md:flex items-center space-x-1.5">
          <button
            onClick={() => setActiveTab('chat')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>AI Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('calculators')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'calculators'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>TM Calculators</span>
          </button>

          <button
            onClick={() => setActiveTab('browse')}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'browse'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Code Browser</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center">
          <button
            onClick={onOpenSettings}
            title="Settings & API Key"
            className="w-10 h-10 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors border border-slate-800"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
}
