import { create } from "zustand";

type ScrollStore = {
  scrollOffset: number;
  setScrollOffset: (offset: number) => void;
};

type ScrollResetState = {
  isReset: boolean;
  setIsReset: (state: boolean) => void;
  toggle: () => void;
};

const useHomepageScrollOffsetStore = create<ScrollStore>((set) => ({
  scrollOffset: 0.0,
  setScrollOffset: (offset: number) => set({ scrollOffset: offset }),
}));

// Selector to get scrollOffset
const useHomepageScrollOffset = () =>
  useHomepageScrollOffsetStore((state) => state.scrollOffset);

// Selector to get setScrollOffset
const useSetHomepageScrollOffset = () =>
  useHomepageScrollOffsetStore((state) => state.setScrollOffset);

const useResetHomepageScroll = create<ScrollResetState>((set) => ({
  isReset: false,
  setIsReset: (state) => set({ isReset: state }),
  toggle: () => set((state) => ({ isReset: !state.isReset })),
}));

export {
  useHomepageScrollOffsetStore,
  useHomepageScrollOffset,
  useSetHomepageScrollOffset,
  useResetHomepageScroll,
};
