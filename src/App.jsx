import React, { useState } from 'react';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import ChatInterface from './components/ChatInterface';
import Calculators from './components/Calculators';
import RedBookBrowser from './components/RedBookBrowser';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen min-h-[100dvh] bg-black text-zinc-100 flex flex-col font-sans">
      
      {/* Top Header (Pitch Black Theme) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0 bg-black">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'calculators' && <Calculators />}
        {activeTab === 'browse' && <RedBookBrowser />}
      </main>

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

    </div>
  );
}
