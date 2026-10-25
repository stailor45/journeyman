import React, { useState } from 'react';
import { Compass, CheckCircle2, Clock, Award, Shield, FileCheck, Plus, Sparkles } from 'lucide-react';
import { MILESTONES, COMPETENCIES } from '../data/hvacData';
import { Milestone, CompetencySkill } from '../types';

export const MilestoneTracker: React.FC = () => {
  // Hours tracking state (allow simulated hour logging)
  const [totalHours, setTotalHours] = useState<number>(3420);
  const [loggedHoursSuccess, setLoggedHoursSuccess] = useState<string | null>(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');

  const targetHours = 8000;
  const progressPercent = Math.min(100, (totalHours / targetHours) * 100);

  const skillCategories = [
    'All',
    'Electrical & Controls',
    'Refrigeration Cycle',
    'Airflow & Ductwork',
    'Safety & Mechanical'
  ];

  const filteredSkills = activeSkillCategory === 'All'
    ? COMPETENCIES
    : COMPETENCIES.filter(s => s.category === activeSkillCategory);

  const simulateLogHours = (amount: number, label: string) => {
    setTotalHours(prev => prev + amount);
    setLoggedHoursSuccess(`+${amount} hours logged for ${label}!`);
    setTimeout(() => setLoggedHoursSuccess(null), 3000);
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div>
        <div className="text-xs font-mono text-[#F5A623] mb-1">
          CAREER ROADMAP & LOGGED HOURS AUDIT
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Milestone Tracker: Road to Journeyman
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Transparent progression tracking towards the Arizona Registrar of Contractors (ROC) CR-39 / R-39 Journeyman Air Conditioning license benchmark.
        </p>
      </div>

      {/* Main Hours Progress Card */}
      <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#243038]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623] mb-1">
              <Clock className="w-4 h-4 text-[#F5A623]" />
              <span>Verified On-The-Job (OJT) Hours</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tabular-nums">
                {totalHours.toLocaleString()}
              </span>
              <span className="text-xl sm:text-2xl font-mono text-slate-400">
                / {targetHours.toLocaleString()} hrs
              </span>
              <span className="text-sm font-mono text-[#F5A623] font-bold">
                ({progressPercent.toFixed(1)}%)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Based on audited timesheets signed off by Master Mechanical Contractor in Gilbert, AZ.
            </p>
          </div>

          {/* Quick Add Shift Simulator (Interactive tool for potential employers/mentors) */}
          <div className="bg-[#121619] p-4 rounded-xl border border-[#243038] flex flex-col gap-2 shrink-0">
            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Interactive Hours Logger:</span>
              {loggedHoursSuccess && (
                <span className="text-emerald-400 font-bold">{loggedHoursSuccess}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => simulateLogHours(8, 'Commercial RTU Service')}
                className="px-3 py-1.5 text-xs font-medium bg-[#222a30] hover:bg-[#2b353e] text-slate-200 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 text-[#F5A623]" />
                <span>+8h Service Call</span>
              </button>
              <button
                onClick={() => simulateLogHours(4, 'Defrost & Heat Pump Lab')}
                className="px-3 py-1.5 text-xs font-medium bg-[#222a30] hover:bg-[#2b353e] text-slate-200 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 text-[#F5A623]" />
                <span>+4h Lab Training</span>
              </button>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-6">
          <div className="w-full h-3 bg-[#121619] rounded-full overflow-hidden border border-[#222a30]">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-[#F5A623] to-amber-300 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
            <span>0 hrs (NTI Grad)</span>
            <span>2,000 hrs (Apprentice 1)</span>
            <span>4,000 hrs (Midpoint)</span>
            <span>6,000 hrs (Senior Tech)</span>
            <span className="text-[#F5A623] font-bold">8,000 hrs (AZ Journeyman ROC Exam)</span>
          </div>
        </div>

        {/* Hours Breakdown by Category */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30]">
            <div className="text-[10px] font-mono text-slate-400">RESIDENTIAL SERVICE</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">1,480 hrs</div>
            <div className="text-[10px] text-slate-500 mt-1">Split systems, TXVs, capacitors</div>
          </div>
          <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30]">
            <div className="text-[10px] font-mono text-slate-400">COMMERCIAL RTUS</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">720 hrs</div>
            <div className="text-[10px] text-slate-500 mt-1">Packaged units, economizers</div>
          </div>
          <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30]">
            <div className="text-[10px] font-mono text-slate-400">HEAT PUMP REVERSING</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">640 hrs</div>
            <div className="text-[10px] text-slate-500 mt-1">Dual fuel, defrost boards</div>
          </div>
          <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30]">
            <div className="text-[10px] font-mono text-slate-400">BRAZING & EVACUATION</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5 tabular-nums">580 hrs</div>
            <div className="text-[10px] text-slate-500 mt-1">Nitrogen purge, micron pulls</div>
          </div>
        </div>
      </div>

      {/* Career Timeline Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Milestone Chronology
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official licenses, vocational training credentials, and field promotion checkpoints.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l border-[#243038] space-y-8">
          {MILESTONES.map((milestone) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in_progress';

            return (
              <div key={milestone.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-[#121619] border-emerald-400 text-emerald-400'
                      : isInProgress
                      ? 'bg-[#121619] border-[#F5A623] text-[#F5A623]'
                      : 'bg-[#121619] border-slate-600 text-slate-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isInProgress ? (
                    <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  )}
                </div>

                {/* Milestone Card */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isInProgress
                    ? 'bg-[#181f24] border-[#F5A623] shadow-lg shadow-amber-500/5'
                    : 'bg-[#181f24]/70 border-[#243038] hover:border-[#384855]'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#243038]">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className={`font-semibold ${
                        isCompleted ? 'text-emerald-400' : isInProgress ? 'text-[#F5A623]' : 'text-slate-500'
                      }`}>
                        {isCompleted ? 'VERIFIED' : isInProgress ? 'ACTIVE BENCHMARK' : 'TARGET MILESTONE'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{milestone.date}</span>
                    </div>

                    {milestone.credentialId && (
                      <span className="text-[11px] font-mono text-slate-400 bg-[#121619] px-2 py-0.5 rounded border border-[#243038]">
                        ID: {milestone.credentialId}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mt-3">
                    {milestone.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mb-3">
                    {milestone.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  <div className="p-3.5 bg-[#121619] rounded-xl border border-[#222a30]">
                    <div className="text-[10px] font-mono uppercase text-[#F5A623] font-semibold mb-1.5">
                      Core Competency Proof
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {milestone.keyLearnings.map((learning, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#F5A623] font-bold">›</span>
                          <span className="leading-relaxed">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Skill Competency Matrix */}
      <div className="space-y-6 pt-6 border-t border-[#243038]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Skill Competency Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Proficiency levels (1–5) and master contractor sign-offs for field operations.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#181f24] rounded-lg border border-[#243038]">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeSkillCategory === cat
                    ? 'bg-[#F5A623] text-black font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => {
            const levelLabels = ['', 'Novice', 'Apprentice', 'Proficient', 'Advanced', 'Journeyman Ready'];

            return (
              <div
                key={skill.id}
                className="bg-[#181f24] border border-[#243038] rounded-xl p-5 hover:border-[#384855] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#243038] text-xs text-slate-400">
                    <span className="font-mono text-[#F5A623]">{skill.category}</span>
                    <span className="font-mono tabular-nums">{skill.verifiedHours} verified hrs</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-2.5 mb-1.5">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#243038] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">Level {skill.level}/5:</span>
                    <span className="font-bold text-[#F5A623] text-xs font-mono">
                      {levelLabels[skill.level]}
                    </span>
                  </div>

                  {/* Level dots */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-2 flex-1 rounded-sm ${
                          lvl <= skill.level ? 'bg-[#F5A623]' : 'bg-[#243038]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 pt-1 flex items-center justify-between">
                    <span>Sign-off:</span>
                    <span className="text-slate-300">{skill.mentorSignOff}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
