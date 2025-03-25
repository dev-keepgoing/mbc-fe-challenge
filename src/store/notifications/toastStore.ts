import { create } from "zustand";
import { ToastStoreType } from "./toastStoreType";

export const useToastStore = create<ToastStoreType>((set) => ({
    message: "",
    type: "success",
    visible: false,
    animationClass: "toast-enter",
    showToast: (message, type = "success") => {
        set({ message, type, visible: true, animationClass: "toast-show" });
        setTimeout(() => set({ animationClass: "toast-exit", visible: false }), 3000);
        },
  }));
  
  