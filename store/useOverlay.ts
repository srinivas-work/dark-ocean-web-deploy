import { create } from "zustand";

interface OverlayState {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  toggle: () => void;
}

export const useContactOverlayStore = create<OverlayState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useServiceOverlayStore = create<OverlayState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useCareerOverlayStore = create<OverlayState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
