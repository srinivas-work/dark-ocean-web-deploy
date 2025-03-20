import { create } from "zustand";

type LoaderType = {
  progress: number;
  setProgress: (state: number) => void;
};

const useCustomLoaderStore = create<LoaderType>((set) => ({
  progress: 0,
  setProgress: (currentProgress: number) => set({ progress: currentProgress }),
}));

export { useCustomLoaderStore };
