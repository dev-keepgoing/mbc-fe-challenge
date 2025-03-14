import { create } from "zustand";
import { JobStoreType } from "./jobStoreType";
import { addJobToBackend, fetchJobs, updateJobInBackend } from "../../services/jobService";
import { isFunction } from "../../utils/typeGuards";
import { getCurrentTimeStamp } from "../../utils/jobUtils";
import { JOB_STATUS } from "../../constants/jobStatus";
import { workerCall, cancelWorkerJob, worker } from "../../workers/jobWorkerManager";

export const useJobStore = create<JobStoreType>()((set, get) => ({
  jobs: [], 

  fetchJobs: async () => {
    const jobsFromBackend = await fetchJobs();
    
    set((state) => {
      const existingJobsMap = new Map(state.jobs.map((job) => [job.id, job]));

      const mergedJobs = jobsFromBackend.map((job) =>
        existingJobsMap.has(job.id) ? { ...existingJobsMap.get(job.id), ...job } : job
      );

      return { jobs: mergedJobs };
    });

    jobsFromBackend.forEach((job) => {
      if (job.status === JOB_STATUS.IN_PROGRESS) {
        workerCall(job.id, job.progress);
      }
    });
  },

  addJob: async (job) => {
    const existingJob = get().jobs.find((j) => j.id === job.id);
    if (existingJob) return;

    const newJob = await addJobToBackend(job);

    set((state) => ({
      jobs: [...state.jobs, newJob],
    }));

    workerCall(newJob.id, newJob.progress);
  },

  cancelJob: async (jobId) => {
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId
          ? { 
              ...job, 
              status: JOB_STATUS.CANCELLED,
              completedAt: getCurrentTimeStamp()
            }
          : job
      ),
    }));

    cancelWorkerJob(jobId);

    await updateJobInBackend(jobId, 100, JOB_STATUS.CANCELLED);
  },

  updateJobProgress: async (jobId, progressUpdater) => {
    try {
      const job = get().jobs.find((j) => j.id === jobId);
      if (!job) return;

      const newProgress = isFunction(progressUpdater) ? progressUpdater(job.progress) : progressUpdater;

      const updatedJob = await updateJobInBackend(jobId, newProgress);

      if (updatedJob) {
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId
              ? {
                  ...updatedJob,
                  completedAt: newProgress >= 100 ? getCurrentTimeStamp() : job.completedAt,
                }
              : job
          ),
        }));
      }
    } catch (error) {
      console.error("Error updating job progress:", error);
    }
  },
}));

worker.onmessage = (event) => {
  const { jobId, progress, status } = event.data;

  console.log(`Worker Update: Job ${jobId} Progress: ${progress}% - Status: ${status}`);

  useJobStore.getState().updateJobProgress(jobId, progress);
};
