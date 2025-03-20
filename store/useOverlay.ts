import { create } from "zustand";

interface ContactOverlayState {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  toggle: () => void;
}

export const useContactOverlayStore = create<ContactOverlayState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useServiceOverlayStore = create<ContactOverlayState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set({ isOpen: state }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
