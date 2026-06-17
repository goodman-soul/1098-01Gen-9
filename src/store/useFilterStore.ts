import { create } from 'zustand';
import type { UserFilters, SkillLevel } from '@/types';

interface FilterState extends UserFilters {
  setResort: (resortId: string | null) => void;
  setDates: (startDate: string | null, endDate: string | null) => void;
  setHeight: (height: number | null) => void;
  setWeight: (weight: number | null) => void;
  setLevel: (level: SkillLevel | null) => void;
  resetFilters: () => void;
}

const initialState: UserFilters = {
  resortId: null,
  startDate: null,
  endDate: null,
  height: null,
  weight: null,
  level: null,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  
  setResort: (resortId) => set({ resortId }),
  
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  
  setHeight: (height) => set({ height }),
  
  setWeight: (weight) => set({ weight }),
  
  setLevel: (level) => set({ level }),
  
  resetFilters: () => set(initialState),
}));
