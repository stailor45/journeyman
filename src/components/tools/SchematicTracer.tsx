import React, { useState } from 'react';
import { Zap, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

export const SchematicTracer: React.FC = () => {
  // Circuit States
  const [callForCool, setCallForCool] = useState<boolean>(true);
  const [floatSwitchOpen, setFloatSwitchOpen] = useState<boolean>(false);
  const [highPressureOpen, setHighPressureOpen] = useState<boolean>(false);
  const [lowPressureOpen, setLowPressureOpen] = useState<boolean>(false);
  const [contactorCoilGood, setContactorCoilGood] = useState<boolean>(true);
  const [reversingValveEnergized, setReversingValveEnergized] = useState<boolean>(false); // O terminal
  const [indoorFanCall, setIndoorFanCall] = useState<boolean>(true); // G terminal

  // Voltage drop & current flow logic
  const isPowerAvailable = true; // Transformer 24VAC R terminal
  const isY1Energized = isPowerAvailable && callForCool;
  const isThroughFloat = isY1Energized && !floatSwitchOpen;
  const isThroughHP = isThroughFloat && !highPressureOpen;
  const isThroughLP = isThroughHP && !lowPressureOpen;
  const isContactorEnergized = isThroughLP && contactorCoilGood;

  // Voltage checks relative to Common (C)
  const voltageR = 24.2;
  const voltageY_Thermostat = callForCool ? 24.1 : 0.0;
  const voltageAfterFloat = isThroughFloat ? 24.0 : (isY1Energized && floatSwitchOpen ? 0.0 : 0.0);
  const voltageAfterHP = isThroughHP ? 23.9 : (isThroughFloat && highPressureOpen ? 0.0 : 0.0);
  const voltageAfterLP = isThroughLP ? 23.8 : (isThroughHP && lowPressureOpen ? 0.0 : 0.0);
  const voltageContactorTerminal = isContactorEnergized ? 23.8 : 0.0;

  const resetAll = () => {
    setCallForCool(true);
    setFloatSwitchOpen(false);
    setHighPressureOpen(false);
    setLowPressureOpen(false);
    setContactorCoilGood(true);
    setReversingValveEnergized(false);
    setIndoorFanCall(true);
  };

  return (
    <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#243038]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623]">
            <Zap className="w-4 h-4 text-[#F5A623]" />
            <span>Field Diagnostic Tool #02</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            24V Split System Control Schematic & Safety Tracer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Interactive trace of the 24VAC control circuit. Toggle thermostat calls, safety switches, and coil faults to simulate digital multimeter readings.
          </p>
        </div>

        <button
          onClick={resetAll}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#222a30] hover:bg-[#2b353e] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Switches</span>
        </button>
      </div>

      {/* Switch Toggles Toolbar */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <button
          onClick={() => setCallForCool(!callForCool)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
            callForCool
              ? 'bg-[#222a30] border-[#F5A623] text-white'
              : 'bg-[#121619] border-[#2b353e] text-slate-400'
          }`}
        >
          <div className="text-[10px] font-mono text-[#F5A623]">STAT (Y1)</div>
          <div className="font-semibold">{callForCool ? 'Cooling Call ON' : 'Thermostat OFF'}</div>
        </button>

        <button
          onClick={() => setFloatSwitchOpen(!floatSwitchOpen)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
            floatSwitchOpen
              ? 'bg-rose-950/40 border-rose-500 text-rose-200'
              : 'bg-[#121619] border-[#2b353e] text-slate-300'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">FLOAT SWITCH</div>
          <div className="font-semibold">{floatSwitchOpen ? 'TRIPPED (Open)' : 'Normal (Closed)'}</div>
        </button>

        <button
          onClick={() => setHighPressureOpen(!highPressureOpen)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
            highPressureOpen
              ? 'bg-rose-950/40 border-rose-500 text-rose-200'
              : 'bg-[#121619] border-[#2b353e] text-slate-300'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">HP CUTOUT (550#)</div>
          <div className="font-semibold">{highPressureOpen ? 'TRIPPED (Open)' : 'Normal (Closed)'}</div>
        </button>

        <button
          onClick={() => setLowPressureOpen(!lowPressureOpen)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
            lowPressureOpen
              ? 'bg-rose-950/40 border-rose-500 text-rose-200'
              : 'bg-[#121619] border-[#2b353e] text-slate-300'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">LP CUTOUT (25#)</div>
          <div className="font-semibold">{lowPressureOpen ? 'TRIPPED (Open)' : 'Normal (Closed)'}</div>
        </button>

        <button
          onClick={() => setContactorCoilGood(!contactorCoilGood)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
            !contactorCoilGood
              ? 'bg-rose-950/40 border-rose-500 text-rose-200'
              : 'bg-[#121619] border-[#2b353e] text-slate-300'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">CONTACTOR COIL</div>
          <div className="font-semibold">{contactorCoilGood ? '14.2 Ω (Healthy)' : 'OPEN / Burned'}</div>
        </button>

        <button
          onClick={() => setReversingValveEnergized(!reversingValveEnergized)}
          className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
            reversingValveEnergized
              ? 'bg-amber-950/30 border-amber-500 text-amber-200'
              : 'bg-[#121619] border-[#2b353e] text-slate-300'
          }`}
        >
          <div className="text-[10px] font-mono text-slate-400">REV VALVE (O)</div>
          <div className="font-semibold">{reversingValveEnergized ? 'Energized (Cool)' : 'De-energized'}</div>
        </button>
      </div>

      {/* Visual Schematic Diagram Canvas */}
      <div className="mt-6 bg-[#0f1316] border border-[#243038] rounded-xl p-5 overflow-x-auto">
        <div className="min-w-[720px] text-xs font-mono relative">
          {/* Header Legend */}
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-4 pb-2 border-b border-[#222a30]">
            <span>TRANSFORMER 240V : 24VAC (40VA)</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-[#F5A623] inline-block" /> 24VAC Hot (Energized)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-slate-600 inline-block" /> De-energized Wire
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-1 bg-sky-500 inline-block" /> 24VAC Common (C)
              </span>
            </span>
          </div>

          {/* Schematic Nodes Flow */}
          <div className="grid grid-cols-7 gap-2 items-center text-center py-4">
            {/* Step 1: Transformer R */}
            <div className="p-3 bg-[#181f24] rounded border border-amber-500/60 shadow-xs">
              <div className="text-[#F5A623] font-bold text-sm">24V (R)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Transformer Hot</div>
              <div className="mt-2 text-[11px] font-bold text-amber-400 tabular-nums">{voltageR} VAC</div>
            </div>

            {/* Wire link */}
            <div className="h-0.5 bg-[#F5A623] relative flex items-center justify-center">
              <span className="text-[9px] bg-[#0f1316] px-1 text-slate-400">RED</span>
            </div>

            {/* Step 2: Thermostat Y1 */}
            <div className={`p-3 rounded border transition-colors ${
              callForCool ? 'bg-[#181f24] border-amber-500/60' : 'bg-[#121619] border-slate-700 opacity-60'
            }`}>
              <div className="text-sm font-bold text-white">STAT (Y1)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{callForCool ? 'Call Active' : 'Idle'}</div>
              <div className="mt-2 text-[11px] font-bold text-amber-400 tabular-nums">{voltageY_Thermostat} VAC</div>
            </div>

            {/* Wire link */}
            <div className={`h-0.5 relative flex items-center justify-center ${
              isY1Energized ? 'bg-[#F5A623]' : 'bg-slate-700'
            }`}>
              <span className="text-[9px] bg-[#0f1316] px-1 text-slate-400">YEL</span>
            </div>

            {/* Step 3: Condensate Float Switch */}
            <div className={`p-3 rounded border transition-colors ${
              floatSwitchOpen ? 'bg-rose-950/40 border-rose-500' : isThroughFloat ? 'bg-[#181f24] border-amber-500/60' : 'bg-[#121619] border-slate-700'
            }`}>
              <div className="text-sm font-bold text-white">FLOAT SW</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{floatSwitchOpen ? 'OPEN (Water)' : 'CLOSED (OK)'}</div>
              <div className="mt-2 text-[11px] font-bold text-amber-400 tabular-nums">{voltageAfterFloat} VAC</div>
            </div>

            {/* Wire link */}
            <div className={`h-0.5 relative flex items-center justify-center ${
              isThroughFloat ? 'bg-[#F5A623]' : 'bg-slate-700'
            }`}>
              <span className="text-[9px] bg-[#0f1316] px-1 text-slate-400">WIRE</span>
            </div>

            {/* Step 4: High Pressure Switch */}
            <div className={`p-3 rounded border transition-colors ${
              highPressureOpen ? 'bg-rose-950/40 border-rose-500' : isThroughHP ? 'bg-[#181f24] border-amber-500/60' : 'bg-[#121619] border-slate-700'
            }`}>
              <div className="text-sm font-bold text-white">HP CUTOUT</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{highPressureOpen ? 'TRIP (&gt;550#)' : 'CLOSED (OK)'}</div>
              <div className="mt-2 text-[11px] font-bold text-amber-400 tabular-nums">{voltageAfterHP} VAC</div>
            </div>
          </div>

          {/* Lower Row: LP Switch, Contactor Coil & Common */}
          <div className="grid grid-cols-7 gap-2 items-center text-center py-4 border-t border-[#222a30]">
            <div className="col-span-2 text-left text-slate-400 text-xs pl-2">
              <span className="text-white font-semibold block">Outdoor Condenser Cabinet:</span>
              <span>Compressor & Condenser Fan Control</span>
            </div>

            {/* LP Cutout */}
            <div className={`p-3 rounded border transition-colors ${
              lowPressureOpen ? 'bg-rose-950/40 border-rose-500' : isThroughLP ? 'bg-[#181f24] border-amber-500/60' : 'bg-[#121619] border-slate-700'
            }`}>
              <div className="text-sm font-bold text-white">LP CUTOUT</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{lowPressureOpen ? 'TRIP (&lt;25#)' : 'CLOSED (OK)'}</div>
              <div className="mt-2 text-[11px] font-bold text-amber-400 tabular-nums">{voltageAfterLP} VAC</div>
            </div>

            {/* Wire */}
            <div className={`h-0.5 relative flex items-center justify-center ${
              isThroughLP ? 'bg-[#F5A623]' : 'bg-slate-700'
            }`}>
              <span className="text-[9px] bg-[#0f1316] px-1 text-slate-400">COIL+</span>
            </div>

            {/* Contactor Coil */}
            <div className={`p-3 rounded border transition-colors ${
              isContactorEnergized
                ? 'bg-amber-950/40 border-[#F5A623] shadow-md shadow-amber-500/10'
                : 'bg-[#121619] border-slate-700'
            }`}>
              <div className="text-sm font-bold text-white">CONTACTOR</div>
              <div className="text-[10px] mt-0.5 font-bold">
                {isContactorEnergized ? (
                  <span className="text-emerald-400">PULLED IN (RUN)</span>
                ) : (
                  <span className="text-rose-400">DISENGAGED</span>
                )}
              </div>
              <div className="mt-2 text-[11px] font-bold text-amber-400 tabular-nums">{voltageContactorTerminal} VAC</div>
            </div>

            {/* Return Wire */}
            <div className="h-0.5 bg-sky-600 relative flex items-center justify-center">
              <span className="text-[9px] bg-[#0f1316] px-1 text-sky-400">COM (C)</span>
            </div>

            {/* Common Terminal */}
            <div className="p-3 bg-[#181f24] rounded border border-sky-500/60">
              <div className="text-sky-400 font-bold text-sm">24V (C)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Transformer Common</div>
              <div className="mt-2 text-[11px] font-bold text-sky-400 tabular-nums">0.0 VAC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multimeter Probing Masterclass Explanation */}
      <div className="mt-5 p-4 rounded-xl bg-[#121619] border border-[#243038] text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#222a30] rounded-lg text-[#F5A623] shrink-0 mt-0.5">
            {isContactorEnergized ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-[#F5A623]" />}
          </div>
          <div>
            <div className="font-bold text-white text-sm">
              {isContactorEnergized
                ? 'Circuit Intact: Contactor Engaged, 240V Line Voltage Closing to Compressor & Fan.'
                : 'Circuit Interrupted: Contactor Open (Outdoor Unit Stopped).'}
            </div>
            <div className="text-slate-300 mt-1 leading-relaxed">
              {floatSwitchOpen && '• Condensate drain pan backed up: Attic float switch opened the Y1 control wire to protect ceiling drywall. Clear sludge line with nitrogen blowgun.'}
              {highPressureOpen && '• High-pressure cutoff tripped: Arizona high ambient + dirty condenser microchannels exceeded 550 psig safety limit. Wash coil and check fan motor capacitor.'}
              {lowPressureOpen && '• Low-pressure cutout open: Pressure below 25 psig indicates catastrophic refrigerant leak or iced indoor evaporator coil.'}
              {!contactorCoilGood && '• Contactor solenoid open circuit: Multimeter shows 24VAC across coil terminals, but magnetic armature does not pull in due to melted magnet wire.'}
              {isContactorEnergized && '• Probing tip: When tracing in the field, keep black multimeter probe clamped to Common (C) at the outdoor terminal block. Walk red probe backwards along the safety string.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
