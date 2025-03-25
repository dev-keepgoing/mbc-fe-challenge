import { Dataset } from "../../types/datasetType";

export type DatasetStoreType = {
  datasets: Dataset[];
  fetchDatasets: () => Promise<void>;
  addDataset: (dataset: Dataset) => Promise<void>;
  removeDataset: (datasetId: string) => Promise<void>;
  updateDatasetsBulk:(dataset:Dataset) => Promise<void>
};
