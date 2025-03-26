import { create } from "zustand";

type ChosenRouteType = {
  chosenRoute: string;
  setChosenRoute: (route: string) => void;
};

const useCustomRouter = create<ChosenRouteType>((set) => ({
  chosenRoute: "",
  setChosenRoute: (route: string) => set({ chosenRoute: route }),
}));

export { useCustomRouter };
