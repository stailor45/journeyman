import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MissionControl } from './components/MissionControl';
import { FieldDiary } from './components/FieldDiary';
import { TechVault } from './components/TechVault';
import { MilestoneTracker } from './components/MilestoneTracker';
import { AboutMission } from './components/AboutMission';
import { AudioPlayer } from './components/AudioPlayer';
import { EPISODES } from './data/hvacData';
import { Episode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'mission-control' | 'field-diary' | 'tech-vault' | 'milestones' | 'about'>('mission-control');
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(EPISODES[0]);
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const handlePlayEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  const handleContactClick = () => {
    setActiveTab('about');
    setTimeout(() => {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#121619] text-slate-100 flex flex-col font-sans selection:bg-[#F5A623] selection:text-black">
      {/* 3-Zone Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onContactClick={handleContactClick}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {activeTab === 'mission-control' && (
          <MissionControl
            latestEpisode={currentEpisode}
            onPlayEpisode={handlePlayEpisode}
            onNavigateTab={setActiveTab}
            onOpenNotes={() => setShowNotesModal(true)}
          />
        )}

        {activeTab === 'field-diary' && (
          <FieldDiary
            onPlayEpisode={handlePlayEpisode}
            currentPlayingId={currentEpisode.id}
          />
        )}

        {activeTab === 'tech-vault' && (
          <TechVault />
        )}

        {activeTab === 'milestones' && (
          <MilestoneTracker />
        )}

        {activeTab === 'about' && (
          <AboutMission contactFormRef={contactRef} />
        )}
      </main>

      {/* Persistent Audio Bar when on tabs other than Mission Control */}
      {activeTab !== 'mission-control' && (
        <aside aria-label="Persistent Audio Stream" className="sticky bottom-0 z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-3 pointer-events-none">
          <div className="pointer-events-auto shadow-2xl">
            <AudioPlayer
              currentEpisode={currentEpisode}
              compact={true}
              onOpenNotes={() => setShowNotesModal(true)}
            />
          </div>
        </aside>
      )}

      {/* Show Notes Global Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#181f24] border border-[#243038] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#243038]">
              <div>
                <div className="text-xs font-mono text-[#F5A623]">
                  EPISODE {currentEpisode.number} SHOW NOTES
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {currentEpisode.title}
                </h3>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-slate-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentEpisode.summary}
            </p>

            <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30]">
              <div className="text-[10px] font-mono uppercase text-[#F5A623] font-semibold mb-2">
                Field Takeaways
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentEpisode.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F5A623] font-bold">›</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Tools: {currentEpisode.toolsMentioned.join(' · ')}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 bg-[#222a30] text-slate-200 hover:text-white text-xs font-medium rounded-lg cursor-pointer"
              >
                Close Show Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Un-slop Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
