export type DataPreviewStoreType = {
    previewData: Record<string, string>[]
    visible: boolean,
    setPreviewData: (data: Record<string,string>[]) => void;
    clearPreview: () => void;
  };
  