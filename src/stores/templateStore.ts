import { create } from 'zustand';
import type { DataTemplate } from '@/types/experiment';
import mockData from '@/mock/templateData.json';

interface TemplateStore {
  templates: DataTemplate[];
  selectedTemplate: DataTemplate | null;
  addTemplate: (template: DataTemplate) => void;
  updateTemplate: (template: DataTemplate) => void;
  removeTemplate: (id: string) => void;
  selectTemplate: (template: DataTemplate | null) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: mockData.templates as DataTemplate[],
  selectedTemplate: null,
  addTemplate: (template) =>
    set((state) => ({
      templates: [...state.templates, template]
    })),
  updateTemplate: (template) =>
    set((state) => ({
      templates: state.templates.map((t) =>
        t.id === template.id ? template : t
      ),
    })),
  removeTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((t) => t.id !== id),
    })),
  selectTemplate: (template) =>
    set({ selectedTemplate: template }),
}));