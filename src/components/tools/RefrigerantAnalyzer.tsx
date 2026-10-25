import React, { useState } from 'react';
import { Layers, ShieldCheck, Thermometer, Info, LineChart } from 'lucide-react';
import { RefrigerantPTChartD3 } from './RefrigerantPTChartD3';

interface RefrigerantData {
  name: string;
  chemicalFormula: string;
  safetyClass: 'A1 (Non-toxic / Non-flammable)' | 'A2L (Mildly Flammable)';
  gwp: number;
  criticalTemp: number; // °F
  glide: number; // °F
  colorCode: string;
  basePsigAt45F: number; // Typical Evap saturation pressure
  basePsigAt125F: number; // High ambient desert condensing pressure
  oilType: string;
  fieldNotes: string;
}

const REFRIGERANTS: Record<string, RefrigerantData> = {
  'R-410A': {
    name: 'R-410A (Puron / Suva 410A)',
    chemicalFormula: '50% R-32 / 50% R-125 (Near-Azeotropic)',
    safetyClass: 'A1 (Non-toxic / Non-flammable)',
    gwp: 2088,
    criticalTemp: 161.8,
    glide: 0.3,
    colorCode: '#E57373', // Rose/Pink cylinder
    basePsigAt45F: 130,
    basePsigAt125F: 446,
    oilType: 'POE (Polyolester Oil)',
    fieldNotes: 'Legacy industry workhorse being phased down under the AIM Act (GWP > 700 banned for new residential systems starting 2025/2026).'
  },
  'R-32': {
    name: 'R-32 (Difluoromethane)',
    chemicalFormula: '100% CH2F2 (Single Component Pure Gas)',
    safetyClass: 'A2L (Mildly Flammable)',
    gwp: 675,
    criticalTemp: 172.6,
    glide: 0.0,
    colorCode: '#F87171', // Red band
    basePsigAt45F: 133,
    basePsigAt125F: 462,
    oilType: 'POE or PVE',
    fieldNotes: 'Daikin & Goodman primary platform. Zero glide, pure single molecule allows top-off without liquid-only charging concerns. Higher discharge temperatures in 115°F desert heat.'
  },
  'R-454B': {
    name: 'R-454B (Opteon XL41 / Puron Advance)',
    chemicalFormula: '68.9% R-32 / 31.1% R-1234yf (Zeotropic blend)',
    safetyClass: 'A2L (Mildly Flammable)',
    gwp: 466,
    criticalTemp: 170.8,
    glide: 1.5,
    colorCode: '#FB923C', // Orange band
    basePsigAt45F: 124,
    basePsigAt125F: 428,
    oilType: 'POE (Polyolester)',
    fieldNotes: 'Carrier, Trane & Lennox primary low-GWP replacement. Lower discharge temps than pure R-32, ideal for Arizona extreme compression ratios. Requires liquid-state charging to prevent blend fractionation.'
  }
};

export const RefrigerantAnalyzer: React.FC = () => {
  const [selectedRef, setSelectedRef] = useState<string>('R-410A');
  const [testTemp, setTestTemp] = useState<number>(115); // Desert test temp
  const [showChart, setShowChart] = useState<boolean>(true);

  const current = REFRIGERANTS[selectedRef];

  // Dynamic estimated saturation pressure across temp curve
  const calculatePsig = (temp: number, ref: string) => {
    if (ref === 'R-410A') {
      return Math.round(130 + (temp - 45) * 3.95);
    } else if (ref === 'R-32') {
      return Math.round(133 + (temp - 45) * 4.11);
    } else {
      // R-454B runs ~4% lower pressure than R-410A
      return Math.round(124 + (temp - 45) * 3.8);
    }
  };

  const dynamicPsig = calculatePsig(testTemp, selectedRef);

  return (
    <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#243038]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623]">
            <Layers className="w-4 h-4 text-[#F5A623]" />
            <span>Field Diagnostic Tool #03</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Refrigerant Cycle & Low-GWP A2L Transition Analyzer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Comparing thermodynamics, operating pressures, glide, and field safety protocols for R-410A vs next-generation R-32 and R-454B.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowChart(!showChart)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              showChart
                ? 'bg-amber-400/20 text-[#F5A623] border border-[#F5A623]/40'
                : 'bg-[#121619] hover:bg-[#222a30] text-slate-300 border border-[#2b353e]'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>{showChart ? 'D3 Chart Active' : 'View D3 P-T Curves'}</span>
          </button>

          {/* Refrigerant Selector Buttons */}
          <div className="flex rounded-lg bg-[#121619] p-1 border border-[#2b353e]">
            {Object.keys(REFRIGERANTS).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedRef(key)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedRef === key
                    ? 'bg-[#F5A623] text-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic P-T Slider */}
      <div className="mt-6 p-4 rounded-xl bg-[#121619] border border-[#222a30]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Thermometer className="w-4 h-4 text-[#F5A623]" />
            <span>Saturation Temperature Probe Slider:</span>
            <span className="font-mono text-base font-bold text-[#F5A623]">{testTemp}°F</span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Estimated Vapor/Bubble Pressure: <span className="text-white font-bold text-sm">{dynamicPsig} psig</span>
          </div>
        </div>
        <input
          type="range"
          min="32"
          max="145"
          value={testTemp}
          onChange={(e) => setTestTemp(Number(e.target.value))}
          className="w-full h-1.5 bg-[#243038] rounded appearance-none cursor-pointer accent-[#F5A623]"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
          <span>32°F (Freezing)</span>
          <span>45°F (Normal Evaporator)</span>
          <span>115°F (Desert Ambient)</span>
          <span>135°F (High Head Peak)</span>
        </div>
      </div>

      {/* Specifications Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#121619] rounded-xl border border-[#222a30]">
          <div className="text-[11px] font-mono text-slate-400">SAFETY CLASSIFICATION</div>
          <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
            <ShieldCheck className={`w-4 h-4 ${current.safetyClass.includes('A2L') ? 'text-amber-400' : 'text-emerald-400'}`} />
            <span>{current.safetyClass}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {current.safetyClass.includes('A2L')
              ? 'Requires spark-proof vacuum pump & recovery rig.'
              : 'Standard legacy safety protocol.'}
          </div>
        </div>

        <div className="p-4 bg-[#121619] rounded-xl border border-[#222a30]">
          <div className="text-[11px] font-mono text-slate-400">GLOBAL WARMING POTENTIAL (GWP)</div>
          <div className="text-lg font-bold font-mono text-white mt-1 tabular-nums">
            {current.gwp}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {current.gwp > 700 ? 'Exceeds 2025 EPA limit' : 'EPA AIM Act Compliant (<700)'}
          </div>
        </div>

        <div className="p-4 bg-[#121619] rounded-xl border border-[#222a30]">
          <div className="text-[11px] font-mono text-slate-400">TEMPERATURE GLIDE</div>
          <div className="text-lg font-bold font-mono text-white mt-1 tabular-nums">
            {current.glide}°F
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            {current.glide > 0.5 ? 'Charge strictly as liquid to avoid fractionation' : 'Zero/negligible fractionation'}
          </div>
        </div>

        <div className="p-4 bg-[#121619] rounded-xl border border-[#222a30]">
          <div className="text-[11px] font-mono text-slate-400">DESERT ROOFTOP HEAD (125°F)</div>
          <div className="text-lg font-bold font-mono text-[#F5A623] mt-1 tabular-nums">
            {current.basePsigAt125F} psig
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Normal Evap @ 45°F: {current.basePsigAt45F} psig
          </div>
        </div>
      </div>

      {/* Field Experience & Deep Notes */}
      <div className="mt-5 p-4 rounded-xl bg-[#121619] border border-[#243038] text-xs">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-white text-sm">
              Apprentice Field Reality: {current.name}
            </div>
            <div className="text-slate-300 mt-1 leading-relaxed">
              {current.fieldNotes}
            </div>
            <div className="mt-2 text-slate-400">
              <span className="font-mono text-[#F5A623]">Approved Lubricant: </span>
              <span>{current.oilType} · Chemical Makeup: {current.chemicalFormula}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integrated D3 Saturation Curve Engine */}
      {showChart && (
        <div className="mt-6 pt-6 border-t border-[#243038]">
          <RefrigerantPTChartD3 />
        </div>
      )}
    </div>
  );
};
