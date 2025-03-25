import { ToastType } from "./toastType";

export type ToastStoreType = {
  message: string;
  type: ToastType;
  visible: boolean;
  animationClass: string;
  showToast: (message: string, type?: ToastType) => void;
};
