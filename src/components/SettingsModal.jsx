import React, { useState, useEffect } from 'react';
import { X, Key, Check, Database, Shield, Zap, Sun, Moon } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, theme, toggleTheme }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const isLight = theme === 'light';

  useEffect(() => {
    const existing = localStorage.getItem('gemini_api_key') || '';
    setApiKey(existing);
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${
      isLight ? 'bg-slate-900/60' : 'bg-black/90'
    }`}>
      <div className={`glass-panel max-w-md w-full rounded-2xl border p-6 space-y-6 ${
        isLight ? 'bg-white border-slate-200 shadow-2xl text-slate-900' : 'bg-zinc-950 border-zinc-800 text-white'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold font-heading">Settings & Preferences</h3>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Toggle Bar inside Settings */}
        <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div className="flex items-center space-x-2">
            {isLight ? <Sun className="w-5 h-5 text-amber-600" /> : <Moon className="w-5 h-5 text-amber-400" />}
            <div>
              <div className="text-xs font-bold">App Color Theme</div>
              <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                {isLight ? 'Sunlight High-Contrast Light Mode' : 'Pitch Black Outdoor Dark Mode'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
          >
            Switch to {isLight ? 'Dark' : 'Light'}
          </button>
        </div>

        {/* Free Operations Info */}
        <div className={`p-3 rounded-xl border text-xs space-y-1 ${
          isLight ? 'bg-amber-500/10 border-amber-500/30 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
        }`}>
          <div className="font-bold flex items-center space-x-1">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>100% Free Operation</span>
          </div>
          <p>
            The assistant works 100% offline out-of-the-box using the local Red Book rules engine. Adding your free Google Gemini API Key enables AI natural language synthesis!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              Google Gemini API Key (Free Tier):
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 font-mono ${
                isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-black border-zinc-800 text-white'
              }`}
            />
            <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              Get your free key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-amber-500 underline font-semibold">Google AI Studio</a>. Key is saved locally in browser storage.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center space-x-1 shadow-md"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </form>

        {/* System Architecture Badges */}
        <div className={`pt-4 border-t grid grid-cols-2 gap-2 text-[11px] ${
          isLight ? 'border-slate-200 text-slate-500' : 'border-zinc-800 text-zinc-400'
        }`}>
          <div className="flex items-center space-x-1">
            <Database className="w-3.5 h-3.5 text-cyan-600" />
            <span>Vector Store: PostgreSQL / `pgvector`</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Compliance: NRSWA 1991</span>
          </div>
        </div>

      </div>
    </div>
  );
}
