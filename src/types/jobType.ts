import { JOB_STATUS } from "../constants/jobStatus";

  export type Job = {
    id: string;
    datasetId: string;
    status: JOB_STATUS.PENDING | JOB_STATUS.COMPLETE | JOB_STATUS.IN_PROGRESS | JOB_STATUS.CANCELLED;
    progress: number;
    startedAt: string;
    completedAt?: string;
  };
  
  