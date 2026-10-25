import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Bookmark, ExternalLink } from 'lucide-react';
import { FIELD_CHEAT_SHEETS } from '../../data/hvacData';

export const CheatSheetsViewer: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Refrigeration', 'Electrical', 'Airflow', 'Safety & Codes'];

  const filteredSheets = selectedCategory === 'All'
    ? FIELD_CHEAT_SHEETS
    : FIELD_CHEAT_SHEETS.filter(s => s.category === selectedCategory);

  const handleCopy = (sheet: typeof FIELD_CHEAT_SHEETS[0]) => {
    const text = `${sheet.title}\nCategory: ${sheet.category}\n\nFORMULA: ${sheet.quickFormula}\nFIELD STANDARD: ${sheet.fieldStandard}\nARIZONA DESERT TIP: ${sheet.azDesertTip}\n\nDETAILS:\n${sheet.details.map(d => `• ${d}`).join('\n')}\n\nTailor HVAC Services: Road to Journeyman`;
    navigator.clipboard.writeText(text);
    setCopiedId(sheet.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (sheet: typeof FIELD_CHEAT_SHEETS[0]) => {
    const text = `${sheet.title}\nCategory: ${sheet.category}\n\nFORMULA:\n${sheet.quickFormula}\n\nFIELD STANDARD:\n${sheet.fieldStandard}\n\nARIZONA DESERT TIP:\n${sheet.azDesertTip}\n\nDETAILS:\n${sheet.details.map(d => `• ${d}`).join('\n')}\n\nGenerated from Tailor HVAC Services Field Vault`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sheet.id}_${sheet.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccessId(sheet.id);
    setTimeout(() => setDownloadSuccessId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#121619] rounded-lg border border-[#243038]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F5A623] text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredSheets.length} Field Reference Guides
        </div>
      </div>

      {/* Sheet Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSheets.map((sheet) => (
          <div
            key={sheet.id}
            className="bg-[#181f24] border border-[#243038] hover:border-[#384855] rounded-2xl p-6 transition-all shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#243038]">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span className="text-[#F5A623] font-semibold">{sheet.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Field Ref #{sheet.id.toUpperCase()}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(sheet)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-[#222a30] rounded-md transition-colors cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedId === sheet.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDownload(sheet)}
                    className="p-1.5 text-slate-400 hover:text-[#F5A623] hover:bg-[#222a30] rounded-md transition-colors cursor-pointer"
                    title="Download Field Cheat Sheet"
                  >
                    {downloadSuccessId === sheet.id ? (
                      <Check className="w-4 h-4 text-[#F5A623]" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <h4 className="text-base font-bold text-white mt-3 mb-2">
                {sheet.title}
              </h4>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {sheet.summary}
              </p>

              {/* Quick Formula Callout */}
              <div className="p-3 bg-[#121619] rounded-xl border border-[#243038] mb-3">
                <div className="text-[10px] font-mono uppercase text-[#F5A623] font-semibold">
                  Field Formula
                </div>
                <div className="text-xs font-mono font-bold text-white mt-0.5 leading-snug">
                  {sheet.quickFormula}
                </div>
              </div>

              {/* Arizona Desert Pro-Tip */}
              <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-900/40 mb-4">
                <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold flex items-center gap-1">
                  <Bookmark className="w-3 h-3 text-amber-400" />
                  <span>Arizona Desert Rule of Thumb</span>
                </div>
                <div className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  {sheet.azDesertTip}
                </div>
              </div>

              {/* Bullet Details */}
              <ul className="space-y-1.5 text-xs text-slate-300">
                {sheet.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F5A623] font-bold">›</span>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-[#243038] flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">Standard: {sheet.fieldStandard.substring(0, 42)}...</span>
              <button
                onClick={() => handleCopy(sheet)}
                className="text-[#F5A623] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{copiedId === sheet.id ? 'Copied' : 'Quick Copy'}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
