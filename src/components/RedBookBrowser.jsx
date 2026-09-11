import React, { useState } from 'react';
import { RED_BOOK_CHUNKS, RED_BOOK_METADATA } from '../data/redbook_kb';
import { Search, BookOpen, ChevronRight, Scale } from 'lucide-react';

export default function RedBookBrowser({ theme }) {
  const isLight = theme === 'light';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);

  const filteredChunks = RED_BOOK_CHUNKS.filter(chunk => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      chunk.title.toLowerCase().includes(term) ||
      chunk.section.toLowerCase().includes(term) ||
      chunk.content.toLowerCase().includes(term) ||
      chunk.keywords.some(k => k.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 space-y-6">
      
      {/* Header Info */}
      <div className={`glass-panel p-6 rounded-2xl border space-y-3 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'border-zinc-800 bg-zinc-950'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/20 text-amber-500 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`text-xl font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Red Book Statutory Code Browser
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              {RED_BOOK_METADATA.title} ({RED_BOOK_METADATA.edition})
            </p>
          </div>
        </div>

        <div className={`flex items-center space-x-2 text-xs p-3 rounded-xl border ${
          isLight ? 'bg-amber-500/10 border-amber-500/30 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          <Scale className="w-4 h-4 shrink-0" />
          <span><strong>Legal Status:</strong> {RED_BOOK_METADATA.legalBasis}</span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className={`w-5 h-5 absolute left-4 top-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Red Book sections, topics, keywords (e.g. taper, pedestrian, 1.2m, signals)..."
          className={`w-full border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500 ${
            isLight ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm' : 'bg-zinc-950 border-zinc-800 text-white placeholder-zinc-500'
          }`}
        />
      </div>

      {/* Code Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChunks.map(chunk => (
          <div
            key={chunk.id}
            onClick={() => setSelectedSection(selectedSection === chunk.id ? null : chunk.id)}
            className={`glass-card p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
              selectedSection === chunk.id
                ? isLight ? 'border-amber-500 bg-amber-500/5' : 'border-amber-500/50 bg-zinc-950'
                : isLight ? 'border-slate-200 hover:border-slate-300 bg-white shadow-sm' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/80'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border ${
                  isLight ? 'bg-amber-500/15 text-amber-800 border-amber-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {chunk.section} • Page {chunk.page}
                </span>
                <h3 className={`text-base font-bold mt-2 font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {chunk.title}
                </h3>
              </div>
              <ChevronRight
                className={`w-5 h-5 transition-transform ${
                  selectedSection === chunk.id ? 'rotate-90 text-amber-500' : isLight ? 'text-slate-400' : 'text-zinc-500'
                }`}
              />
            </div>

            <p className={`text-xs leading-relaxed whitespace-pre-line ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
              {selectedSection === chunk.id
                ? chunk.content
                : `${chunk.content.slice(0, 140)}...`}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {chunk.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 text-[10px] rounded border ${
                    isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-black text-zinc-400 border-zinc-800'
                  }`}
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
