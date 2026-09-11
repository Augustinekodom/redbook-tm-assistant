import React, { useState } from 'react';
import { calculateSafetyZone, evaluateTrafficControl, validateFootwayWidth } from '../utils/tm_calculator';
import { Shield, Gauge, TrafficCone, AlertTriangle, Users, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export default function Calculators() {
  // Calculator State
  const [speedLimit, setSpeedLimit] = useState(30);
  const [siteLength, setSiteLength] = useState(40);
  const [visibilityGood, setVisibilityGood] = useState(true);
  const [footwayWidth, setFootwayWidth] = useState('1.5');

  // Calculation Results
  const safetyResults = calculateSafetyZone(speedLimit);
  const trafficControls = evaluateTrafficControl({
    speedLimit,
    lengthMetres: siteLength,
    visibilityGood,
    heavyTraffic: false
  });
  const footwayEvaluation = validateFootwayWidth(footwayWidth);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 space-y-8">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
            <Gauge className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              Red Book Site Parameters & Safety Zone Calculator
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Select site speed limit and parameters to get statutory dimensions from <strong className="text-amber-400">Table 1 (Page 14)</strong> of the Code of Practice.
            </p>
          </div>
        </div>
      </div>

      {/* Speed Limit Selector Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <TrafficCone className="w-4 h-4 text-amber-400" />
            <span>Select Speed Limit (mph)</span>
          </label>
          <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
            Current: {speedLimit} MPH
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[20, 30, 40, 50, 60].map(speed => (
            <button
              key={speed}
              onClick={() => setSpeedLimit(speed)}
              className={`p-4 rounded-xl font-bold text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                speedLimit === speed
                  ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="text-2xl font-black">{speed}</span>
              <span className="text-xs uppercase tracking-wider opacity-80">MPH</span>
            </button>
          ))}
        </div>
      </div>

      {/* Safety Zone Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Sideways Safety Zone */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Sideways Safety Zone
          </div>
          <div className="text-3xl font-black text-amber-400 font-heading">
            {safetyResults.sidewaysSafetyZone}
          </div>
          <p className="text-xs text-slate-400">
            Buffer between working space & traffic lane. Operatives must NOT enter during passing traffic.
          </p>
        </div>

        {/* Lead-in Taper Length */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Lead-in Taper Length
          </div>
          <div className="text-3xl font-black text-orange-400 font-heading">
            {safetyResults.leadInTaper}
          </div>
          <p className="text-xs text-slate-400">
            Cone taper length guiding traffic past the obstruction. Cone spacing {safetyResults.coneSpacingTaper}.
          </p>
        </div>

        {/* Long Safety Zone */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Long Safety Zone
          </div>
          <div className="text-3xl font-black text-cyan-400 font-heading">
            {safetyResults.longSafetyZone}
          </div>
          <p className="text-xs text-slate-400">
            Buffer distance between end of lead-in taper and the start of working space.
          </p>
        </div>

        {/* Warning Sign Distance */}
        <div className="glass-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Warning Sign Distance
          </div>
          <div className="text-3xl font-black text-emerald-400 font-heading">
            {safetyResults.warningSignDistance}
          </div>
          <p className="text-xs text-slate-400">
            Advance warning sign placement distance before the lead-in taper.
          </p>
        </div>

      </div>

      {/* Detailed Technical Specifications Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <span>Additional Statutory Parameters for {speedLimit} MPH Roadworks</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Recommended Warning Sign Size</span>
            <div className="text-lg font-bold text-slate-200 mt-1">{safetyResults.recommendedSignSize}</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Clear Visibility Distance</span>
            <div className="text-lg font-bold text-slate-200 mt-1">{safetyResults.clearVisibilityDistance}</div>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Passing Lane Minimum Width</span>
            <div className="text-lg font-bold text-slate-200 mt-1">{safetyResults.minimumPassingLaneWidth}</div>
          </div>
        </div>
      </div>

      {/* Traffic Control Selector */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-xl">
            <TrafficCone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              Traffic Control Method Evaluator
            </h3>
            <p className="text-xs text-slate-400">
              Evaluates shuttle working, priority signs, or portable signals according to site length & visibility.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Site Work Length (Metres): {siteLength}m
            </label>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={siteLength}
              onChange={e => setSiteLength(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 sm:pt-0">
            <label className="text-sm font-semibold text-slate-300">Clear Visibility to Both Ends?</label>
            <button
              onClick={() => setVisibilityGood(!visibilityGood)}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors ${
                visibilityGood ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {visibilityGood ? 'Yes (Good Visibility)' : 'No (Obstructed)'}
            </button>
          </div>
        </div>

        {/* Options Evaluation */}
        <div className="space-y-3">
          {trafficControls.map((tc, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all flex items-start space-x-3 ${
                tc.suitable
                  ? 'bg-slate-900/80 border-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}
            >
              {tc.suitable ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{tc.type}</span>
                  {tc.badge && (
                    <span className="px-2.5 py-0.5 bg-slate-800 text-amber-400 text-xs rounded-full font-medium">
                      {tc.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">
                  {tc.suitable ? tc.details : tc.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pedestrian Footway Clearance Validator */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">
              Pedestrian Footway Clearance Evaluator
            </h3>
            <p className="text-xs text-slate-400">
              Verify compliance for wheelchair, double pram, and visually impaired pedestrian safety.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
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
                className="w-32 bg-slate-900 border border-slate-700 text-white font-bold text-lg rounded-xl px-4 py-2 focus:outline-none focus:border-amber-500"
              />
              <span className="text-sm font-semibold text-slate-400">metres</span>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border space-y-1 ${
              footwayEvaluation.color === 'emerald'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : footwayEvaluation.color === 'amber'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : footwayEvaluation.color === 'orange'
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            <div className="font-bold text-sm uppercase tracking-wider flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{footwayEvaluation.label}</span>
            </div>
            <p className="text-xs">{footwayEvaluation.message}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
