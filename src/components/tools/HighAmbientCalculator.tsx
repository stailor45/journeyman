import React, { useState } from 'react';
import { Gauge, AlertTriangle, CheckCircle, Flame, Snowflake, RotateCcw } from 'lucide-react';

export const HighAmbientCalculator: React.FC = () => {
  // Inputs
  const [ambientTemp, setAmbientTemp] = useState<number>(114); // 114°F Phoenix summer baseline
  const [returnDryBulb, setReturnDryBulb] = useState<number>(76); // Indoor DB
  const [returnWetBulb, setReturnWetBulb] = useState<number>(62); // Indoor WB
  const [meteringType, setMeteringType] = useState<'TXV' | 'Piston'>('TXV');
  const [refrigerant, setRefrigerant] = useState<'R-410A' | 'R-32'>('R-410A');
  
  // Measured Pressures & Line Temps
  const [liquidPressure, setLiquidPressure] = useState<number>(425); // psig
  const [liquidLineTemp, setLiquidLineTemp] = useState<number>(112); // °F
  const [suctionPressure, setSuctionPressure] = useState<number>(128); // psig
  const [suctionLineTemp, setSuctionLineTemp] = useState<number>(56); // °F

  // Approximate P-T curve calculation for R-410A & R-32
  const calcSatTemp = (psig: number, type: 'R-410A' | 'R-32'): number => {
    if (type === 'R-410A') {
      // Approximation curve for R-410A: Sat Temp ≈ -60 + 8.85 * (psig)^0.485
      return Math.round(-61 + 8.95 * Math.pow(Math.max(10, psig), 0.488));
    } else {
      // R-32 runs slightly higher pressure (~1-2% higher than R-410A at same temp)
      return Math.round(-63 + 8.8 * Math.pow(Math.max(10, psig), 0.49));
    }
  };

  const liquidSatTemp = calcSatTemp(liquidPressure, refrigerant);
  const suctionSatTemp = calcSatTemp(suctionPressure, refrigerant);

  // Subcooling = Liquid Saturation Temp - Measured Liquid Line Temp
  const measuredSubcooling = Math.max(0, liquidSatTemp - liquidLineTemp);
  // Superheat = Measured Suction Line Temp - Suction Saturation Temp
  const measuredSuperheat = Math.max(0, suctionLineTemp - suctionSatTemp);

  // Targets
  // TXV standard target: typ 10°F to 12°F subcooling
  const targetSubcooling = 10;
  // Fixed orifice target superheat formula: [(3 × Indoor WB) - Outdoor DB - 80] / 2
  const targetSuperheatFormula = Math.round(((3 * returnWetBulb) - ambientTemp - 80) / 2);
  const targetSuperheat = Math.max(5, Math.min(30, targetSuperheatFormula));

  // Condenser Temperature Over Ambient (CTOE / Condenser Split)
  const condenserSplit = liquidSatTemp - ambientTemp;

  // Diagnostic logic based on high-ambient field standards
  let diagnosticStatus: 'Normal' | 'Undercharged' | 'Overcharged' | 'Restriction' | 'Dirty Coil' | 'Low Airflow' = 'Normal';
  let diagnosticDetails = '';

  if (condenserSplit > 30 || liquidPressure > 470) {
    diagnosticStatus = 'Dirty Coil';
    diagnosticDetails = `Excessive head pressure (${liquidPressure} psig) and Condenser Split (+${condenserSplit}°F). Clean outdoor microchannel coil thoroughly with low-pressure water.`;
  } else if (measuredSubcooling < 5 && measuredSuperheat > 18) {
    diagnosticStatus = 'Undercharged';
    diagnosticDetails = `Low subcooling (${measuredSubcooling}°F) and elevated superheat (${measuredSuperheat}°F) indicates refrigerant loss. Locate leak on indoor coil or service Schrader cores.`;
  } else if (measuredSubcooling > 16 && measuredSuperheat < 6) {
    diagnosticStatus = 'Overcharged';
    diagnosticDetails = `High subcooling (${measuredSubcooling}°F) and low superheat (${measuredSuperheat}°F) indicates excess refrigerant stacked in the condenser.`;
  } else if (measuredSubcooling > 14 && measuredSuperheat > 20) {
    diagnosticStatus = 'Restriction';
    diagnosticDetails = `Refrigerant stacked before restriction (High Subcooling ${measuredSubcooling}°F) while evaporator is starved (High Superheat ${measuredSuperheat}°F). Check liquid filter drier for temperature drop.`;
  } else if (measuredSuperheat < 6 && measuredSubcooling >= 8) {
    diagnosticStatus = 'Low Airflow';
    diagnosticDetails = `Low superheat with normal subcooling indicates low heat absorption in evaporator. Check dirty air filter, duct static, or blower capacitor.`;
  } else {
    diagnosticStatus = 'Normal';
    diagnosticDetails = `System running within desert engineering tolerances. Subcooling: ${measuredSubcooling}°F (Target ${targetSubcooling}°F). Condenser Split: ${condenserSplit}°F.`;
  }

  const resetToHealthyPreset = () => {
    setAmbientTemp(114);
    setReturnDryBulb(76);
    setReturnWetBulb(62);
    setLiquidPressure(420);
    setLiquidLineTemp(112);
    setSuctionPressure(128);
    setSuctionLineTemp(56);
    setMeteringType('TXV');
  };

  const loadStressScenario = (scenario: 'undercharge' | 'dirty_coil' | 'restriction') => {
    if (scenario === 'undercharge') {
      setLiquidPressure(310);
      setLiquidLineTemp(104);
      setSuctionPressure(98);
      setSuctionLineTemp(68);
    } else if (scenario === 'dirty_coil') {
      setLiquidPressure(510);
      setLiquidLineTemp(132);
      setSuctionPressure(136);
      setSuctionLineTemp(58);
    } else if (scenario === 'restriction') {
      setLiquidPressure(445);
      setLiquidLineTemp(98);
      setSuctionPressure(92);
      setSuctionLineTemp(69);
    }
  };

  return (
    <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#243038]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623]">
            <Gauge className="w-4 h-4 text-[#F5A623]" />
            <span>Field Diagnostic Tool #01</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            High-Ambient Desert Heat Load & Charging Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Engineered for Arizona summer extremes (105°F to 122°F). Simulates dynamic P-T response and thermodynamic subcooling/superheat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToHealthyPreset}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#222a30] hover:bg-[#2b353e] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Preset Stress Scenarios */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-mono">Load Real Field Scenarios:</span>
        <button
          onClick={() => loadStressScenario('dirty_coil')}
          className="px-2.5 py-1 bg-[#222a30] hover:bg-amber-950/40 text-amber-300 hover:border-amber-500/50 border border-transparent rounded transition-colors cursor-pointer"
        >
          Dirty 115°F Rooftop Coil
        </button>
        <button
          onClick={() => loadStressScenario('undercharge')}
          className="px-2.5 py-1 bg-[#222a30] hover:bg-rose-950/40 text-rose-300 hover:border-rose-500/50 border border-transparent rounded transition-colors cursor-pointer"
        >
          Evaporator Pin-Hole Leak
        </button>
        <button
          onClick={() => loadStressScenario('restriction')}
          className="px-2.5 py-1 bg-[#222a30] hover:bg-orange-950/40 text-orange-300 hover:border-orange-500/50 border border-transparent rounded transition-colors cursor-pointer"
        >
          Plugged Liquid Drier
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ambient & Indoor Psychrometrics */}
        <div className="space-y-4 bg-[#121619] p-4 rounded-xl border border-[#222a30]">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>Ambient & Psychrometrics</span>
          </h4>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Outdoor Ambient Dry Bulb</span>
              <span className="font-mono text-[#F5A623] font-bold tabular-nums">{ambientTemp}°F</span>
            </div>
            <input
              type="range"
              min="85"
              max="125"
              value={ambientTemp}
              onChange={(e) => setAmbientTemp(Number(e.target.value))}
              className="w-full h-1.5 bg-[#243038] rounded appearance-none cursor-pointer accent-[#F5A623]"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
              <span>85°F Spring</span>
              <span>115°F Phoenix Peak</span>
              <span>125°F Attic/Roof</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Indoor Return DB</label>
              <input
                type="number"
                value={returnDryBulb}
                onChange={(e) => setReturnDryBulb(Number(e.target.value))}
                className="w-full bg-[#181f24] border border-[#2b353e] rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-[#F5A623] outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Indoor Return WB</label>
              <input
                type="number"
                value={returnWetBulb}
                onChange={(e) => setReturnWetBulb(Number(e.target.value))}
                className="w-full bg-[#181f24] border border-[#2b353e] rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-[#F5A623] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Metering Device</label>
              <div className="flex rounded bg-[#181f24] p-0.5 border border-[#2b353e]">
                <button
                  type="button"
                  onClick={() => setMeteringType('TXV')}
                  className={`flex-1 py-1 text-[11px] font-medium rounded transition-colors ${
                    meteringType === 'TXV' ? 'bg-[#F5A623] text-black font-semibold' : 'text-slate-400'
                  }`}
                >
                  TXV / EEV
                </button>
                <button
                  type="button"
                  onClick={() => setMeteringType('Piston')}
                  className={`flex-1 py-1 text-[11px] font-medium rounded transition-colors ${
                    meteringType === 'Piston' ? 'bg-[#F5A623] text-black font-semibold' : 'text-slate-400'
                  }`}
                >
                  Piston
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Refrigerant</label>
              <select
                value={refrigerant}
                onChange={(e) => setRefrigerant(e.target.value as 'R-410A' | 'R-32')}
                className="w-full bg-[#181f24] border border-[#2b353e] rounded px-2 py-1.5 text-xs text-white font-mono focus:border-[#F5A623] outline-none"
              >
                <option value="R-410A">R-410A (Puron)</option>
                <option value="R-32">R-32 (A2L Pure)</option>
              </select>
            </div>
          </div>
        </div>

        {/* High Side (Liquid Line) Readings */}
        <div className="space-y-4 bg-[#121619] p-4 rounded-xl border border-[#222a30]">
          <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>High Side (Liquid Line)</span>
          </h4>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Head / Liquid Pressure</span>
              <span className="font-mono text-rose-400 font-bold tabular-nums">{liquidPressure} psig</span>
            </div>
            <input
              type="range"
              min="200"
              max="580"
              value={liquidPressure}
              onChange={(e) => setLiquidPressure(Number(e.target.value))}
              className="w-full h-1.5 bg-[#243038] rounded appearance-none cursor-pointer accent-rose-500"
            />
            <div className="text-[10px] text-slate-500 font-mono mt-1 flex justify-between">
              <span>Sat Temp: {liquidSatTemp}°F</span>
              <span>Trip Limit: 550+ psig</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Measured Liquid Line Temp (°F)</label>
            <input
              type="number"
              value={liquidLineTemp}
              onChange={(e) => setLiquidLineTemp(Number(e.target.value))}
              className="w-full bg-[#181f24] border border-[#2b353e] rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-rose-500 outline-none"
            />
          </div>

          <div className="p-3 bg-[#181f24] rounded-lg border border-[#243038]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Calculated Subcooling</span>
              <span className="font-mono text-base font-bold text-rose-300 tabular-nums">
                {measuredSubcooling}°F
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Target for TXV: 10°F (± 2°F)
            </div>
          </div>
        </div>

        {/* Low Side (Suction Line) Readings */}
        <div className="space-y-4 bg-[#121619] p-4 rounded-xl border border-[#222a30]">
          <h4 className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <Snowflake className="w-3.5 h-3.5 text-sky-400" />
            <span>Low Side (Suction Line)</span>
          </h4>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Suction / Vapor Pressure</span>
              <span className="font-mono text-sky-400 font-bold tabular-nums">{suctionPressure} psig</span>
            </div>
            <input
              type="range"
              min="60"
              max="170"
              value={suctionPressure}
              onChange={(e) => setSuctionPressure(Number(e.target.value))}
              className="w-full h-1.5 bg-[#243038] rounded appearance-none cursor-pointer accent-sky-400"
            />
            <div className="text-[10px] text-slate-500 font-mono mt-1 flex justify-between">
              <span>Evap Sat: {suctionSatTemp}°F</span>
              <span>Freeze Risk: &lt;100 psig</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Measured Suction Line Temp (°F)</label>
            <input
              type="number"
              value={suctionLineTemp}
              onChange={(e) => setSuctionLineTemp(Number(e.target.value))}
              className="w-full bg-[#181f24] border border-[#2b353e] rounded px-2.5 py-1.5 text-xs text-white font-mono focus:border-sky-400 outline-none"
            />
          </div>

          <div className="p-3 bg-[#181f24] rounded-lg border border-[#243038]">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Calculated Superheat</span>
              <span className="font-mono text-base font-bold text-sky-300 tabular-nums">
                {measuredSuperheat}°F
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {meteringType === 'TXV' ? 'TXV Normal: 8°F to 14°F' : `Formula Target: ${targetSuperheat}°F`}
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Diagnostic Verdict */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl border bg-[#121619] border-[#243038]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {diagnosticStatus === 'Normal' ? (
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-[#F5A623] shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-slate-400">Diagnostic Verdict:</span>
                <span
                  className={`text-sm font-bold ${
                    diagnosticStatus === 'Normal'
                      ? 'text-emerald-400'
                      : diagnosticStatus === 'Dirty Coil'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}
                >
                  {diagnosticStatus.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-mono hidden md:inline">
                  · Condenser Split: +{condenserSplit}°F
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {diagnosticDetails}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono border-t sm:border-t-0 sm:border-l border-[#243038] pt-2 sm:pt-0 sm:pl-4 shrink-0">
            <div>
              <div className="text-slate-500">Method</div>
              <div className="text-white font-bold">{meteringType === 'TXV' ? 'Subcooling Primary' : 'Superheat Chart'}</div>
            </div>
            <div>
              <div className="text-slate-500">CTOE Split</div>
              <div className="text-[#F5A623] font-bold">+{condenserSplit}°F</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
