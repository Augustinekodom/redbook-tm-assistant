import React from 'react';
import { Sparkles, ShieldCheck, BookOpen } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: Sparkles },
    { id: 'calculators', label: 'Calculators', icon: ShieldCheck },
    { id: 'browse', label: 'Code Browser', icon: BookOpen }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-zinc-800 bg-black/95 backdrop-blur-xl px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-1 max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all min-h-[48px] ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-400' : ''}`} />
              <span className="text-[10px] tracking-tight mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
