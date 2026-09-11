import React, { useState } from 'react';
import { RED_BOOK_CHUNKS, RED_BOOK_METADATA } from '../data/redbook_kb';
import { Search, BookOpen, ChevronRight, Scale } from 'lucide-react';

export default function RedBookBrowser() {
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
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 space-y-6 bg-black">
      
      {/* Header Info */}
      <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              Red Book Statutory Code Browser
            </h2>
            <p className="text-xs text-zinc-400">
              {RED_BOOK_METADATA.title} ({RED_BOOK_METADATA.edition})
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
          <Scale className="w-4 h-4 shrink-0" />
          <span><strong>Legal Status:</strong> {RED_BOOK_METADATA.legalBasis}</span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-3.5 text-zinc-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Red Book sections, topics, keywords (e.g. taper, pedestrian, 1.2m, signals)..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-amber-500"
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
                ? 'border-amber-500/50 bg-zinc-950'
                : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/80'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-md border border-amber-500/20">
                  {chunk.section} • Page {chunk.page}
                </span>
                <h3 className="text-base font-bold text-white mt-2 font-heading">
                  {chunk.title}
                </h3>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-zinc-500 transition-transform ${
                  selectedSection === chunk.id ? 'rotate-90 text-amber-400' : ''
                }`}
              />
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
              {selectedSection === chunk.id
                ? chunk.content
                : `${chunk.content.slice(0, 140)}...`}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {chunk.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-black text-zinc-400 text-[10px] rounded border border-zinc-800"
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
