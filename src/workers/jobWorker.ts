import { WORKER_STATUS } from "../constants/workerStatus";


const activeJobs = new Map();

self.onmessage = function (event) {
  const { jobId, lastProgress, action } = event.data;

  if (action === WORKER_STATUS.CANCEL) {
    console.log(`Worker: Cancelling job ${jobId}`);
    if (activeJobs.has(jobId)) {
      clearInterval(activeJobs.get(jobId));
      activeJobs.delete(jobId);
    }
    return;
  }

  console.log(`Worker: Starting job ${jobId} from ${lastProgress}%`);

  let progress = lastProgress;

  const interval = setInterval(() => {
    if (!activeJobs.has(jobId)) {
      clearInterval(interval);
      return;
    }

    progress += 10;

    if (progress >= 100) {
      clearInterval(interval);
      activeJobs.delete(jobId);
      self.postMessage({ jobId, progress: 100, status: WORKER_STATUS.COMPLETE });
    } else {
      self.postMessage({ jobId, progress, status: WORKER_STATUS.IN_PROGRESS });
    }
  }, 3000);

  activeJobs.set(jobId, interval);
};
