import React, { useState } from 'react';
import { Search, Radio, Play, FileText, CheckCircle2, Wrench, X, Share2, Bookmark } from 'lucide-react';
import { EPISODES } from '../data/hvacData';
import { Episode } from '../types';

interface FieldDiaryProps {
  onPlayEpisode: (episode: Episode) => void;
  currentPlayingId?: string;
}

export const FieldDiary: React.FC<FieldDiaryProps> = ({ onPlayEpisode, currentPlayingId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalEpisode, setActiveModalEpisode] = useState<Episode | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    'All',
    'Service Calls & Realities',
    'Flat-Rate vs. Hourly',
    'Tool Reviews',
    'Arizona Climate Challenges'
  ];

  const filteredEpisodes = EPISODES.filter((ep) => {
    const matchesCategory = selectedCategory === 'All' || ep.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.toolsMentioned.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ep.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleShare = (ep: Episode) => {
    const shareText = `Tailor HVAC Field Diary - Ep. ${ep.number}: ${ep.title}`;
    if (navigator.share) {
      navigator.share({ title: shareText, text: ep.summary, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div>
        <div className="text-xs font-mono text-[#F5A623] mb-1">
          EPISODIC FIELD DIARY & TECHNICAL LOGS
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Field Diary
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Unvarnished, boots-on-the-ground technical logs, podcast discussions, and service call post-mortems documenting trade school graduation to journeyman qualification in the Arizona desert.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Buttons (Functional Tabs per Section 1A) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#181f24] rounded-lg border border-[#243038] overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#F5A623] text-black font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search calls, tools, symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181f24] border border-[#243038] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#F5A623]"
          />
        </div>
      </div>

      {/* Episode Results Count */}
      <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
        <span>Showing {filteredEpisodes.length} episodes</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#F5A623] hover:underline cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEpisodes.map((episode) => {
          const isCurrentlyPlaying = currentPlayingId === episode.id;

          return (
            <div
              key={episode.id}
              className={`bg-[#181f24] border rounded-2xl p-6 transition-all shadow-md flex flex-col justify-between ${
                isCurrentlyPlaying
                  ? 'border-[#F5A623] ring-1 ring-[#F5A623] bg-[#181f24]'
                  : 'border-[#243038] hover:border-[#384855]'
              }`}
            >
              <div>
                {/* Clean unboxed metadata row (Zero-Pill discipline) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#243038] text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#F5A623] font-mono">EP. {episode.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{episode.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{episode.duration}</span>
                  </div>
                  <div className="text-slate-400 font-medium">
                    {episode.category}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mt-3 mb-2 leading-snug">
                  {episode.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3">
                  {episode.summary}
                </p>

                {/* Key Takeaways Checklist Preview */}
                <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30] mb-4 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-[#F5A623] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>Field Takeaways</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {episode.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#F5A623] font-bold">›</span>
                        <span className="line-clamp-2 leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Mentioned (Clean unboxed tags) */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mb-4">
                  <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-[#F5A623]" /> Tools:
                  </span>
                  {episode.toolsMentioned.map((tool, idx) => (
                    <span key={idx} className="font-mono text-[11px] text-slate-300">
                      {tool}{idx < episode.toolsMentioned.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 border-t border-[#243038] flex items-center justify-between gap-3">
                <button
                  onClick={() => onPlayEpisode(episode)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-transform active:scale-95 cursor-pointer ${
                    isCurrentlyPlaying
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                      : 'bg-[#F5A623] text-black hover:bg-[#e0951b]'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>{isCurrentlyPlaying ? 'Now Playing' : 'Play Episode'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalEpisode(episode)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#222a30] hover:bg-[#2b353e] hover:text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Show Notes</span>
                  </button>

                  <button
                    onClick={() => handleShare(episode)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-[#222a30] rounded-lg transition-colors cursor-pointer"
                    title="Share episode"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Episode Detail Modal (Full Show Notes & Transcript Excerpt) */}
      {activeModalEpisode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181f24] border border-[#243038] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalEpisode(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-[#222a30] rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pb-4 border-b border-[#243038] pr-10">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <Radio className="w-4 h-4 text-[#F5A623]" />
                <span className="text-[#F5A623] font-bold">FIELD DIARY EPISODE {activeModalEpisode.number}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModalEpisode.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeModalEpisode.duration}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {activeModalEpisode.title}
              </h2>
              {activeModalEpisode.ambientConditions && (
                <div className="text-xs text-amber-300 font-mono mt-1">
                  Ambient Test Conditions: {activeModalEpisode.ambientConditions}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-[#F5A623] font-semibold mb-2">
                  Episode Synopsis
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeModalEpisode.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#F5A623] font-semibold mb-2">
                  Key Technical Takeaways
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 bg-[#121619] p-4 rounded-xl border border-[#222a30]">
                  {activeModalEpisode.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#F5A623] font-bold mt-0.5">›</span>
                      <span className="leading-relaxed">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#F5A623] font-semibold mb-2">
                  Equipment & Diagnostic Gear Mentioned
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalEpisode.toolsMentioned.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#121619] border border-[#243038] rounded-md text-xs font-mono text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#F5A623] font-semibold mb-2">
                  Verbatim Field Audio Excerpt
                </h4>
                <div className="p-4 bg-[#121619] rounded-xl border border-[#222a30] text-xs font-mono text-slate-300 italic leading-relaxed">
                  "{activeModalEpisode.transcriptExcerpt}"
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-[#243038] flex items-center justify-between">
              <button
                onClick={() => {
                  onPlayEpisode(activeModalEpisode);
                  setActiveModalEpisode(null);
                }}
                className="px-4 py-2 bg-[#F5A623] text-black font-semibold text-xs rounded-lg hover:bg-[#e0951b] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Play in Field Audio Stream</span>
              </button>

              <button
                onClick={() => setActiveModalEpisode(null)}
                className="px-4 py-2 bg-[#222a30] text-slate-300 hover:text-white text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
