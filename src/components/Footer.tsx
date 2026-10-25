import React from 'react';
import { Shield, MapPin, Radio, Wrench, Compass, User } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'mission-control' | 'field-diary' | 'tech-vault' | 'milestones' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#0f1316] border-t border-[#243038] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#243038]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight">
              <span className="w-2.5 h-2.5 bg-[#F5A623] rounded-xs inline-block" />
              <span>Tailor HVAC Services: Road to Journeyman</span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Open-source trade progression portfolio and diagnostic masterclass documenting the transition from trade school apprentice to master-level HVAC Journeyman.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigateTab('mission-control')}
              className="text-slate-300 hover:text-[#F5A623] transition-colors cursor-pointer"
            >
              Mission Control
            </button>
            <button
              onClick={() => onNavigateTab('field-diary')}
              className="text-slate-300 hover:text-[#F5A623] transition-colors cursor-pointer"
            >
              Field Diary
            </button>
            <button
              onClick={() => onNavigateTab('tech-vault')}
              className="text-slate-300 hover:text-[#F5A623] transition-colors cursor-pointer"
            >
              Tech Vault
            </button>
            <button
              onClick={() => onNavigateTab('milestones')}
              className="text-slate-300 hover:text-[#F5A623] transition-colors cursor-pointer"
            >
              Milestone Tracker
            </button>
            <button
              onClick={() => onNavigateTab('about')}
              className="text-slate-300 hover:text-[#F5A623] transition-colors cursor-pointer"
            >
              About & Mission
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-[#F5A623]" /> Gilbert · Mesa · Chandler, Arizona
            </span>
            <span aria-hidden="true">·</span>
            <span>EPA Section 608 Universal (#084291-UNI)</span>
            <span aria-hidden="true">·</span>
            <span>NTI Honors Graduate</span>
          </div>

          <div>
            © {new Date().getFullYear()} Tailor HVAC Services. Built for trade craftsmanship and mentor review.
          </div>
        </div>
      </div>
    </footer>
  );
};
