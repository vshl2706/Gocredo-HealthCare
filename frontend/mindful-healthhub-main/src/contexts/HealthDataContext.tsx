import { createContext, useContext, useState, ReactNode } from 'react';

export interface WellnessGoal {
  id: string;
  name: string;
  target: number;
  unit: string;
  icon: string;
  color: string;
}

export interface DailyLog {
  id: string;
  date: string;
  waterIntake: number;
  steps: number;
  yogaMinutes: number;
  sleepHours: number;
}

export interface PreventiveCareReminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  category: 'checkup' | 'test' | 'vaccination' | 'screening';
}

export interface PatientProfile {
  userId: string;
  allergies: string[];
  medications: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface HealthDataContextType {
  wellnessGoals: WellnessGoal[];
  dailyLogs: DailyLog[];
  reminders: PreventiveCareReminder[];
  patientProfile: PatientProfile | null;
  addDailyLog: (log: Omit<DailyLog, 'id'>) => void;
  updatePatientProfile: (profile: PatientProfile) => void;
  getTodayLog: () => DailyLog | undefined;
  getHealthTip: () => string;
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

const WELLNESS_GOALS: WellnessGoal[] = [
  { id: '1', name: 'Water Intake', target: 8, unit: 'glasses', icon: 'droplet', color: 'hsl(200 70% 55%)' },
  { id: '2', name: 'Steps', target: 10000, unit: 'steps', icon: 'footprints', color: 'hsl(160 45% 50%)' },
  { id: '3', name: 'Yoga/Exercise', target: 30, unit: 'minutes', icon: 'dumbbell', color: 'hsl(180 65% 45%)' },
  { id: '4', name: 'Sleep', target: 8, unit: 'hours', icon: 'moon', color: 'hsl(200 15% 20%)' },
];

const HEALTH_TIPS = [
  "Stay hydrated! Drink at least 8 glasses of water daily.",
  "Take a 5-minute break every hour to stretch and move.",
  "Practice deep breathing for 5 minutes to reduce stress.",
  "Aim for 7-9 hours of quality sleep each night.",
  "Include colorful fruits and vegetables in every meal.",
  "Schedule regular health checkups and screenings.",
  "Take a short walk after meals to aid digestion.",
  "Practice mindfulness or meditation for mental wellness.",
  "Maintain good posture while sitting and standing.",
  "Stay connected with loved ones for emotional health.",
];

const MOCK_REMINDERS: PreventiveCareReminder[] = [
  {
    id: '1',
    title: 'Annual Physical Checkup',
    description: 'Schedule your yearly comprehensive health examination',
    dueDate: '2025-12-15',
    status: 'pending',
    category: 'checkup',
  },
  {
    id: '2',
    title: 'Blood Pressure Check',
    description: 'Monitor your blood pressure levels',
    dueDate: '2025-11-30',
    status: 'pending',
    category: 'test',
  },
  {
    id: '3',
    title: 'Flu Vaccination',
    description: 'Get your annual flu shot',
    dueDate: '2025-12-01',
    status: 'completed',
    category: 'vaccination',
  },
];

export function HealthDataProvider({ children }: { children: ReactNode }) {
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      waterIntake: 4,
      steps: 5000,
      yogaMinutes: 15,
      sleepHours: 7,
    },
  ]);
  
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [reminders] = useState<PreventiveCareReminder[]>(MOCK_REMINDERS);

  const addDailyLog = (log: Omit<DailyLog, 'id'>) => {
    const newLog: DailyLog = {
      ...log,
      id: Date.now().toString(),
    };
    setDailyLogs(prev => {
      const filtered = prev.filter(l => l.date !== log.date);
      return [...filtered, newLog];
    });
  };

  const updatePatientProfile = (profile: PatientProfile) => {
    setPatientProfile(profile);
    localStorage.setItem('patient_profile', JSON.stringify(profile));
  };

  const getTodayLog = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyLogs.find(log => log.date === today);
  };

  const getHealthTip = () => {
    const today = new Date().getDate();
    return HEALTH_TIPS[today % HEALTH_TIPS.length];
  };

  return (
    <HealthDataContext.Provider
      value={{
        wellnessGoals: WELLNESS_GOALS,
        dailyLogs,
        reminders,
        patientProfile,
        addDailyLog,
        updatePatientProfile,
        getTodayLog,
        getHealthTip,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
}

export function useHealthData() {
  const context = useContext(HealthDataContext);
  if (context === undefined) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
}
