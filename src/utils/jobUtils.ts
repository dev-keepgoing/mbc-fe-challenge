import { JOB_STATUS } from "../constants/jobStatus";
import { Job } from "../types/jobType";

export function jobStatusUpdates(progress: number): Job["status"] {
    if (progress === 100) {
      return JOB_STATUS.COMPLETE;
    }
    return JOB_STATUS.IN_PROGRESS;
}

export function getCurrentTimeStamp() : string {
  return new Date().toISOString();
}