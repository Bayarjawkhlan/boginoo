import { create } from "zustand";

interface AlertModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAlertModal = create<AlertModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
