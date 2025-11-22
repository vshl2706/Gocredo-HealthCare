import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  mobile: string;
  role: UserRole;
  hasConsent: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  mobile: string;
  hasConsent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (replace with API calls later)
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'patient@demo.com',
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    mobile: '+1234567890',
    role: 'patient',
    hasConsent: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'doctor@demo.com',
    firstName: 'Dr. Sarah',
    lastName: 'Smith',
    age: 42,
    mobile: '+1234567891',
    role: 'doctor',
    hasConsent: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'admin@demo.com',
    firstName: 'Admin',
    lastName: 'User',
    age: 30,
    mobile: '+1234567892',
    role: 'admin',
    hasConsent: true,
    createdAt: new Date('2024-01-01'),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('healthcare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('healthcare_user', JSON.stringify(foundUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (data: SignupData) => {
    // Mock signup (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already registered' };
    }

    if (!data.hasConsent) {
      return { success: false, error: 'You must consent to use this service' };
    }

    if (data.age < 18) {
      return { success: false, error: 'You must be 18 or older to register' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      mobile: data.mobile,
      role: 'patient', // New users are patients by default
      hasConsent: data.hasConsent,
      createdAt: new Date(),
    };

    MOCK_USERS.push(newUser);
    setUser(newUser);
    localStorage.setItem('healthcare_user', JSON.stringify(newUser));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
