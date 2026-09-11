import React, { useState, useEffect, useRef } from 'react';
import { executeRAGQuery } from '../utils/ai_engine';
import StreamingText from './StreamingText';
import { Send, Mic, MicOff, User, BookOpen, Copy, Check, HardHat } from 'lucide-react';

export default function ChatInterface({ theme }) {
  const isLight = theme === 'light';

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "**Definitive Answer: Welcome to the Red Book Traffic Management AI Assistant.**\n---\nI am grounded strictly in the DfT **Safety at Street Works and Road Works – A Code of Practice (NRSWA 1991)**.\n\nAsk me any question on site (e.g. safety zone clearance, lead-in taper, footway width, or traffic control selection) to get instant definitive answers with exact statutory page and section citations!",
      citations: [
        { section: "Red Book Statutory Code", page: "Cover", tableRef: "NRSWA Section 65", title: "Safety at Street Works and Road Works" }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isNew: false
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is supported natively in Chrome, Safari, and Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-GB';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSubmit = async (e, textOverride = null) => {
    if (e) e.preventDefault();
    const query = (textOverride || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const ragResult = await executeRAGQuery(query);
      
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: ragResult.answer,
        citations: ragResult.citations,
        source: ragResult.source,
        isOutofScope: ragResult.isOutofScope,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isNew: true
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "**Definitive Answer: Error retrieving guidance.**\n---\nAn error occurred while fetching Red Book guidance. Please try again.",
          citations: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isNew: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedQuestions = [
    "What is the sideways safety zone for 40mph?",
    "Minimum footway width for wheelchairs?",
    "When can I use Give and Take traffic control?",
    "What are the PPE high visibility rules?",
    "Taper length for 30mph single carriageway?"
  ];

  return (
    <div className="max-w-4xl mx-auto px-2.5 sm:px-4 py-3 sm:py-6 flex flex-col h-[calc(100dvh-3.75rem)] sm:h-[calc(100vh-4rem)]">
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 sm:space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-black font-extrabold shadow-md'
                  : isLight
                  ? 'bg-slate-200 text-slate-800 border border-slate-300'
                  : 'bg-zinc-900 text-amber-400 border border-zinc-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <HardHat className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 space-y-3 glass-panel ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold border border-amber-400/40 shadow-xl'
                  : isLight
                  ? 'bg-white/95 text-slate-900 border-slate-200 shadow-md'
                  : 'bg-zinc-950/95 text-zinc-100 border-zinc-800/90 shadow-2xl'
              }`}
            >
              {/* Message Header */}
              <div className={`flex items-center justify-between border-b pb-1.5 text-[11px] sm:text-xs ${
                msg.sender === 'user'
                  ? 'border-slate-950/20 text-slate-950 font-extrabold'
                  : isLight ? 'border-slate-200 text-slate-500' : 'border-zinc-800 text-zinc-400'
              }`}>
                <span className="font-extrabold flex items-center space-x-1">
                  {msg.sender === 'user' ? 'You' : 'RedBook Safety AI'}
                </span>
                <span className="font-semibold">{msg.timestamp}</span>
              </div>

              {/* Text Body */}
              {msg.sender === 'bot' ? (
                <StreamingText
                  fullText={msg.text}
                  isStreamingEnabled={msg.isNew !== false}
                  theme={theme}
                  onComplete={() => {
                    msg.isNew = false;
                  }}
                />
              ) : (
                <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-950 font-bold">
                  {msg.text}
                </div>
              )}

              {/* Citations Box (Bot Only) */}
              {msg.sender === 'bot' && msg.citations && msg.citations.length > 0 && (
                <div className={`pt-2 border-t space-y-2 ${isLight ? 'border-slate-200' : 'border-zinc-800/80'}`}>
                  <div className={`text-[11px] sm:text-xs font-semibold flex items-center space-x-1 ${
                    isLight ? 'text-amber-700' : 'text-amber-400'
                  }`}>
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Statutory References (Red Book Code of Practice):</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {msg.citations.map((cit, idx) => (
                      <div
                        key={idx}
                        className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-mono flex items-center space-x-1 border ${
                          isLight
                            ? 'bg-slate-100 border-amber-500/30 text-slate-800'
                            : 'bg-black border-amber-500/20 text-zinc-300'
                        }`}
                      >
                        <span className={`font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>{cit.section}</span>
                        <span>• Page {cit.page}</span>
                        <span className={isLight ? 'text-slate-500' : 'text-zinc-500'}>({cit.tableRef})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              {msg.sender === 'bot' && (
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>
                    {msg.source || 'Statutory Grounded RAG'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    className={`p-1 rounded transition-colors ${
                      isLight ? 'text-slate-400 hover:text-slate-800' : 'text-zinc-400 hover:text-white'
                    }`}
                    title="Copy Answer"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}

            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
              isLight ? 'bg-slate-100 text-amber-600 border-slate-300' : 'bg-zinc-900 text-amber-400 border-zinc-800'
            }`}>
              <HardHat className="w-4 h-4 animate-bounce" />
            </div>
            <div className={`glass-panel px-3.5 py-2.5 rounded-2xl text-xs flex items-center space-x-2 border ${
              isLight ? 'bg-white text-amber-800 border-slate-200' : 'bg-zinc-950 text-amber-400 border-zinc-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Searching Red Book Code of Practice index...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="py-2.5 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmit(null, q)}
            className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs transition-all whitespace-nowrap shrink-0 active:scale-95 min-h-[34px] border ${
              isLight
                ? 'bg-white hover:bg-amber-500/15 text-slate-700 hover:text-amber-800 border-slate-200 shadow-sm'
                : 'bg-zinc-900/90 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-400 border-zinc-800'
            }`}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Touch-Optimized Input Bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center mb-1">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder="Ask a technical or legal question on site..."
          className={`w-full border rounded-2xl py-3.5 pl-4 pr-24 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xl min-h-[48px] ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              : 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500'
          }`}
        />

        <div className="absolute right-1.5 flex items-center space-x-1">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${
              isListening
                ? 'bg-red-500 text-white recording-pulse'
                : isLight
                ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
            title="Speech-to-text voice input"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-extrabold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

    </div>
  );
}
