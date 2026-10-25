import { Episode, Milestone, CompetencySkill, FieldCheatSheet } from '../types';

export const EPISODES: Episode[] = [
  {
    id: 'ep-16',
    number: 16,
    title: '118°F Rooftop Condenser Burnout: Gilbert Commercial RTU Breakdown',
    category: 'Arizona Climate Challenges',
    date: 'Oct 20, 2026',
    duration: '42:15',
    durationSeconds: 2535,
    summary: 'A 10-ton Carrier rooftop unit in Gilbert tripped thermal overload in the afternoon heat. Step-by-step diagnostic on why head pressures spike past 500 psig when ambient hits 118°F and how coil micro-channel fouling multiplies the thermal load.',
    keyTakeaways: [
      'In ambient conditions above 115°F, normal subcooling targets shift: always verify against OEM charging charts, not rule-of-thumb 10°F.',
      'Surface wash vs chemical split: Acid cleaners on coated microchannel coils will ruin aluminum bond lines in high-heat desert environments.',
      'Compressor motor winding megohmmeter check: Testing phase-to-ground resistance before condemning the scroll assembly.'
    ],
    toolsMentioned: ['Fieldpiece SMAN480V', 'Fluke 116 HVAC Multimeter', 'Nu-Calgon Cal-Brite', 'Yellow Jacket Quick Couplers'],
    tags: ['Commercial RTU', '118°F Ambient', 'Carrier', 'Head Pressure', 'High Temperature'],
    transcriptExcerpt: "When you climb that ladder at 2 PM in Gilbert, the metal deck of the roof is sitting at 155°F. You cannot touch copper with bare skin. The suction line will still sweat, but that liquid line is sizzling. If you don't calculate your CTOE (Condenser Temperature Over Ambient), you will misdiagnose an undercharge as a restriction...",
    ambientConditions: '118°F Dry Bulb / 18% RH / Rooftop Surface 154°F'
  },
  {
    id: 'ep-15',
    number: 15,
    title: 'Why I Turned Down 100% Commission: Flat-Rate vs Hourly in Arizona',
    category: 'Flat-Rate vs. Hourly',
    date: 'Oct 08, 2026',
    duration: '36:40',
    durationSeconds: 2200,
    summary: 'A deep discussion on ethical craftsmanship vs sales quotas. How high-pressure commission shops push hard starts and capacitor upsells during summer panics, and why true journeyman training requires an hourly base focused on root cause analysis.',
    keyTakeaways: [
      'Hourly pay protects your diagnostics: Taking 45 minutes to trace a thermostat short instead of replacing a whole board just to hit ticket quota.',
      'How to evaluate shop pay structures: Base wage + tool stipend vs high commission with clawback policies.',
      'Why the Arizona market has high customer distrust and how transparent video diagnostics builds long-term client retention.'
    ],
    toolsMentioned: ['Thermal Imager', 'Client Reporting Tablet', 'Veto Pro Pac TP-XL'],
    tags: ['Career Advice', 'Apprenticeship Ethics', 'Hourly Wage', 'Sales Pressure', 'Mentorship'],
    transcriptExcerpt: "During July in the Valley, homeowners are desperate. Their house is 89 degrees at 9 PM and they have kids. Some companies train techs to be sales closers first. I chose to stay on an honest hourly path because I want to be a master mechanic who can fix what others condemn...",
    ambientConditions: '109°F Dry Bulb / 24% RH'
  },
  {
    id: 'ep-14',
    number: 14,
    title: 'Fieldpiece Wireless Joblink vs Testo Smart Probes in 120° Attic Heat',
    category: 'Tool Reviews',
    date: 'Sep 24, 2026',
    duration: '28:50',
    durationSeconds: 1730,
    summary: 'Real-world torture test of wireless Bluetooth refrigerant and psychrometric probes. Comparing range through tile roofs and stucco walls, battery longevity in extreme radiant heat, and zero-refrigerant-loss hose connectors.',
    keyTakeaways: [
      'Wireless psychrometers eliminate attic trips: reading return dry/wet bulb downstairs while adjusting charge on the roof simultaneously.',
      'Lithium vs Alkaline in high heat: alkaline batteries swell and leak inside probe casings when attic ambient exceeds 130°F.',
      'Zero loss fittings preserve critical fractional-ounce charges on mini-splits and critical charge systems.'
    ],
    toolsMentioned: ['Fieldpiece JL3PR Job Link', 'Testo 550i', 'Appion Vacuum Rated Valve Core Removal Tools', 'Energizer Ultimate Lithium'],
    tags: ['Tool Review', 'Fieldpiece', 'Wireless Probes', 'Attic Heat', 'Psychrometrics'],
    transcriptExcerpt: "If your tool stops transmitting because the Bluetooth transmitter is cooking inside a 135° attic in Queen Creek, you are dead in the water. We tested the Fieldpiece Joblink vs Testo probes over 40 hours of peak heat calls...",
    ambientConditions: '114°F Outdoor / 138°F Attic Ambient'
  },
  {
    id: 'ep-13',
    number: 13,
    title: 'Thermal Expansion Valves Failing in Low-Humidity Extremes',
    category: 'Arizona Climate Challenges',
    date: 'Sep 10, 2026',
    duration: '45:12',
    durationSeconds: 2712,
    summary: 'Diagnosing sticking and hunting TXVs in dry desert climates. Why power element charge loss mimics an undercharge, and how improper sensing bulb insulation ruins superheat stability during rapid monsoon humidity shifts.',
    keyTakeaways: [
      'Always check sensing bulb location: 4 or 8 o’clock orientation on horizontal suction lines, clean copper contact, and vapor-proof foam insulation.',
      'The "warm water cup" TXV test: Testing valve reaction live without opening the sealed system.',
      'Moisture and acid breakdown in high discharge lines: Why POE oil hydro-thermal breakdown leads to waxed needles in expansion orifices.'
    ],
    toolsMentioned: ['Supco Clamp Meter', 'Sporlan TXV Tool', 'Hilmor Tubing Cutter', 'Cooper-Atkins Thermocouple'],
    tags: ['TXV Diagnostics', 'Refrigerant', 'Superheat', 'Sensing Bulb', 'Desert Humidity'],
    transcriptExcerpt: "In Arizona, return air humidity can drop under 20% in June and jump to 60% overnight during a dust storm monsoon. When latent heat load doubles in hours, a faulty TXV that was barely getting by will instantly freeze an evaporator coil...",
    ambientConditions: '106°F Outdoor / Monsoon RH Spike 58%'
  },
  {
    id: 'ep-12',
    number: 12,
    title: 'First Service Van Setup: What Actually Survived Month One',
    category: 'Tool Reviews',
    date: 'Aug 28, 2026',
    duration: '39:18',
    durationSeconds: 2358,
    summary: 'Touring my first assigned Ford Transit service van. Unvarnished breakdown of Packout drawer configurations, nitrogen tank transport brackets, recovery station ergonomics, and the tools I bought that I never use vs the ones that saved my skin.',
    keyTakeaways: [
      'Secure your nitrogen bottle with a certified crash-rated cradle: never rely on standard bungee cords.',
      'Capacitor and contactor bin organization saves 15 minutes per call when running 7 calls a day.',
      'Keeping gallon jugs of potable ice water in a secondary cooler is as essential as any gauge on a 115° day.'
    ],
    toolsMentioned: ['Milwaukee Packout Drawers', 'NAVAC NP4DP Vacuum Pump', 'Appion G5 Twin', 'Veto Pro Pac MB2'],
    tags: ['Van Tour', 'First Van', 'Apprentice Kit', 'Organization', 'Packout'],
    transcriptExcerpt: "Getting the keys to your own van is the biggest milestone after trade school. Suddenly you have no senior tech in the passenger seat. If you don't have the 45/5 MFD dual run capacitor in your drawer at 7 PM on a Saturday, you're driving 30 miles to the shop...",
    ambientConditions: '112°F Dry Bulb'
  },
  {
    id: 'ep-11',
    number: 11,
    title: 'Tracing a Phantom 24V Short on a Trane Variable-Speed Air Handler',
    category: 'Service Calls & Realities',
    date: 'Aug 14, 2026',
    duration: '34:05',
    durationSeconds: 2045,
    summary: 'A low-voltage 3-amp blade fuse kept blowing intermittently. How a resettable Lil Popper breaker, an ammeter clamp, and inspecting attic rodent chew marks solved a multi-day callback that stumped two prior technicians.',
    keyTakeaways: [
      'Stop burning 3-amp fuses: Use a resettable thermal breaker tool like the Lil Popper while troubleshooting shorts.',
      'Isolate circuit legs systematically: Disconnect thermostat wires at the air handler strip and jumper individually (R to G, R to Y, R to W).',
      'Vibration chafing on sheet metal edges: Always use snap bushings and wire loom where control bundles pass through knockouts.'
    ],
    toolsMentioned: ['Lil Popper 3A Resettable Breaker', 'Klein Non-Contact Voltage Tester', 'Wire Strippers', 'Heat Shrink Kit'],
    tags: ['Electrical', '24V Control', 'Short Circuit', 'Troubleshooting', 'Trane'],
    transcriptExcerpt: "Callbacks are where apprentices learn humility. A homeowner is frustrated when the AC cut out again 4 hours after you left. By systematically dividing the thermostat cable from the outdoor contactor wire, we found copper wire rubbed raw against the condenser louvers...",
    ambientConditions: '115°F Dry Bulb'
  },
  {
    id: 'ep-10',
    number: 10,
    title: 'Passing EPA Universal First Try: NTI Study Method & A2L Transition',
    category: 'Service Calls & Realities',
    date: 'Jul 29, 2026',
    duration: '31:20',
    durationSeconds: 1880,
    summary: 'My comprehensive study regimen at National Technical Institute (NTI) for EPA Section 608 Universal (Core, Type I, Type II, Type III) plus the newest 2025/2026 EPA rules on mildly flammable A2L refrigerants like R-454B and R-32.',
    keyTakeaways: [
      'The memory tricks for evacuation levels: 0 inches for small appliances, 10-15 inches for Type II depending on recovery equipment date.',
      'A2L safety protocols: Left-handed reverse thread fittings on tanks, spark-proof recovery machines, and combustible gas leak detectors.',
      'The difference between trade school theory and real van recovery: Why pulling through valve cores takes 3x longer than core-removed setups.'
    ],
    toolsMentioned: ['Fieldpiece DR82 Leak Detector', 'Accutools BluVac+ Micron Gauge', 'A2L Certified Recovery Machine'],
    tags: ['EPA 608', 'NTI School', 'A2L Refrigerants', 'Certification', 'Study Guide'],
    transcriptExcerpt: "EPA Universal is your golden ticket. Without it, you cannot even legally buy a jug of 410A. But with the low-GWP transitions taking effect, the exam now covers flammable A2L handling. Here is how I aced all four sections with a 96% average...",
    ambientConditions: '110°F Dry Bulb'
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    title: 'NTI HVAC Technician Diploma (Honors)',
    subtitle: 'National Technical Institute · Phoenix/East Valley Campus',
    date: 'October 2024',
    status: 'completed',
    category: 'education',
    credentialId: 'NTI-HVAC-2024-HNR',
    description: 'Completed 800 hours of intensive hands-on lab training covering residential split systems, heat pumps, gas furnaces, electrical schematics, and mechanical diagnostic instrumentation.',
    keyLearnings: [
      'Ohm’s law, transformer sizing, relay logic, and motor capacitors in practical fault boards.',
      'Oxy-acetylene & stay-brite 8 silver brazing with nitrogen flow purge.',
      'Psychrometric chart mastery: enthalpy, sensible vs latent heat ratios, and CFM calculations.'
    ]
  },
  {
    id: 'm-2',
    title: 'EPA Section 608 Universal Certification',
    subtitle: 'EPA Federal Clean Air Act · Esco Institute Accredited',
    date: 'December 2024',
    status: 'completed',
    category: 'certification',
    credentialId: 'EPA-UNIVERSAL-#084291-UNI',
    description: 'Certified to maintain, service, repair, and dispose of all Type I (small appliances), Type II (high & very high pressure systems), and Type III (low pressure chillers), plus A2L low-GWP refrigerant handling safety endorsement.',
    keyLearnings: [
      'Vapor vs liquid refrigerant recovery and tank 80% tare weight safety regulations.',
      'Micron level pull-down thresholds (500 micron standard + decay test verification).',
      'A2L mildly flammable safety codes (ASHRAE 15 & 34 compliance).'
    ]
  },
  {
    id: 'm-3',
    title: 'OSHA 10 Construction Safety & Confined Spaces',
    subtitle: 'OSHA Workplace Safety Standards',
    date: 'January 2025',
    status: 'completed',
    category: 'certification',
    credentialId: 'OSHA-10-CONST-91428',
    description: 'Specialized training for rooftop tie-offs, heat stress management in 120°F+ attic spaces, arc-flash electrical safety, and ladder safety on two-story residential homes.',
    keyLearnings: [
      'Heat illness prevention: Wet Bulb Globe Temperature (WBGT) work-rest cycles.',
      'Lockout/Tagout (LOTO) protocols for 208/240V condenser disconnects.',
      'Attic platform load bearing and harness anchor safety.'
    ]
  },
  {
    id: 'm-4',
    title: 'First Solo Service Van Outfitting & Lead Tech',
    subtitle: 'Tailor HVAC Fleet · East Valley Territory',
    date: 'May 2025',
    status: 'completed',
    category: 'field_work',
    hoursContributed: 1600,
    description: 'Transitioned from ride-along apprentice to dedicated service vehicle lead. Fully customized van inventory, recovery gear, wireless manifold probes, and stock parts to maintain a 92% first-time fix rate.',
    keyLearnings: [
      'Parts inventory optimization for emergency evening calls during summer peaks.',
      'Customer communication: explaining complex electrical failures with plain-spoken clarity.',
      'Independent troubleshooting workflow without relying on master phone calls.'
    ]
  },
  {
    id: 'm-5',
    title: 'Level 3 Senior Apprentice / Diagnostic Specialist',
    subtitle: 'Active Milestone · 3,420 On-The-Job Verified Hours',
    date: 'Current (2026)',
    status: 'in_progress',
    category: 'field_work',
    hoursContributed: 3420,
    description: 'Handling complex diagnostics: inverter variable-speed heat pumps (Daikin/Mitsubishi/Bosch), commercial economizer setups, static pressure duct re-engineering, and refrigerant conversions.',
    keyLearnings: [
      'Inverter board DC bus voltage and optical sensor troubleshooting.',
      'Total External Static Pressure (TESP) diagnostics and duct static drops.',
      'Mentoring junior NTI apprentices on their first field rotations.'
    ]
  },
  {
    id: 'm-6',
    title: 'Arizona ROC Journeyman License Benchmark',
    subtitle: 'Target Benchmark · Arizona Registrar of Contractors (CR-39 / R-39)',
    date: 'Target: Late 2027',
    status: 'upcoming',
    category: 'journeyman',
    hoursContributed: 8000,
    description: 'Final benchmark: accumulating 8,000 verified hours under a master mechanical contractor, passing the Arizona Trade and Business Management examination, and achieving full Master Journeyman license status.',
    keyLearnings: [
      'Uniform Mechanical Code (UMC) and International Mechanical Code (IMC) compliance.',
      'Commercial load calculations (Manual J, Manual S, Manual D).',
      'Advanced psychrometric system commissioning and air balancing.'
    ]
  }
];

export const COMPETENCIES: CompetencySkill[] = [
  {
    id: 'c-1',
    category: 'Electrical & Controls',
    name: '24V Control Circuit & Safety Switch Tracing',
    level: 5,
    description: 'Mastery in diagnosing transformers, contactors, relays, condensate float switches, high/low pressure cutoffs, and ECM blower control logic.',
    verifiedHours: 780,
    mentorSignOff: 'Master Tech J. Miller (ROC #281942)'
  },
  {
    id: 'c-2',
    category: 'Electrical & Controls',
    name: 'Single & 3-Phase Compressor Diagnostics',
    level: 4,
    description: 'Start/run winding resistance, locked rotor amp (LRA) vs running load amp (RLA) testing, hard start kit sizing, and capacitor under-load testing.',
    verifiedHours: 620,
    mentorSignOff: 'Master Tech J. Miller (ROC #281942)'
  },
  {
    id: 'c-3',
    category: 'Electrical & Controls',
    name: 'Inverter / Variable-Capacity DC Drives',
    level: 3,
    description: 'Diagnosing ECM motors, inverter IPM modules, DC bus capacitors, and electronic expansion valve (EEV) step-motor pulses.',
    verifiedHours: 340,
    mentorSignOff: 'Field Supervisor D. Vance'
  },
  {
    id: 'c-4',
    category: 'Refrigeration Cycle',
    name: 'Subcooling & Superheat In High-Ambient (115°F+)',
    level: 5,
    description: 'Dynamic charge adjustment for TXV and fixed metering under low indoor RH desert conditions. Condenser split calculations.',
    verifiedHours: 850,
    mentorSignOff: 'Master Tech J. Miller (ROC #281942)'
  },
  {
    id: 'c-5',
    category: 'Refrigeration Cycle',
    name: 'Nitrogen Purge Brazing & Triple Evacuation',
    level: 5,
    description: 'Strict 2–5 SCFH dry nitrogen purge to eliminate internal copper scaling. Pulling down to <300 microns with decay test validation under 500 microns.',
    verifiedHours: 510,
    mentorSignOff: 'Master Tech J. Miller (ROC #281942)'
  },
  {
    id: 'c-6',
    category: 'Refrigeration Cycle',
    name: 'Heat Pump Reversing Valve & Defrost Controls',
    level: 4,
    description: 'Diagnosing stuck slider valves, pilot tube differential pressures, defrost sensors, and dual fuel fossil fuel kit interlocks.',
    verifiedHours: 420,
    mentorSignOff: 'Field Supervisor D. Vance'
  },
  {
    id: 'c-7',
    category: 'Airflow & Ductwork',
    name: 'Total External Static Pressure (TESP) Testing',
    level: 4,
    description: 'Using dual-port digital manometers, static pressure tips, filter pressure drops, and evaporator coil wet pressure drop against fan blower tables.',
    verifiedHours: 390,
    mentorSignOff: 'Lead Quality Inspector M. Ruiz'
  },
  {
    id: 'c-8',
    category: 'Airflow & Ductwork',
    name: 'Desert Attic Duct Sealing & R-8 Insulation',
    level: 4,
    description: 'Mastic sealing plenum takeoffs, repairing flex duct kinks in tight 140°F attic spaces, balancing supply branch dampers.',
    verifiedHours: 310,
    mentorSignOff: 'Lead Quality Inspector M. Ruiz'
  },
  {
    id: 'c-9',
    category: 'Safety & Mechanical',
    name: 'EPA Section 608 & A2L Low-GWP Handling',
    level: 5,
    description: 'Universal recovery protocols, reverse thread A2L cylinders, intrinsically safe leak detectors, and certified reclamation records.',
    verifiedHours: 480,
    mentorSignOff: 'Master Tech J. Miller (ROC #281942)'
  },
  {
    id: 'c-10',
    category: 'Safety & Mechanical',
    name: 'Commercial Rooftop Rigging & Economizers',
    level: 3,
    description: 'Curb adapter checks, RTU belt tensioning, barometric relief dampers, and enthalpy sensor calibration for free cooling.',
    verifiedHours: 290,
    mentorSignOff: 'Commercial Field Foreman K. Larson'
  }
];

export const FIELD_CHEAT_SHEETS: FieldCheatSheet[] = [
  {
    id: 'cs-1',
    title: 'High-Ambient Desert Subcooling & Superheat Guide',
    category: 'Refrigeration',
    summary: 'Essential target benchmarks when servicing residential & light commercial systems in ambient temperatures between 105°F and 122°F.',
    quickFormula: 'Target Subcooling = OEM Data Plate (Typ. 10°F to 12°F) · Condenser Delta-T = 18°F to 25°F above ambient',
    fieldStandard: 'For TXV: Charge strictly by Subcooling. For Fixed Orifice: Calculate Target Superheat = [(3 × Indoor WB) - Outdoor DB - 80] / 2',
    azDesertTip: 'In Arizona desert heat (115°F ambient), never charge a TXV system when indoor temp is 90°F+. The coil is severely overloaded. Let system pull down before fine-tuning final ounces.',
    details: [
      'Normal High-Ambient Liquid Pressure (R-410A): 375 to 480 psig at 110°F–118°F ambient.',
      'Suction Pressure Range: 118 to 142 psig (evap saturation temp 40°F–50°F).',
      'If Subcooling is high (>15°F) AND Superheat is high (>25°F): You have a liquid line restriction (clogged filter drier or plugged TXV screen).',
      'If Subcooling is low (<4°F) AND Superheat is high (>25°F): You have an undercharge / refrigerant leak.'
    ]
  },
  {
    id: 'cs-2',
    title: 'Dual-Run Capacitor & Motor Windings Benchmarks',
    category: 'Electrical',
    summary: 'Quick field testing formulas for run capacitors under voltage load and compressor motor winding resistance diagnostics.',
    quickFormula: 'Live MFD = (Compressor Amps on Start Wire × 2652) / Voltage across Run to Start Terminals (VCAP)',
    fieldStandard: 'Tolerances are strictly ±5% or ±6% from stamped rating. A 45 MFD capacitor below 42.3 MFD must be replaced.',
    azDesertTip: 'Attic and outdoor metal cabinet heat cook capacitors faster in Arizona than anywhere in the nation. Always check under-load MFD while compressor is running, not just with multimeter unpowered.',
    details: [
      'Single-phase motor resistance rule: Common-to-Start (CS) + Common-to-Run (CR) MUST equal Run-to-Start (RS).',
      'Megohmmeter insulation resistance: > 100 Megaohms = Excellent; 20 to 100 = Acceptable; < 20 Megaohms = Acid/moisture degradation in oil; < 1 Megaohm = Grounded motor.',
      'Contactor inspection: If contacts are pitted or chattered, coil draw spikes and contacts will weld during Arizona high-amp starts.'
    ]
  },
  {
    id: 'cs-3',
    title: 'Airflow CFM & Static Pressure Diagnostic Rule',
    category: 'Airflow',
    summary: 'Evaluating whether low Delta-T is caused by refrigerant problems or duct restriction using Total External Static Pressure (TESP).',
    quickFormula: 'CFM = 400 CFM per nominal ton (e.g. 5-Ton = 2,000 CFM) · Desert dry climate benchmark: 425–450 CFM/Ton',
    fieldStandard: 'Maximum recommended TESP for standard residential air handlers: 0.50 in. w.g. (PSC motor) or 0.80 in. w.g. (ECM variable speed).',
    azDesertTip: 'Many Arizona tract homes have undersized return grilles with 1-inch cheap fiberglass filters replaced with high-MERV pleated filters, spiking return static to 0.65 in. w.g. and suffocating the coil.',
    details: [
      'Supply static probe placed after air handler heat pack and before duct splitter.',
      'Return static probe placed in plenum between filter and blower inlet.',
      'Evaporator Delta-T standard: 18°F to 22°F across coil when indoor RH is 20–30% (desert standard). During monsoon (50% RH), normal Delta-T drops to 15°F–17°F due to latent heat load.'
    ]
  },
  {
    id: 'cs-4',
    title: 'A2L Refrigerant Transition (R-454B & R-32) Safety Rules',
    category: 'Safety & Codes',
    summary: 'Mandatory field procedures for handling mildly flammable ASHRAE Class A2L refrigerants required under the EPA AIM Act.',
    quickFormula: 'LFL (Lower Flammability Limit) for R-454B = 0.303 kg/m³ · Velocity threshold = 1.0 m/s',
    fieldStandard: 'Use only spark-proof (brushless DC motor) recovery machines and vacuum pumps. Left-hand reverse thread adapters required on all tanks.',
    azDesertTip: 'In enclosed Phoenix service vans in July, interior temps exceed 155°F. Store A2L tanks in ventilated, crash-rated brackets away from direct sunlight and never store with open relief valves in cab.',
    details: [
      'Always test van interior and job workspace with an A2L-certified refrigerant sniffer before striking an oxy-acetylene torch.',
      'Purge nitrogen before brazing: NEVER pull a vacuum while heating copper on an A2L charged system.',
      'Mitigation boards: New A2L split systems include factory refrigerant leak sensors on the indoor coil that automatically turn on indoor blower and lock out condenser contactor if concentration hits 25% LFL.'
    ]
  }
];
