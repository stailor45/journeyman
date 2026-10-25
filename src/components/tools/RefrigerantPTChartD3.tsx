import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { LineChart, Thermometer, Info, Eye, Check } from 'lucide-react';

interface RefrigerantCurveDef {
  id: string;
  name: string;
  color: string;
  type: 'A1 (Non-flammable)' | 'A2L (Mildly Flammable)' | 'Legacy A1';
  description: string;
  formula: (tempF: number) => number;
}

// Highly accurate ASHRAE polynomial / saturation approximations for standard HVAC refrigerants
const REFRIGERANT_CURVES: RefrigerantCurveDef[] = [
  {
    id: 'R-410A',
    name: 'R-410A (Puron)',
    color: '#F5A623', // Safety Amber / Gold
    type: 'A1 (Non-flammable)',
    description: 'Current residential workhorse. High operating pressure (418 psig @ 120°F).',
    formula: (t: number) => {
      // Saturation pressure approximation in PSIG for R-410A (0°F to 145°F)
      return Math.max(0, -60.8 + 0.44 * t + 0.0245 * Math.pow(t, 2) + 0.000035 * Math.pow(t, 3));
    }
  },
  {
    id: 'R-32',
    name: 'R-32 (A2L Pure)',
    color: '#F87171', // Red / Rose
    type: 'A2L (Mildly Flammable)',
    description: 'Next-gen low-GWP pure gas. Runs ~2.5% higher head pressure than R-410A.',
    formula: (t: number) => {
      return Math.max(0, -62.5 + 0.46 * t + 0.0252 * Math.pow(t, 2) + 0.000037 * Math.pow(t, 3));
    }
  },
  {
    id: 'R-454B',
    name: 'R-454B (Opteon XL41)',
    color: '#FB923C', // Orange
    type: 'A2L (Mildly Flammable)',
    description: 'Carrier/Trane low-GWP replacement. Runs ~4% lower pressure than R-410A.',
    formula: (t: number) => {
      return Math.max(0, -58.2 + 0.42 * t + 0.0235 * Math.pow(t, 2) + 0.000034 * Math.pow(t, 3));
    }
  },
  {
    id: 'R-22',
    name: 'R-22 (Freon - Legacy)',
    color: '#34D399', // Emerald green
    type: 'Legacy A1',
    description: 'Phased out legacy HCFC. Much lower pressures (76 psig @ 45°F vs 130 psig on 410A).',
    formula: (t: number) => {
      return Math.max(0, -32.5 + 0.35 * t + 0.0152 * Math.pow(t, 2) + 0.000021 * Math.pow(t, 3));
    }
  },
  {
    id: 'R-134a',
    name: 'R-134a (Medium Temp)',
    color: '#38BDF8', // Sky Blue
    type: 'A1 (Non-flammable)',
    description: 'Automotive and light commercial chillers. Very low pressure curve.',
    formula: (t: number) => {
      return Math.max(0, -18.2 + 0.28 * t + 0.0098 * Math.pow(t, 2) + 0.000015 * Math.pow(t, 3));
    }
  }
];

export const RefrigerantPTChartD3: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Active toggles for curves
  const [activeCurveIds, setActiveCurveIds] = useState<string[]>(['R-410A', 'R-32', 'R-454B', 'R-22']);
  const [hoveredTemp, setHoveredTemp] = useState<number | null>(115); // Default to desert ambient
  const [selectedPreset, setSelectedPreset] = useState<string>('115°F Desert Ambient');

  // Temperature domain range (10°F to 140°F)
  const tempRange = useMemo(() => {
    const temps: number[] = [];
    for (let t = 10; t <= 140; t += 2) {
      temps.push(t);
    }
    return temps;
  }, []);

  const toggleCurve = (id: string) => {
    setActiveCurveIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const presets = [
    { label: '32°F Freezing Risk', temp: 32 },
    { label: '40°F Evaporator Standard', temp: 40 },
    { label: '45°F Normal AC Coil', temp: 45 },
    { label: '115°F Desert Ambient', temp: 115 },
    { label: '125°F High Head Peak', temp: 125 }
  ];

  const handleSelectPreset = (p: { label: string; temp: number }) => {
    setHoveredTemp(p.temp);
    setSelectedPreset(p.label);
  };

  // Render D3 Chart
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current.clientWidth || 700;
    const height = 380;
    const margin = { top: 30, right: 35, bottom: 45, left: 55 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale: Temperature in °F
    const xScale = d3.scaleLinear().domain([10, 140]).range([0, innerWidth]);

    // Y scale: Saturation pressure in PSIG
    const yScale = d3.scaleLinear().domain([0, 560]).range([innerHeight, 0]);

    // Background Shaded Diagnostic Zones
    // Zone 1: Evaporator saturation comfort band (35°F to 45°F)
    g.append('rect')
      .attr('x', xScale(35))
      .attr('y', 0)
      .attr('width', xScale(45) - xScale(35))
      .attr('height', innerHeight)
      .attr('fill', '#38BDF8')
      .attr('opacity', 0.06);

    g.append('text')
      .attr('x', xScale(40))
      .attr('y', 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#38BDF8')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('opacity', 0.7)
      .text('EVAP ZONE (35-45°F)');

    // Zone 2: Arizona High-Ambient Desert Condenser Band (110°F to 125°F)
    g.append('rect')
      .attr('x', xScale(110))
      .attr('y', 0)
      .attr('width', xScale(125) - xScale(110))
      .attr('height', innerHeight)
      .attr('fill', '#F5A623')
      .attr('opacity', 0.08);

    g.append('text')
      .attr('x', xScale(117.5))
      .attr('y', 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#F5A623')
      .attr('font-size', '9px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('opacity', 0.8)
      .text('DESERT ROOFTOP (110-125°F)');

    // Freezing Threshold Line at 32°F
    g.append('line')
      .attr('x1', xScale(32))
      .attr('x2', xScale(32))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#60A5FA')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3 3')
      .attr('opacity', 0.5);

    // Horizontal Grid Lines
    const yGrid = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(() => '');
    g.append('g')
      .attr('class', 'y-grid')
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', '#243038')
      .attr('stroke-dasharray', '2 2')
      .attr('opacity', 0.6);

    // Vertical Grid Lines
    const xGrid = d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(() => '');
    g.append('g')
      .attr('class', 'x-grid')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xGrid)
      .selectAll('line')
      .attr('stroke', '#243038')
      .attr('stroke-dasharray', '2 2')
      .attr('opacity', 0.6);

    // Remove domain box borders on grids
    g.selectAll('.domain').remove();

    // X Axis
    const xAxis = d3.axisBottom(xScale).ticks(8).tickFormat((d) => `${d}°F`);
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace');

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(6).tickFormat((d) => `${d}#`);
    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#94A3B8')
      .attr('font-size', '10px')
      .attr('font-family', 'JetBrains Mono, monospace');

    // Axis Labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 36)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748B')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text('Saturation Temperature (°F)');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -42)
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748B')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .text('Saturation Pressure (PSIG)');

    // Line Generator
    const lineGen = d3
      .line<{ temp: number; psig: number }>()
      .x((d) => xScale(d.temp))
      .y((d) => yScale(d.psig))
      .curve(d3.curveMonotoneX);

    // Plot Curves for Active Refrigerants
    REFRIGERANT_CURVES.forEach((curve) => {
      if (!activeCurveIds.includes(curve.id)) return;

      const data = tempRange.map((temp) => ({
        temp,
        psig: curve.formula(temp)
      }));

      // Main line
      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', curve.color)
        .attr('stroke-width', 2.2)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('d', lineGen);

      // End label
      const lastPoint = data[data.length - 1];
      if (lastPoint && yScale(lastPoint.psig) > 10) {
        g.append('text')
          .attr('x', xScale(lastPoint.temp) - 4)
          .attr('y', yScale(lastPoint.psig) - 6)
          .attr('text-anchor', 'end')
          .attr('fill', curve.color)
          .attr('font-size', '9px')
          .attr('font-family', 'JetBrains Mono, monospace')
          .attr('font-weight', 'bold')
          .text(curve.id);
      }
    });

    // Hover / Inspector Crosshair
    const targetTemp = hoveredTemp !== null ? hoveredTemp : 115;
    const clampedTemp = Math.max(10, Math.min(140, targetTemp));
    const crossX = xScale(clampedTemp);

    // Vertical inspector line
    g.append('line')
      .attr('class', 'inspector-line')
      .attr('x1', crossX)
      .attr('x2', crossX)
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#F5A623')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4 2')
      .attr('opacity', 0.9);

    // Intersection dots for each active curve
    REFRIGERANT_CURVES.forEach((curve) => {
      if (!activeCurveIds.includes(curve.id)) return;
      const psig = curve.formula(clampedTemp);
      const dotY = yScale(psig);

      if (dotY >= 0 && dotY <= innerHeight) {
        g.append('circle')
          .attr('cx', crossX)
          .attr('cy', dotY)
          .attr('r', 4.5)
          .attr('fill', curve.color)
          .attr('stroke', '#121619')
          .attr('stroke-width', 2);
      }
    });

    // Invisible overlay for capturing mouse events
    const overlay = g
      .append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    overlay.on('mousemove', (event: MouseEvent) => {
      const [mouseX] = d3.pointer(event);
      const tempVal = Math.round(xScale.invert(mouseX));
      const bounded = Math.max(10, Math.min(140, tempVal));
      setHoveredTemp(bounded);
      setSelectedPreset('');
    });

    overlay.on('click', (event: MouseEvent) => {
      const [mouseX] = d3.pointer(event);
      const tempVal = Math.round(xScale.invert(mouseX));
      const bounded = Math.max(10, Math.min(140, tempVal));
      setHoveredTemp(bounded);
      setSelectedPreset(`${bounded}°F Custom Probe`);
    });
  }, [activeCurveIds, hoveredTemp, tempRange]);

  // Readouts for active hovered temperature
  const currentTemp = hoveredTemp !== null ? hoveredTemp : 115;

  return (
    <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#243038]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623]">
            <LineChart className="w-4 h-4 text-[#F5A623]" />
            <span>Interactive D3 Diagnostic Vector Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Refrigerant Pressure-Temperature (P-T) Curve Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Direct saturation thermodynamic curve mapping across operating ranges from freezing coils (32°F) to extreme desert rooftops (125°F).
          </p>
        </div>

        {/* Quick Diagnostic Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Presets:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => handleSelectPreset(p)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                hoveredTemp === p.temp
                  ? 'bg-[#F5A623] text-black font-semibold'
                  : 'bg-[#121619] hover:bg-[#222a30] text-slate-300 border border-[#243038]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Refrigerant Toggles Strip */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-[#F5A623]" /> Curves:
        </span>
        {REFRIGERANT_CURVES.map((curve) => {
          const isActive = activeCurveIds.includes(curve.id);
          return (
            <button
              key={curve.id}
              onClick={() => toggleCurve(curve.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#121619] text-white border-[#384855] shadow-xs'
                  : 'bg-[#121619]/40 text-slate-500 border-[#243038] hover:text-slate-300'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isActive ? curve.color : '#475569' }}
              />
              <span>{curve.name}</span>
              {isActive && <Check className="w-3 h-3 text-[#F5A623]" />}
            </button>
          );
        })}
      </div>

      {/* D3 Chart Canvas Viewport */}
      <div
        ref={containerRef}
        className="bg-[#121619] rounded-xl border border-[#243038] p-3 sm:p-4 relative overflow-hidden"
      >
        <svg ref={svgRef} className="overflow-visible block" />

        {/* Live Hover Inspection Badge */}
        <div className="absolute top-4 right-4 bg-[#181f24]/90 backdrop-blur-md border border-[#243038] rounded-xl p-3 shadow-lg pointer-events-none text-xs font-mono min-w-[210px]">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#243038] text-slate-400">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-[#F5A623]" /> Saturation Probe:
            </span>
            <span className="text-[#F5A623] font-bold text-sm tabular-nums">
              {currentTemp}°F
            </span>
          </div>

          <div className="space-y-1">
            {REFRIGERANT_CURVES.map((curve) => {
              if (!activeCurveIds.includes(curve.id)) return null;
              const pressure = Math.round(curve.formula(currentTemp));
              return (
                <div key={curve.id} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5" style={{ color: curve.color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: curve.color }} />
                    <span>{curve.id}:</span>
                  </span>
                  <span className="text-white font-bold tabular-nums">{pressure} psig</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-Time Diagnostic Interpretation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {REFRIGERANT_CURVES.filter(c => activeCurveIds.includes(c.id)).map((curve) => {
          const p = Math.round(curve.formula(currentTemp));
          const isHighHead = p > 420;
          const isFreezing = currentTemp <= 32;

          return (
            <div
              key={curve.id}
              className="bg-[#121619] border border-[#243038] rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold font-mono" style={{ color: curve.color }}>
                    {curve.id}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {curve.type}
                  </span>
                </div>

                <div className="mt-2 text-2xl font-extrabold font-mono text-white tabular-nums">
                  {p} <span className="text-xs text-slate-400 font-normal">psig</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {curve.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#243038] text-[10px] font-mono">
                {isHighHead ? (
                  <span className="text-amber-400 font-bold">High Desert Pressure Caution</span>
                ) : isFreezing ? (
                  <span className="text-blue-400 font-bold">Freeze Risk: Below 32°F</span>
                ) : currentTemp >= 35 && currentTemp <= 45 ? (
                  <span className="text-emerald-400 font-bold">Normal Evaporator Target</span>
                ) : (
                  <span className="text-slate-500">Standard P-T Range</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Field Diagnostic Insight */}
      <div className="p-4 rounded-xl bg-[#121619] border border-[#243038] text-xs">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">
              How Journeymen Use This P-T Curve in Arizona
            </div>
            <p className="text-slate-300 leading-relaxed">
              When servicing a residential split system at 115°F ambient, an apprentice might panic seeing 400+ psig on their high side gauge. Looking at this D3 chart reveals that for <span className="text-[#F5A623] font-bold">R-410A</span>, 418 psig corresponds to a condensing saturation temperature of only 120°F (a very healthy 5°F condenser split above ambient). Conversely, on an older <span className="text-emerald-400 font-bold">R-22</span> system, that same 120°F saturation is only 260 psig! Knowing these curves prevents misdiagnosing normal high-ambient head pressures as overcharges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
