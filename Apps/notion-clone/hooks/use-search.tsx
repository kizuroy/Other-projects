import { create } from "zustand";

type SearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    togle: () => void;
};


export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    togle: () => set({ isOpen: !get().isOpen })
}));
