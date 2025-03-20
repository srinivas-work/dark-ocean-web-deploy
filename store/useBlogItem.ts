import { create } from "zustand";
import { PressItemType } from "../src/components/utils/types/customDataTypes";

type ChosenBlogItemType = {
  chosenBlogItem: PressItemType | undefined;
  setChosenBlogItem: (item: PressItemType) => void;
};

const useBlogItem = create<ChosenBlogItemType>((set) => ({
  chosenBlogItem: undefined,
  setChosenBlogItem: (item: PressItemType) => set({ chosenBlogItem: item }),
}));

export { useBlogItem };
