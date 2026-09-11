import React, { useState, useEffect, useRef } from 'react';
import { executeRAGQuery } from '../utils/ai_engine';
import { Send, Mic, MicOff, User, BookOpen, Copy, Check, HardHat, CheckCircle2 } from 'lucide-react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "**Definitive Answer: Welcome to the Red Book Traffic Management AI Assistant.**\n---\nI am grounded strictly in the DfT **Safety at Street Works and Road Works – A Code of Practice (NRSWA 1991)**.\n\nAsk me any question on site (e.g. safety zone clearance, lead-in taper, footway width, or traffic control selection) to get instant definitive answers with exact statutory page and section citations!",
      citations: [
        { section: "Red Book Statutory Code", page: "Cover", tableRef: "NRSWA Section 65", title: "Safety at Street Works and Road Works" }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

  const renderFormattedMessage = (text) => {
    const parts = text.split('\n---\n');
    if (parts.length > 1 && text.startsWith('**Definitive Answer:')) {
      const topAnswer = parts[0].replace(/\*\*/g, '');
      const restText = parts.slice(1).join('\n---\n');
      return (
        <div className="space-y-3">
          {/* Highlighted Definitive Top Answer Callout Box */}
          <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-slate-900 border-l-4 border-amber-400 rounded-r-xl text-amber-200 font-bold text-sm sm:text-base leading-snug shadow-md flex items-start space-x-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>{topAnswer}</div>
          </div>

          {/* Detailed Red Book Context Breakdown */}
          <div className="whitespace-pre-line text-sm leading-relaxed text-slate-200 pt-1">
            {restText}
          </div>
        </div>
      );
    }
    return <div className="whitespace-pre-line text-sm leading-relaxed">{text}</div>;
  };

  const suggestedQuestions = [
    "What is the sideways safety zone for 40mph?",
    "Minimum footway width for wheelchairs?",
    "When can I use Give and Take traffic control?",
    "What are the PPE high visibility rules?",
    "Taper length for 30mph single carriageway?"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-amber-400 border border-slate-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-5 h-5" /> : <HardHat className="w-5 h-5" />}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 space-y-3 glass-panel ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium'
                  : 'bg-slate-900/95 text-slate-100 border-slate-800 shadow-xl'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs opacity-75">
                <span className="font-bold flex items-center space-x-1">
                  {msg.sender === 'user' ? 'You' : 'RedBook Safety AI'}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Text Body */}
              {renderFormattedMessage(msg.text)}

              {/* Citations Box (Bot Only) */}
              {msg.sender === 'bot' && msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-xs font-semibold text-amber-400 flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Statutory References (Red Book Code of Practice):</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {msg.citations.map((cit, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-amber-500/20 text-xs text-slate-300 font-mono flex items-center space-x-1"
                      >
                        <span className="text-amber-400 font-bold">{cit.section}</span>
                        <span>• Page {cit.page}</span>
                        <span className="text-slate-400">({cit.tableRef})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              {msg.sender === 'bot' && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {msg.source || 'Statutory Grounded RAG'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(msg.id, msg.text)}
                    className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    title="Copy Answer"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="py-3 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSubmit(null, q)}
            className="px-3 py-1.5 rounded-full text-xs bg-slate-900/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-800 transition-all whitespace-nowrap shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          placeholder="Ask a technical or legal question about roadworks safety..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl py-3.5 pl-4 pr-24 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xl"
        />

        <div className="absolute right-2 flex items-center space-x-1">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500 text-white recording-pulse'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Speech-to-text voice input"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

    </div>
  );
}
