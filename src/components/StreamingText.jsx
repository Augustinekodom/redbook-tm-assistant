import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Renders text with progressive typewriter streaming reveal and bold top answer callout box.
 */
export default function StreamingText({ fullText, isStreamingEnabled = true, onComplete }) {
  const [displayedLength, setDisplayedLength] = useState(isStreamingEnabled ? 0 : fullText.length);

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
        <div className="p-3.5 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900 border-l-4 border-amber-400 rounded-r-xl text-amber-200 font-bold text-sm sm:text-base leading-snug shadow-lg flex items-start space-x-2.5">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            {topAnswer}
            {!isDone && <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse" />}
          </div>
        </div>

        {/* Detailed Red Book Context Breakdown */}
        {restText && (
          <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-200 pt-1">
            {restText}
            {!isDone && parts.length > 1 && <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse" />}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="whitespace-pre-line text-xs sm:text-sm leading-relaxed"
      onClick={() => setDisplayedLength(fullText.length)}
    >
      {currentText}
      {!isDone && <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse" />}
    </div>
  );
}
