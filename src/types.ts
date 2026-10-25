export interface Episode {
  id: string;
  number: number;
  title: string;
  category: 'Service Calls & Realities' | 'Flat-Rate vs. Hourly' | 'Tool Reviews' | 'Arizona Climate Challenges';
  date: string;
  duration: string;
  durationSeconds: number;
  summary: string;
  keyTakeaways: string[];
  toolsMentioned: string[];
  audioUrl?: string;
  tags: string[];
  transcriptExcerpt: string;
  ambientConditions?: string;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  category: 'education' | 'certification' | 'field_work' | 'journeyman';
  description: string;
  credentialId?: string;
  hoursContributed?: number;
  keyLearnings: string[];
}

export interface CompetencySkill {
  id: string;
  category: 'Electrical & Controls' | 'Refrigeration Cycle' | 'Airflow & Ductwork' | 'Safety & Mechanical';
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1: Novice, 2: Apprentice, 3: Proficient, 4: Advanced, 5: Journeyman Ready
  description: string;
  verifiedHours: number;
  mentorSignOff: string;
}

export interface FieldCheatSheet {
  id: string;
  title: string;
  category: string;
  summary: string;
  quickFormula: string;
  fieldStandard: string;
  azDesertTip: string;
  details: string[];
}
