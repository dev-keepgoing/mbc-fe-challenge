import { STORAGE_KEYS } from "../constants/storageKeys";
import { Dataset } from "../types/datasetType";
import { getCurrentTimeStamp } from "../utils/jobUtils";

const loadState = (): Dataset[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.DATASETS);
  return saved ? JSON.parse(saved) : [];
};

const saveState = (datasets: Dataset[]) => {
  localStorage.setItem(STORAGE_KEYS.DATASETS, JSON.stringify(datasets));
};

let datasets: Dataset[] = loadState();

export const fetchDatasets = async (): Promise<Dataset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datasets);
    }, 500);
  });
};

export const addDatasetToBackend = async (dataset: Dataset): Promise<Dataset> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDataset = { ...dataset, createdAt: getCurrentTimeStamp() };
      datasets = [newDataset, ...datasets];
      saveState(datasets);
      resolve(newDataset);
    }, 500);
  });
};

export const deleteDatasetFromBackend = async (datasetId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      datasets = datasets.filter((dataset) => dataset.id !== datasetId);
      saveState(datasets);
      resolve();
    }, 500);
  });
};
