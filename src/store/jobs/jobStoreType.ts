import { Job } from "../../types/jobType";

export type JobStoreType = {
  jobs: Job[];
  fetchJobs: () => Promise<void>;
  addJob: (job: Job) => Promise<void>;
  cancelJob: (jobId: string) => Promise<void>;
  updateJobProgress: (
    jobId: string,
    progress: number | ((progress: number) => number),
  ) => Promise<void>;
};
