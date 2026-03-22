export type RiskLevel = 'safe' | 'caution' | 'danger';

export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  stock: number;
  risk: RiskLevel;
  riskNote: string;
  schedule: string[];
  lastTaken?: string;
}

export interface TodayDose {
  medicationId: string;
  medicationName: string;
  dose: string;
  time: string;
  taken: boolean;
}

export const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Beloc',
    dose: '50mg',
    frequency: 'Günde 1 kez',
    stock: 28,
    risk: 'caution',
    riskNote: 'Tansiyon düşürebilir. Ani bırakmayın.',
    schedule: ['08:00'],
    lastTaken: '2026-03-22T08:00:00',
  },
  {
    id: '2',
    name: 'Coumadin',
    dose: '5mg',
    frequency: 'Günde 1 kez',
    stock: 14,
    risk: 'danger',
    riskNote: 'Kan sulandırıcıdır. Yeşil yapraklı sebzelerle etkileşir.',
    schedule: ['20:00'],
  },
  {
    id: '3',
    name: 'Glucophage',
    dose: '850mg',
    frequency: 'Günde 2 kez',
    stock: 56,
    risk: 'safe',
    riskNote: 'Yemekle birlikte alınız.',
    schedule: ['08:00', '20:00'],
    lastTaken: '2026-03-22T08:00:00',
  },
];

export const getTodayDoses = (meds: Medication[]): TodayDose[] => {
  const doses: TodayDose[] = [];
  meds.forEach((med) => {
    med.schedule.forEach((time) => {
      const taken = med.lastTaken
        ? new Date(med.lastTaken).toDateString() === new Date().toDateString() &&
          time === med.schedule[0]
        : false;
      doses.push({
        medicationId: med.id,
        medicationName: med.name,
        dose: med.dose,
        time,
        taken,
      });
    });
  });
  return doses.sort((a, b) => a.time.localeCompare(b.time));
};
