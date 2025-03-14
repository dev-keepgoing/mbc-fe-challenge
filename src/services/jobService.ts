import { JOB_STATUS } from "../constants/jobStatus";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { Job } from "../types/jobType";
import { getCurrentTimeStamp, jobStatusUpdates } from "../utils/jobUtils";
import { workerCall, cancelWorkerJob } from "../workers/jobWorkerManager";

const loadState = (): Job[] => {
  const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
  return saved ? JSON.parse(saved) : [];
};

const saveState = (jobs: Job[]) => {
  localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
};

let jobs: Job[] = loadState();

export const fetchJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobs);
    }, 500);
  });
};

export const addJobToBackend = async (job: Job): Promise<Job> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newJob = {
        ...job,
        startedAt: getCurrentTimeStamp(),
        completedAt: undefined,
        progress: 10,
        status: JOB_STATUS.IN_PROGRESS,
      };

      jobs.push(newJob);
      saveState(jobs);

      const savedJob = jobs.find((j) => j.id === newJob.id);
      const lastProgress = savedJob ? savedJob.progress : 0;

      workerCall(newJob.id, lastProgress);

      resolve(newJob);
    }, 500);
  });
};

export const updateJobInBackend = async (
  jobId: string,
  progress: number,
  statusOverride?: JOB_STATUS
): Promise<Job | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      jobs = jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              progress,
              status: statusOverride || jobStatusUpdates(progress),
              completedAt:
                statusOverride === JOB_STATUS.CANCELLED
                  ? getCurrentTimeStamp()
                  : jobStatusUpdates(progress) === JOB_STATUS.COMPLETE
                  ? getCurrentTimeStamp()
                  : job.completedAt,
            }
          : job
      );

      saveState(jobs);
      resolve(jobs.find((job) => job.id === jobId) || null);
    }, 500);
  });
};

export const cancelJobInBackend = async (jobId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      jobs = jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: JOB_STATUS.CANCELLED,
              completedAt: getCurrentTimeStamp(),
            }
          : job
      );

      saveState(jobs);

      cancelWorkerJob(jobId);
      resolve();
    }, 500);
  });
};
