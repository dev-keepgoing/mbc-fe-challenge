import { create } from "zustand";
import { DataPreviewStoreType } from "./dataPreviewStoreType";
export const useDataPreviewStore = create<DataPreviewStoreType>((set) => ({
    previewData:[],
    visible:false,
    setPreviewData: (data) => {
        set({previewData:data, visible:true})
    },
    clearPreview:() => {
        set({previewData:[], visible:false})
    }
}));