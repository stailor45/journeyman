import React, { useState } from 'react';
import { Play, ArrowRight, Gauge, Wrench, Compass, Shield, Flame, Sun, Droplets, CheckCircle, Radio } from 'lucide-react';
import { Episode } from '../types';
import { AudioPlayer } from './AudioPlayer';

interface MissionControlProps {
  latestEpisode: Episode;
  onPlayEpisode: (episode: Episode) => void;
  onNavigateTab: (tab: 'mission-control' | 'field-diary' | 'tech-vault' | 'milestones' | 'about') => void;
  onOpenNotes: () => void;
}

export const MissionControl: React.FC<MissionControlProps> = ({
  latestEpisode,
  onPlayEpisode,
  onNavigateTab,
  onOpenNotes
}) => {
  // Desert Climate Widget State
  const [ambientSim, setAmbientSim] = useState<number>(114);
  const rooftopTemp = Math.round(ambientSim * 1.34);
  const dewPoint = 52;

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typographic Hierarchy & Primary CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623]">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span>FIELD LOG 2026 · GILBERT, ARIZONA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.1] text-balance">
            Documenting the climb from trade school grad to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#F5A623] to-amber-200">
              HVAC journeyman
            </span>{' '}
            in the Arizona desert heat.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Real field calls, unvarnished diagnostic breakdowns, and technical masterclasses from an NTI graduate and EPA Universal holder navigating 118°F rooftop extremes, A2L refrigerant transitions, and ethical craftsmanship in the Phoenix East Valley.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onPlayEpisode(latestEpisode)}
              className="px-6 py-3.5 text-xs sm:text-sm font-bold text-black bg-[#F5A623] hover:bg-[#e0951b] active:scale-[0.98] rounded-xl transition-all flex items-center gap-2.5 cursor-pointer shadow-lg shadow-amber-500/15"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Listen to Latest Episode</span>
            </button>

            <button
              onClick={() => onNavigateTab('tech-vault')}
              className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-[#181f24] hover:bg-[#222a30] hover:text-white border border-[#243038] hover:border-[#384855] rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4 text-[#F5A623]" />
              <span>Open Tech Vault</span>
            </button>

            <button
              onClick={() => onNavigateTab('milestones')}
              className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View 8,000h Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: High-Fidelity Domain Visual Container (Zero-Broken-Image Policy) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-[#243038] bg-[#181f24] p-6 shadow-2xl">
            {/* Ambient Desert Condenser Graphic Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#243038]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sun className="w-4 h-4 text-[#F5A623]" />
                <span className="text-white font-semibold">Desert Rooftop Rig</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#F5A623]">Live Test Point</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-[#121619] px-2 py-0.5 rounded border border-[#222a30]">
                R-410A / 10-Ton
              </span>
            </div>

            {/* Industrial SVG Schematic / Unit Representation */}
            <div className="my-5 bg-[#121619] rounded-xl p-5 border border-[#222a30] relative overflow-hidden">
              <svg className="w-full h-44" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Desert Horizon Mountains */}
                <path d="M0 140L40 100L90 125L160 85L240 130L310 95L360 120V180H0V140Z" fill="#1e262c" opacity="0.6" />
                <path d="M40 140L90 110L140 130L210 98L280 135L360 105V180H40V140Z" fill="#182026" opacity="0.8" />
                
                {/* Heat haze waves */}
                <path d="M20 70 Q 50 60, 80 70 T 140 70 T 200 70" stroke="#F5A623" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
                <path d="M40 55 Q 70 45, 100 55 T 160 55 T 220 55" stroke="#F5A623" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.3" />

                {/* Condensing Unit Cabinet */}
                <rect x="70" y="45" width="160" height="110" rx="6" fill="#243038" stroke="#3b4b57" strokeWidth="2" />
                
                {/* Top Fan Grille & Fan Blades */}
                <ellipse cx="150" cy="55" rx="50" ry="12" fill="#181f24" stroke="#F5A623" strokeWidth="1.5" />
                <circle cx="150" cy="55" r="8" fill="#F5A623" />
                <path d="M150 55L120 50M150 55L180 60M150 55L135 63M150 55L165 47" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />

                {/* Louvered microchannel side coil */}
                <line x1="85" y1="78" x2="215" y2="78" stroke="#33424d" strokeWidth="2" />
                <line x1="85" y1="88" x2="215" y2="88" stroke="#33424d" strokeWidth="2" />
                <line x1="85" y1="98" x2="215" y2="98" stroke="#33424d" strokeWidth="2" />
                <line x1="85" y1="108" x2="215" y2="108" stroke="#33424d" strokeWidth="2" />
                <line x1="85" y1="118" x2="215" y2="118" stroke="#33424d" strokeWidth="2" />
                <line x1="85" y1="128" x2="215" y2="128" stroke="#33424d" strokeWidth="2" />

                {/* Service Valves & Gauge Hoses */}
                <circle cx="218" cy="138" r="4" fill="#E57373" stroke="#fff" strokeWidth="1" />
                <circle cx="218" cy="148" r="4" fill="#38BDF8" stroke="#fff" strokeWidth="1" />
                <path d="M222 138 Q 260 145, 290 120" stroke="#E57373" strokeWidth="2.5" fill="none" />
                <path d="M222 148 Q 255 160, 290 145" stroke="#38BDF8" strokeWidth="2.5" fill="none" />

                {/* Digital Wireless Probes / Manifold Body */}
                <rect x="290" y="105" width="48" height="50" rx="4" fill="#121619" stroke="#F5A623" strokeWidth="1.5" />
                <rect x="296" y="112" width="36" height="18" rx="2" fill="#0d1114" />
                <text x="314" y="125" fill="#F5A623" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">428 / 128</text>
                <circle cx="304" cy="142" r="3" fill="#E57373" />
                <circle cx="324" cy="142" r="3" fill="#38BDF8" />
              </svg>

              {/* Live Overlay Tag */}
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400 bg-[#121619]/90 px-2.5 py-1 rounded border border-[#243038]">
                <span>Gilbert Ambient: </span>
                <span className="text-[#F5A623] font-bold">{ambientSim}°F</span>
                <span className="text-slate-500"> | Roof: {rooftopTemp}°F</span>
              </div>
            </div>

            {/* Quick Live Parameters */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-[#121619] rounded-lg border border-[#222a30]">
                <div className="text-[10px] font-mono text-slate-400">LIQUID HEAD</div>
                <div className="font-mono font-bold text-rose-400 mt-0.5">428 psig</div>
                <div className="text-[10px] text-slate-500">Subcooling: 10.4°F</div>
              </div>
              <div className="p-2.5 bg-[#121619] rounded-lg border border-[#222a30]">
                <div className="text-[10px] font-mono text-slate-400">VAPOR SUCTION</div>
                <div className="font-mono font-bold text-sky-400 mt-0.5">128 psig</div>
                <div className="text-[10px] text-slate-500">Superheat: 11.2°F</div>
              </div>
              <div className="p-2.5 bg-[#121619] rounded-lg border border-[#222a30]">
                <div className="text-[10px] font-mono text-slate-400">AMPERAGE</div>
                <div className="font-mono font-bold text-amber-300 mt-0.5">18.4 A</div>
                <div className="text-[10px] text-slate-500">RLA: 21.0 A</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Proof Metrics Strip (Section 2B & 5.13 strictly in full-width row below split) */}
      <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#243038]">
          <div className="pt-4 lg:pt-0 lg:px-4 first:lg:pl-0">
            <div className="text-xs font-mono text-slate-400 mb-1">
              LOGGED ON-THE-JOB HOURS
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
              3,420
            </div>
            <div className="text-xs text-[#F5A623] font-medium mt-1">
              42.8% to 8,000h Journeyman Exam
            </div>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-4">
            <div className="text-xs font-mono text-slate-400 mb-1">
              EPA UNIVERSAL CERTIFIED
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
              Type I, II, III
            </div>
            <div className="text-xs text-emerald-400 font-medium mt-1">
              + Esco A2L Low-GWP Endorsement
            </div>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-4">
            <div className="text-xs font-mono text-slate-400 mb-1">
              FIELD FLEET POSITION
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Van Lead Tech
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              Level 3 Senior Apprentice
            </div>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-4">
            <div className="text-xs font-mono text-slate-400 mb-1">
              SUMMER FIRST-TIME FIX RATE
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
              94.2%
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              East Valley (Gilbert / Mesa / Chandler)
            </div>
          </div>
        </div>
      </div>

      {/* Featured Episode Audio Player Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#F5A623] mb-1">
              FEATURED AUDIO BROADCAST
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Latest Field Diary Session
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('field-diary')}
            className="text-xs font-semibold text-[#F5A623] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>All 16 Episodes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Real interactive waveform audio player */}
        <AudioPlayer
          currentEpisode={latestEpisode}
          onOpenNotes={onOpenNotes}
        />
      </div>

      {/* Quick Access Grid: Tech Vault & Roadmap Jump */}
      <div className="space-y-4">
        <div>
          <div className="text-xs font-mono text-[#F5A623] mb-1">
            RAPID WORKBENCH ACCESS
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Field Diagnostics & Roadmap Exploration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: High Ambient Diagnostic */}
          <div
            onClick={() => onNavigateTab('tech-vault')}
            className="bg-[#181f24] border border-[#243038] hover:border-[#F5A623] rounded-2xl p-6 transition-all cursor-pointer group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-[#222a30] text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-black flex items-center justify-center transition-colors mb-4">
              <Gauge className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-slate-400 mb-1">
              TECH VAULT · TOOL #01
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#F5A623] transition-colors mb-2">
              High-Ambient Heat Load Calculator
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Simulate 115°F desert rooftop head pressures, target subcooling tolerances, and condenser split ratios in real time.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#F5A623] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Launch Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: 24V Schematic Tracer */}
          <div
            onClick={() => onNavigateTab('tech-vault')}
            className="bg-[#181f24] border border-[#243038] hover:border-[#F5A623] rounded-2xl p-6 transition-all cursor-pointer group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-[#222a30] text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-black flex items-center justify-center transition-colors mb-4">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-slate-400 mb-1">
              TECH VAULT · TOOL #02
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#F5A623] transition-colors mb-2">
              24V Control Schematic Tracer
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Trace R, C, Y1, float switches, and high pressure cutouts with live simulated multimeter probe voltage checks.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#F5A623] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Trace Circuits</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Milestone Roadmap */}
          <div
            onClick={() => onNavigateTab('milestones')}
            className="bg-[#181f24] border border-[#243038] hover:border-[#F5A623] rounded-2xl p-6 transition-all cursor-pointer group shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-[#222a30] text-[#F5A623] group-hover:bg-[#F5A623] group-hover:text-black flex items-center justify-center transition-colors mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-slate-400 mb-1">
              CAREER ROADMAP · AUDITED
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#F5A623] transition-colors mb-2">
              Journeyman Benchmark Tracker
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Review NTI diploma honors, EPA Universal credentials, verified field hours, and master contractor skill sign-offs.
            </p>
            <div className="flex items-center text-xs font-semibold text-[#F5A623] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Inspect Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
