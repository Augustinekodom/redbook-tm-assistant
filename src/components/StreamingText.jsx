import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function StreamingText({ fullText, isStreamingEnabled = true, onComplete, theme }) {
  const [displayedLength, setDisplayedLength] = useState(isStreamingEnabled ? 0 : fullText.length);
  const isLight = theme === 'light';

  useEffect(() => {
    if (!isStreamingEnabled) {
      setDisplayedLength(fullText.length);
      return;
    }

    setDisplayedLength(0);
    const speed = 12; // ms per character chunk
    const chunkSize = 4; // characters per tick

    const interval = setInterval(() => {
      setDisplayedLength(prev => {
        const next = prev + chunkSize;
        if (next >= fullText.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return fullText.length;
        }
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, isStreamingEnabled]);

  const currentText = fullText.slice(0, displayedLength);
  const isDone = displayedLength >= fullText.length;

  const parts = currentText.split('\n---\n');

  if (currentText.startsWith('**Definitive Answer:')) {
    const topAnswerRaw = parts[0] || '';
    const topAnswer = topAnswerRaw.replace(/\*\*/g, '');
    const restText = parts.slice(1).join('\n---\n');

    return (
      <div className="space-y-3" onClick={() => setDisplayedLength(fullText.length)}>
        {/* Highlighted Definitive Top Answer Callout Box */}
        <div className={`p-3.5 border-l-4 rounded-r-xl font-bold text-sm sm:text-base leading-snug shadow-md flex items-start space-x-2.5 ${
          isLight
            ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-50 border-amber-500 text-amber-900'
            : 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900 border-amber-400 text-amber-200'
        }`}>
          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
          <div className="flex-1">
            {topAnswer}
            {!isDone && <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse" />}
          </div>
        </div>

        {/* Detailed Red Book Context Breakdown */}
        {restText && (
          <div className={`whitespace-pre-line text-xs sm:text-sm leading-relaxed pt-1 ${
            isLight ? 'text-slate-800' : 'text-slate-200'
          }`}>
            {restText}
            {!isDone && parts.length > 1 && <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse" />}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`whitespace-pre-line text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}
      onClick={() => setDisplayedLength(fullText.length)}
    >
      {currentText}
      {!isDone && <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse" />}
    </div>
  );
}
