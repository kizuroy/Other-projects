import { create } from "zustand";

type SettingsStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};
