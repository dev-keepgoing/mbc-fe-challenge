import { create } from "zustand";
import { DatasetStoreType } from "./datasetStoreType";
import { Dataset } from "../../types/datasetType";
import { fetchDatasets, addDatasetToBackend, deleteDatasetFromBackend } from "../../services/datasetService";

export const useDatasetStore = create<DatasetStoreType>((set, get) => ({
  datasets: [],

  fetchDatasets: async () => {
    const datasetsFromBackend: Dataset[] = await fetchDatasets();

    set((state) => {
      const existingDatasetsMap = new Map(state.datasets.map((dataset) => [dataset.id, dataset]));

      const mergedDatasets = datasetsFromBackend.map((dataset) =>
        existingDatasetsMap.has(dataset.id) ? { ...existingDatasetsMap.get(dataset.id), ...dataset } : dataset
      );

      return { datasets: mergedDatasets };
    });
  },

  addDataset: async (dataset) => {
    const existingDataset = get().datasets.find((d) => d.id === dataset.id);
    if (existingDataset) return;

    const newDataset = await addDatasetToBackend(dataset);

    set((state) => ({
      datasets: [...state.datasets, newDataset],
    }));
  },

  removeDataset: async (datasetId) => {
    await deleteDatasetFromBackend(datasetId);
    set((state) => ({ datasets: state.datasets.filter((dataset) => dataset.id !== datasetId) }));
  },
}));
