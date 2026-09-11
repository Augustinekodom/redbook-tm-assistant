import React, { useState } from 'react';
import { calculateSafetyZone, evaluateTrafficControl, validateFootwayWidth } from '../utils/tm_calculator';
import { Shield, Gauge, TrafficCone, AlertTriangle, Users, CheckCircle2, XCircle } from 'lucide-react';

export default function Calculators({ theme }) {
  const isLight = theme === 'light';

  const [speedLimit, setSpeedLimit] = useState(30);
  const [siteLength, setSiteLength] = useState(40);
  const [visibilityGood, setVisibilityGood] = useState(true);
  const [footwayWidth, setFootwayWidth] = useState('1.5');

  const safetyResults = calculateSafetyZone(speedLimit);
  const trafficControls = evaluateTrafficControl({
    speedLimit,
    lengthMetres: siteLength,
    visibilityGood,
    heavyTraffic: false
  });
  const footwayEvaluation = validateFootwayWidth(footwayWidth);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
      
      {/* Top Banner */}
      <div className={`glass-panel p-4 sm:p-6 rounded-2xl border ${
        isLight
          ? 'border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-white to-slate-50 text-slate-900'
          : 'border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-zinc-950 to-black text-white'
      }`}>
        <div className="flex items-start space-x-3.5">
          <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${
            isLight ? 'bg-amber-500/20 text-amber-700' : 'bg-amber-500/20 text-amber-400'
          }`}>
            <Gauge className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-heading">
              Red Book Site Parameters & Safety Calculator
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
              Statutory dimensions from <strong className={isLight ? 'text-amber-700' : 'text-amber-400'}>Table 1 (Page 14)</strong> of the Code of Practice.
            </p>
          </div>
        </div>
      </div>

      {/* Speed Limit Selector */}
      <div className={`glass-panel p-4 sm:p-6 rounded-2xl border space-y-4 sm:space-y-6 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'border-zinc-800/80 bg-zinc-950/90'
      }`}>
        <div className="flex items-center justify-between">
          <label className={`text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center space-x-2 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            <TrafficCone className="w-4 h-4 text-amber-500" />
            <span>Speed Limit (mph)</span>
          </label>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
            isLight ? 'bg-amber-500/20 text-amber-800 border border-amber-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            {speedLimit} MPH
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {[20, 30, 40, 50, 60].map(speed => (
            <button
              key={speed}
              onClick={() => setSpeedLimit(speed)}
              className={`min-h-[52px] sm:min-h-[64px] p-2 sm:p-4 rounded-xl font-bold text-center transition-all flex flex-col items-center justify-center space-y-0.5 ${
                speedLimit === speed
                  ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : isLight
                  ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                  : 'bg-zinc-950 text-zinc-300 hover:bg-zinc-900 border border-zinc-800'
              }`}
            >
              <span className="text-lg sm:text-2xl font-black">{speed}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider opacity-80">MPH</span>
            </button>
          ))}
        </div>
      </div>

      {/* Safety Zone Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        <div className={`glass-card p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-950/80 border-zinc-800/80'
        }`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Sideways Safety Zone
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
            {safetyResults.sidewaysSafetyZone}
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Buffer space between working space & passing traffic. Operatives must NOT enter during traffic.
          </p>
        </div>

        <div className={`glass-card p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-950/80 border-zinc-800/80'
        }`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Lead-in Taper Length
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-500 font-heading">
            {safetyResults.leadInTaper}
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Cone taper length guiding traffic past obstruction. Cone spacing {safetyResults.coneSpacingTaper}.
          </p>
        </div>

        <div className={`glass-card p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-950/80 border-zinc-800/80'
        }`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Long Safety Zone
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-500 font-heading">
            {safetyResults.longSafetyZone}
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Buffer distance between end of lead-in taper and start of working space.
          </p>
        </div>

        <div className={`glass-card p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-950/80 border-zinc-800/80'
        }`}>
          <div className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Warning Sign Distance
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
            {safetyResults.warningSignDistance}
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Advance warning sign placement distance before the lead-in taper.
          </p>
        </div>

      </div>

      {/* Additional Parameters Card */}
      <div className={`glass-panel p-4 sm:p-6 rounded-2xl border space-y-3.5 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'border-zinc-800/80 bg-zinc-950'
      }`}>
        <h3 className={`text-sm sm:text-base font-bold flex items-center space-x-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <Shield className="w-5 h-5 text-amber-500" />
          <span>Statutory Parameters for {speedLimit} MPH Roadworks</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Recommended Warning Sign Size</span>
            <div className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>{safetyResults.recommendedSignSize}</div>
          </div>
          <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Clear Visibility Distance</span>
            <div className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>{safetyResults.clearVisibilityDistance}</div>
          </div>
          <div className={`p-3.5 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'}`}>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Passing Lane Minimum Width</span>
            <div className={`text-base font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>{safetyResults.minimumPassingLaneWidth}</div>
          </div>
        </div>
      </div>

      {/* Traffic Control Evaluator */}
      <div className={`glass-panel p-4 sm:p-6 rounded-2xl border space-y-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'border-zinc-800/80 bg-zinc-950'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-500/20 text-orange-500 rounded-xl">
            <TrafficCone className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Traffic Control Method Evaluator
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Evaluates priority control, priority signs, or portable signals.
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl border ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-zinc-800'
        }`}>
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              Site Length (Metres): {siteLength}m
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={siteLength}
              onChange={e => setSiteLength(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer h-2 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-between pt-1 sm:pt-0">
            <label className={`text-xs sm:text-sm font-semibold ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Clear Visibility to Both Ends?</label>
            <button
              onClick={() => setVisibilityGood(!visibilityGood)}
              className={`px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors min-h-[40px] ${
                visibilityGood ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30' : 'bg-red-500/20 text-red-700 border border-red-500/30'
              }`}
            >
              {visibilityGood ? 'Yes (Good)' : 'No (Obstructed)'}
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {trafficControls.map((tc, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                tc.suitable
                  ? isLight ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-zinc-950/90 border-emerald-500/30'
                  : isLight ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-black border-zinc-900 opacity-60'
              }`}
            >
              {tc.suitable ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{tc.type}</span>
                  {tc.badge && (
                    <span className={`px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-medium border ${
                      isLight ? 'bg-slate-200 text-amber-800 border-slate-300' : 'bg-zinc-900 text-amber-400 border-zinc-800'
                    }`}>
                      {tc.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  {tc.suitable ? tc.details : tc.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pedestrian Footway Clearance Evaluator */}
      <div className={`glass-panel p-4 sm:p-6 rounded-2xl border space-y-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'border-zinc-800/80 bg-zinc-950'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cyan-500/20 text-cyan-600 rounded-xl">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold font-heading ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Pedestrian Footway Clearance Evaluator
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Verify compliance for wheelchair and pushchair access.
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div>
            <label className={`text-xs font-semibold uppercase tracking-wider block mb-1.5 ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}>
              Available Footway Width (Metres):
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="3.0"
                value={footwayWidth}
                onChange={e => setFootwayWidth(e.target.value)}
                className={`w-28 sm:w-32 border font-bold text-base sm:text-lg rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-500 min-h-[44px] ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-zinc-950 border-zinc-800 text-white'
                }`}
              />
              <span className={`text-sm font-semibold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>metres</span>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-xl border space-y-1 ${
              footwayEvaluation.color === 'emerald'
                ? isLight ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-900' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : footwayEvaluation.color === 'amber'
                ? isLight ? 'bg-amber-500/15 border-amber-500/30 text-amber-900' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : footwayEvaluation.color === 'orange'
                ? isLight ? 'bg-orange-500/15 border-orange-500/30 text-orange-900' : 'bg-orange-500/10 border-orange-500/30 text-orange-300'
                : isLight ? 'bg-red-500/15 border-red-500/30 text-red-900' : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            <div className="font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{footwayEvaluation.label}</span>
            </div>
            <p className="text-xs">{footwayEvaluation.message}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
