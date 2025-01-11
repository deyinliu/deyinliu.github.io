import { create } from 'zustand';
import type { ExperimentData, DataTemplate } from '@/types/experiment';

interface ExperimentFormState {
  basicInfo: Partial<ExperimentData>;
  dataTemplate: Partial<DataTemplate>;
  setBasicInfo: (data: Partial<ExperimentData>) => void;
  setDataTemplate: (template: Partial<DataTemplate>) => void;
  reset: () => void;
}

export const useExperimentFormStore = create<ExperimentFormState>((set) => ({
  basicInfo: {},
  dataTemplate: { sourceFrom: 'select', isPublic: false },
  setBasicInfo: (data) => set({ basicInfo: data }),
  setDataTemplate: (template) => set({ dataTemplate: template }),
  reset: () => set({ basicInfo: {}, dataTemplate: null }),
}));
