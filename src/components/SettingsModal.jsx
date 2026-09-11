import React, { useState, useEffect } from 'react';
import { X, Key, Check, Database, Shield, Zap } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full rounded-2xl border border-zinc-800 p-6 space-y-6 bg-zinc-950">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-heading">Settings & Free API Key</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-300 space-y-1">
          <div className="font-bold flex items-center space-x-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>100% Free Operation</span>
          </div>
          <p>
            The assistant works 100% offline out-of-the-box using the local Red Book rules engine. Adding your free Google Gemini API Key enables AI natural language synthesis!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
              Google Gemini API Key (Free Tier):
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Get your free key from <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">Google AI Studio</a>. Key is saved locally in browser storage.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-300 hover:bg-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-black hover:bg-amber-400 transition-colors flex items-center space-x-1"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </form>

        {/* System Architecture Badges */}
        <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
          <div className="flex items-center space-x-1">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>Vector Store: PostgreSQL / `pgvector`</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compliance: NRSWA 1991</span>
          </div>
        </div>

      </div>
    </div>
  );
}
