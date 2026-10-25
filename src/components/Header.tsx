import React, { useState } from 'react';
import { Menu, X, Radio, Wrench, Compass, User, Zap } from 'lucide-react';

interface HeaderProps {
  activeTab: 'mission-control' | 'field-diary' | 'tech-vault' | 'milestones' | 'about';
  setActiveTab: (tab: 'mission-control' | 'field-diary' | 'tech-vault' | 'milestones' | 'about') => void;
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onContactClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'mission-control' as const, label: 'Mission Control', icon: Zap },
    { id: 'field-diary' as const, label: 'Field Diary', icon: Radio },
    { id: 'tech-vault' as const, label: 'Tech Vault', icon: Wrench },
    { id: 'milestones' as const, label: 'Milestone Tracker', icon: Compass },
    { id: 'about' as const, label: 'About & Mission', icon: User },
  ];

  const handleNav = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#121619]/90 backdrop-blur-md border-b border-[#243038]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNav('mission-control')}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white hover:text-[#F5A623] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 bg-[#F5A623] rounded-xs inline-block" />
            <span>Tailor HVAC <span className="font-light text-slate-400 text-sm hidden sm:inline">· Road to Journeyman</span></span>
          </button>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                    isActive
                      ? 'text-[#F5A623] font-semibold border-b-2 border-[#F5A623]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-black bg-[#F5A623] hover:bg-[#e0951b] active:scale-[0.98] rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              Connect & Inquiries
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-[#1e252b] rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#243038] bg-[#181f24] px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-black bg-[#F5A623] font-semibold'
                    : 'text-slate-200 hover:bg-[#222a30]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#243038]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-black bg-[#F5A623] hover:bg-[#e0951b] rounded-md transition-colors"
            >
              Connect & Inquiries
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
