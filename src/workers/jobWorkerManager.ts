import { WORKER_STATUS } from "../constants/workerStatus";
import { useJobStore } from "../store/jobs/jobsStore";

export const worker = new Worker(new URL("./jobWorker.ts", import.meta.url), { type: "module" });

export const workerCall = (jobId: string, lastProgress = 0) => {
  console.log(`Manager: Starting job ${jobId} from ${lastProgress}%`);
  worker.postMessage({ jobId, lastProgress });
};

export const cancelWorkerJob = (jobId: string) => {
  console.log(`Manager: Cancelling job ${jobId}`);
  worker.postMessage({ jobId, action: WORKER_STATUS.CANCEL });
};

worker.onmessage = async (event) => {
  const { jobId, progress, status } = event.data;

  console.log(`Manager: Received update for Job ${jobId}: ${progress}% - Status: ${status}`);

  useJobStore.getState().updateJobProgress(jobId, progress);
};
