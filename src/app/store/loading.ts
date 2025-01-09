import { create } from 'zustand';

interface LoadingState {
  isFirstLoad: boolean;
  globalLoading: boolean;
  pageLoading: boolean;
  setFirstLoad: (state: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  setPageLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isFirstLoad: true,
  globalLoading: true,
  pageLoading: false,
  setFirstLoad: (state) => set({ isFirstLoad: state }),
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
  setPageLoading: (loading) => set({ pageLoading: loading }),
}));
