import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert, Award, Wrench, ExternalLink } from 'lucide-react';

interface AboutMissionProps {
  contactFormRef?: React.RefObject<HTMLDivElement | null>;
}

export const AboutMission: React.FC<AboutMissionProps> = ({ contactFormRef }) => {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Employer / Journeyman Opportunity',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const toolLoadout = [
    {
      category: 'Diagnostic & Manifold',
      name: 'Fieldpiece Job Link JL3PR Wireless Probes',
      purpose: 'Live suction/liquid pressures, saturation temps, and wireless psychrometric WB/DB indoor-outdoor sync.'
    },
    {
      category: 'Electrical Testing',
      name: 'Fluke 116 / 323 HVAC Multimeter & Amp Clamp',
      purpose: 'True-RMS voltage, microfarad capacitor testing, flame sensor microamps (µA), and compressor start/run amps.'
    },
    {
      category: 'Evacuation & Recovery',
      name: 'NAVAC NP4DP 4 CFM Dual-Stage Vacuum Pump',
      purpose: 'Spark-proof A2L rated pump paired with Appion 1/2" evacuation hose and dual core removal tools.'
    },
    {
      category: 'Leak Detection',
      name: 'Fieldpiece DR82 Heated Diode & Infrared',
      purpose: 'Detects R-410A, R-32, and R-454B down to 0.03 oz/yr with zero false alarms from desert dust.'
    },
    {
      category: 'Fabrication & Brazing',
      name: 'Hilmor Compact Swage Tool & Oxy-Acetylene Kit',
      purpose: 'Expanding copper joints to eliminate coupling leaks during continuous 3-5 SCFH nitrogen purge.'
    },
    {
      category: 'Tool Carrier & Organization',
      name: 'Veto Pro Pac Tech Pac & TP-XL Diagnostic Bag',
      purpose: 'Dedicated rapid-grab diagnostic packout ensuring quick attic climbing and rooftop ladder safety.'
    }
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Bio & Mission Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="text-xs font-mono text-[#F5A623] mb-1">
              THE TECHNICIAN & THE MISSION
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Master Craftsmanship in the High-Ambient Desert
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F5A623]" /> Gilbert, Arizona
              </span>
              <span aria-hidden="true">·</span>
              <span>NTI Graduate (Honors)</span>
              <span aria-hidden="true">·</span>
              <span>EPA Universal Section 608</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#F5A623]">3,420 Verified Field Hours</span>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              I founded this platform to openly document my transition from vocational trade school at National Technical Institute (NTI) to a fully licensed, master-level HVAC Journeyman in the Phoenix East Valley. In Arizona, heating and air conditioning is not a luxury—it is life support. When ambient temperatures surpass 115°F in Gilbert and attic spaces soar past 140°F, mechanical systems are pushed beyond ordinary engineering limits.
            </p>
            <p>
              Early in my apprenticeship, I saw two divergent paths in our industry: the high-pressure commission sales track where technicians are incentivized to sell capacitors and condemn systems that merely needed a thorough wash and thermal adjustment, versus the craftsman track where true root cause diagnosis, electrical schematic tracing, and mechanical precision take precedence.
            </p>
            <p>
              I chose the craftsman track. By sharing real field calls, tool performance, and technical teardowns on the Field Diary and Tech Vault, this portfolio serves as an open, audited record of my competence, work ethic, and dedication for potential master mentors, contracting partners, and prospective employers.
            </p>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-[#181f24] rounded-xl border border-[#243038]">
              <div className="text-[#F5A623] font-bold text-sm mb-1 font-mono">01. Precision First</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero guesswork. Testing subcooling, superheat, static pressure, and motor windings to OEM tolerances before making a recommendation.
              </p>
            </div>
            <div className="p-4 bg-[#181f24] rounded-xl border border-[#243038]">
              <div className="text-[#F5A623] font-bold text-sm mb-1 font-mono">02. Radical Transparency</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Customer and employer honesty. Providing digital manifold data logs and electrical meter photos on every single service ticket.
              </p>
            </div>
            <div className="p-4 bg-[#181f24] rounded-xl border border-[#243038]">
              <div className="text-[#F5A623] font-bold text-sm mb-1 font-mono">03. Lifelong Learning</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Staying at the forefront of the 2025/2026 EPA low-GWP transitions (A2L refrigerants R-454B & R-32) and inverter variable-capacity systems.
              </p>
            </div>
          </div>
        </div>

        {/* Credentials Summary Card */}
        <div className="lg:col-span-4 bg-[#181f24] border border-[#243038] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#243038]">
            <div className="w-12 h-12 rounded-xl bg-[#222a30] border border-[#2b353e] flex items-center justify-center text-[#F5A623] font-bold text-lg font-mono">
              TH
            </div>
            <div>
              <div className="text-sm font-bold text-white">Tailor HVAC Services</div>
              <div className="text-xs text-slate-400 font-mono">Gilbert · Mesa · Chandler, AZ</div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#243038]">
              <span className="text-slate-400">Education</span>
              <span className="text-white font-medium text-right">NTI HVAC Tech Diploma (Honors)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#243038]">
              <span className="text-slate-400">Certification</span>
              <span className="text-emerald-400 font-medium font-mono text-right">EPA 608 Universal + A2L</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#243038]">
              <span className="text-slate-400">Safety</span>
              <span className="text-white font-medium text-right">OSHA 10 Construction Safety</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#243038]">
              <span className="text-slate-400">Active Role</span>
              <span className="text-[#F5A623] font-medium text-right">Van Lead / Senior Apprentice</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Target License</span>
              <span className="text-white font-medium text-right">AZ ROC CR-39 Journeyman</span>
            </div>
          </div>

          <div className="p-3.5 bg-[#121619] rounded-xl border border-[#243038] text-xs">
            <div className="font-semibold text-white mb-1">Mentor / Employer Openings</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Actively seeking senior journeyman mentorship and progressive commercial/residential contractor connections aligned with master-grade workmanship.
            </p>
          </div>
        </div>
      </div>

      {/* Field Loadout Showcase */}
      <div className="space-y-6 pt-6 border-t border-[#243038]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Wrench className="w-5 h-5 text-[#F5A623]" />
            <span>Field Tool Loadout & Instruments</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personal equipment invested in to ensure zero-compromise diagnostic accuracy and job-site efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolLoadout.map((tool, idx) => (
            <div
              key={idx}
              className="bg-[#181f24] border border-[#243038] rounded-xl p-5 hover:border-[#384855] transition-all"
            >
              <div className="text-[10px] font-mono text-[#F5A623] uppercase mb-1">
                {tool.category}
              </div>
              <h4 className="text-sm font-bold text-white mb-2">
                {tool.name}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tool.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Inquiries Section */}
      <div
        ref={contactFormRef}
        id="contact-section"
        className="bg-[#181f24] border border-[#243038] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
      >
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-[#F5A623] mb-1">
            DIRECT INQUIRY & MENTORSHIP
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Connect with Tailor HVAC Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Interested in discussing technical opportunities, apprentice sponsorship, podcast guest appearances, or technical field consultations in the Phoenix East Valley?
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#121619] border border-emerald-500/50 rounded-xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Transmitted Successfully</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out. Your inquiry has been routed to my personal field email (stailor45@gmail.com). I typically respond between evening service call debriefs.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', organization: '', inquiryType: 'Employer / Journeyman Opportunity', message: '' });
              }}
              className="px-4 py-2 text-xs font-semibold text-black bg-[#F5A623] hover:bg-[#e0951b] rounded-lg transition-colors cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-[#F5A623]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Contractor Dave Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#121619] border border-[#2b353e] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address <span className="text-[#F5A623]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@contracting.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#121619] border border-[#2b353e] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Company / Shop / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Valley Mechanical Contracting"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-[#121619] border border-[#2b353e] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full bg-[#121619] border border-[#2b353e] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="Employer / Journeyman Opportunity">Employer / Journeyman Opportunity</option>
                  <option value="Master Contractor Mentorship">Master Contractor Mentorship</option>
                  <option value="Field Diary Podcast Guest / Topic">Field Diary Podcast Guest / Topic</option>
                  <option value="HVAC Technical Field Consultation">HVAC Technical Field Consultation</option>
                  <option value="Trade School Student Question">Trade School Student Question</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Message / Details <span className="text-[#F5A623]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share project scope, apprenticeship proposal, or topic feedback..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#121619] border border-[#2b353e] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5A623] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-xs font-semibold text-black bg-[#F5A623] hover:bg-[#e0951b] active:scale-[0.98] rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
            >
              {loading ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Field Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
