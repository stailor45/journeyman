import React, { useState, useMemo } from 'react';
import { Gauge, Zap, Layers, FileText, ArrowRight, Search, X, Check, Filter, LineChart } from 'lucide-react';
import { HighAmbientCalculator } from './tools/HighAmbientCalculator';
import { SchematicTracer } from './tools/SchematicTracer';
import { RefrigerantAnalyzer } from './tools/RefrigerantAnalyzer';
import { CheatSheetsViewer } from './tools/CheatSheetsViewer';
import { RefrigerantPTChartD3 } from './tools/RefrigerantPTChartD3';

interface TechVaultProps {
  initialTool?: 'calculator' | 'ptchart' | 'schematic' | 'refrigerant' | 'cheatsheets';
}

interface DiagnosticToolItem {
  id: 'calculator' | 'ptchart' | 'schematic' | 'refrigerant' | 'cheatsheets';
  label: string;
  badge: string;
  topic: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  keywords: string[];
  subtopics: string[];
}

export const TechVault: React.FC<TechVaultProps> = ({ initialTool = 'calculator' }) => {
  const [activeTool, setActiveTool] = useState<'calculator' | 'ptchart' | 'schematic' | 'refrigerant' | 'cheatsheets'>(initialTool);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const tools: DiagnosticToolItem[] = [
    {
      id: 'calculator',
      label: 'High-Ambient Calculator',
      badge: '115°F+ Diagnostics',
      topic: 'Refrigeration & Heat Load',
      icon: Gauge,
      description: 'Subcooling & superheat charging simulator for Arizona desert heat and dirty microchannel head pressure analysis.',
      keywords: [
        'subcooling', 'superheat', 'ambient', '115f', '118f', 'desert', 'heat load',
        'ctoe', 'condenser split', 'txv', 'piston', 'fixed orifice', 'head pressure',
        'undercharge', 'overcharge', 'restriction', 'dirty coil', 'microchannel', 'psig'
      ],
      subtopics: [
        'Target Subcooling Calculation (TXV)',
        'Fixed Orifice Target Superheat Formula',
        'Condenser Temperature Over Ambient (CTOE)',
        'Liquid Line Restriction vs Leak Differential'
      ]
    },
    {
      id: 'ptchart',
      label: 'D3 P-T Saturation Chart',
      badge: 'D3 Vector Engine',
      topic: 'Refrigeration & Heat Load',
      icon: LineChart,
      description: 'Interactive D3 saturation curve visualizer for R-410A, R-32, R-454B, R-22, and R-134a with dynamic crosshairs and freeze risk lines.',
      keywords: [
        'd3', 'chart', 'pt curve', 'pressure temperature', 'saturation', 'curve', 'graph',
        'r-410a', 'r-32', 'r-454b', 'r-22', 'r-134a', 'psig', 'hover probe', 'freezing',
        'saturation pressure', 'desert head'
      ],
      subtopics: [
        'D3 Curve Saturation Mapping across 10°F to 140°F',
        'Dynamic Hover Crosshair & Multi-Refrigerant Gauge Probe',
        '32°F Evaporator Freezing Threshold Marker',
        'R-22 vs R-410A High-Ambient Pressure Comparison'
      ]
    },
    {
      id: 'schematic',
      label: '24V Schematic Tracer',
      badge: 'Control Circuit',
      topic: 'Electrical & Controls',
      icon: Zap,
      description: 'Trace R, C, Y1, float switches, and high/low pressure cutouts with live simulated multimeter probe voltage checks.',
      keywords: [
        '24v', 'schematic', 'transformer', 'contactor', 'coil', 'float switch',
        'condensate', 'drain pan', 'high pressure cutout', 'low pressure cutout',
        'hpco', 'lpco', 'multimeter', 'voltage drop', 'short circuit', 'y1', 'r', 'c',
        'thermostat', 'blown fuse', 'reversing valve'
      ],
      subtopics: [
        'Condensate Float Switch Open Circuit Lockout',
        'High-Pressure Cutout (550 psig) Safety Trip',
        'Contactor Solenoid Resistance (14.2 Ω)',
        'Walking the Safety String with Multimeter'
      ]
    },
    {
      id: 'refrigerant',
      label: 'Refrigerant & A2L Analyzer',
      badge: 'R-410A / R-32 / R-454B',
      topic: 'Low-GWP & A2L Safety',
      icon: Layers,
      description: 'Dynamic P-T curves, glide dynamics, and AIM Act low-GWP transition rules comparing R-410A, R-32, and R-454B.',
      keywords: [
        'refrigerant', 'r-410a', 'r-32', 'r-454b', 'a2l', 'glide', 'fractionation',
        'gwp', 'aim act', 'flammable', 'spark-proof', 'pt chart', 'saturation pressure',
        'poe oil', 'critical temp', 'puron', 'puron advance', 'opteon'
      ],
      subtopics: [
        'R-454B 1.5°F Glide & Liquid-Only Charging',
        'R-32 Pure Molecule & High Discharge Heat',
        'A2L Spark-Proof Recovery Machine Mandate',
        'ASHRAE Flammability Lower Flammability Limit (LFL)'
      ]
    },
    {
      id: 'cheatsheets',
      label: 'Field Cheat Sheets',
      badge: '4 Reference Guides',
      topic: 'Field Formulas & Airflow',
      icon: FileText,
      description: 'Quick reference formulas for capacitor under-load testing, static pressure CFM, desert brazing, and A2L protocols.',
      keywords: [
        'capacitor', 'mfd', 'microfarad', 'static pressure', 'tesp', 'cfm',
        'airflow', 'manometer', 'brazing', 'nitrogen purge', 'micron gauge',
        'vacuum decay', 'triple evacuation', 'delta-t', 'formula', 'cheat sheet'
      ],
      subtopics: [
        'Live Run Capacitor MFD Formula ((Amps × 2652) / Volts)',
        'Total External Static Pressure (TESP) 0.50" Standard',
        'Desert Nitrogen Purge (2–5 SCFH) Brazing Rule',
        'Monsoon Delta-T Latent Heat Drop Benchmark'
      ]
    }
  ];

  const topics = [
    'All',
    'Refrigeration & Heat Load',
    'Electrical & Controls',
    'Low-GWP & A2L Safety',
    'Field Formulas & Airflow'
  ];

  const popularKeywords = [
    'Subcooling',
    'D3 P-T Chart',
    '24V Short',
    'Capacitor',
    'R-454B',
    'Float Switch',
    'Static Pressure',
    'Dirty Coil'
  ];

  // Filtering logic
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesTopic = selectedTopic === 'All' || tool.topic === selectedTopic;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesTopic;

      const matchesLabel = tool.label.toLowerCase().includes(q);
      const matchesDescription = tool.description.toLowerCase().includes(q);
      const matchesTopicText = tool.topic.toLowerCase().includes(q);
      const matchesKeywords = tool.keywords.some((kw) => kw.toLowerCase().includes(q));
      const matchesSubtopics = tool.subtopics.some((st) => st.toLowerCase().includes(q));

      return matchesTopic && (matchesLabel || matchesDescription || matchesTopicText || matchesKeywords || matchesSubtopics);
    });
  }, [tools, searchQuery, selectedTopic]);

  const handleSelectTool = (id: 'calculator' | 'ptchart' | 'schematic' | 'refrigerant' | 'cheatsheets') => {
    setActiveTool(id);
    // Smooth scroll down to workbench
    const workbenchEl = document.getElementById('active-workbench-section');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All');
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div>
        <div className="text-xs font-mono text-[#F5A623] mb-1">
          MASTERCLASS & FIELD REFERENCE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Tech Vault
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Interactive engineering models, diagnostic calculators, and field-tested reference cards developed on service calls across Gilbert, Mesa, and Chandler.
        </p>
      </div>

      {/* Search & Topic Filter Section */}
      <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
        {/* Search Bar Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search diagnostics by topic or keyword (e.g. subcooling, capacitor, 24v short, R-454B, float switch, static pressure)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121619] border border-[#243038] hover:border-[#384855] focus:border-[#F5A623] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {(searchQuery || selectedTopic !== 'All') && (
            <button
              onClick={clearFilters}
              className="px-3.5 py-2.5 bg-[#222a30] hover:bg-[#2b353e] text-slate-300 hover:text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Topic Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#F5A623]" /> Topic:
          </span>
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedTopic === topic
                  ? 'bg-[#F5A623] text-black font-semibold shadow-xs'
                  : 'bg-[#121619] text-slate-400 hover:text-white border border-[#243038]'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Quick Suggestion Keywords */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1 text-xs border-t border-[#243038]/70">
          <span className="text-slate-500 font-mono text-[11px]">Quick keywords:</span>
          {popularKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => handleKeywordClick(kw)}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors cursor-pointer ${
                searchQuery.toLowerCase() === kw.toLowerCase()
                  ? 'bg-amber-400/20 text-[#F5A623] font-bold border border-[#F5A623]/40'
                  : 'text-slate-400 hover:text-slate-200 bg-[#121619] hover:bg-[#222a30] border border-[#243038]'
              }`}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Results Status */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
        <div>
          Showing {filteredTools.length} of {tools.length} diagnostic workbenches
          {searchQuery && (
            <span> matching <span className="text-white font-semibold">"{searchQuery}"</span></span>
          )}
          {selectedTopic !== 'All' && (
            <span> in <span className="text-[#F5A623]">{selectedTopic}</span></span>
          )}
        </div>
        {filteredTools.length > 0 && (
          <div className="text-[11px] text-slate-500 hidden sm:block">
            Click any card to load into the active workbench below
          </div>
        )}
      </div>

      {/* Tool Navigation Cards Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            
            // Check if any subtopic matched the search query
            const matchedSubtopics = searchQuery.trim()
              ? tool.subtopics.filter(st => st.toLowerCase().includes(searchQuery.trim().toLowerCase()))
              : [];

            return (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#181f24] border-[#F5A623] shadow-md shadow-amber-500/5 ring-1 ring-[#F5A623]'
                    : 'bg-[#181f24]/70 border-[#243038] hover:border-[#384855] hover:bg-[#181f24]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-[#F5A623] text-black' : 'bg-[#222a30] text-[#F5A623]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {tool.badge}
                    </span>
                  </div>

                  <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                    {tool.label}
                  </div>

                  <div className="text-[11px] font-mono text-[#F5A623] mt-0.5">
                    {tool.topic}
                  </div>

                  <div className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </div>

                  {/* Highlighted matched subtopics if search active */}
                  {matchedSubtopics.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#243038] space-y-1">
                      <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Matches your search:
                      </div>
                      {matchedSubtopics.slice(0, 2).map((st, i) => (
                        <div key={i} className="text-[11px] text-slate-300 font-mono line-clamp-1">
                          › {st}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-[#243038]/60 flex items-center justify-between text-xs font-medium">
                  <span className={isActive ? 'text-[#F5A623] font-semibold' : 'text-slate-400'}>
                    {isActive ? 'Active Workbench' : 'Launch Workbench'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#F5A623]' : 'text-slate-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#222a30] text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6 text-[#F5A623]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">No Diagnostic Cards Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
              No diagnostic tools matched <span className="text-white font-semibold">"{searchQuery}"</span> in the selected topic. Try searching for common field terms like subcooling, capacitor, 24V short, or R-454B.
            </p>
          </div>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-xs font-semibold text-black bg-[#F5A623] hover:bg-[#e0951b] rounded-lg transition-colors cursor-pointer"
          >
            Clear Search & View All Tools
          </button>
        </div>
      )}

      {/* Active Diagnostic Viewport */}
      <div id="active-workbench-section" className="pt-4 transition-all">
        <div className="flex items-center justify-between pb-3 border-b border-[#243038] mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            <span className="text-white font-bold uppercase">
              Current Workbench: {tools.find(t => t.id === activeTool)?.label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  activeTool === t.id
                    ? 'bg-[#2b353e] text-[#F5A623] font-bold border border-[#3b4b57]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {activeTool === 'calculator' && <HighAmbientCalculator />}
        {activeTool === 'ptchart' && <RefrigerantPTChartD3 />}
        {activeTool === 'schematic' && <SchematicTracer />}
        {activeTool === 'refrigerant' && <RefrigerantAnalyzer />}
        {activeTool === 'cheatsheets' && <CheatSheetsViewer />}
      </div>
    </div>
  );
};
