import { useState, useEffect } from "react";
import { Job } from "../types/jobType";
import { v4 as uuidv4 } from "uuid";
import { JOB_STATUS } from "../constants/jobStatus";
import { getCurrentTimeStamp } from "../utils/jobUtils";
import ProgressBar from "../components/progressBar";
import { useDatasetStore } from "../store/datasets/datasetStore";
import { useJobStore } from "../store/jobs/jobsStore";
import moment from "moment";
import { useLocation } from "react-router-dom";

const JobsPage: React.FC = () => {
  const { datasets, fetchDatasets } = useDatasetStore();
  const { jobs }: { jobs: Job[] } = useJobStore();
  const { fetchJobs, addJob, updateJobProgress, cancelJob } = useJobStore();
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const preselectedDatasetId = params.get("datasetId");

  useEffect(() => {
    if (datasets.length === 0) fetchDatasets();
    if (jobs.length === 0) fetchJobs();
  }, []);

  useEffect(() => {
    if (!preselectedDatasetId) return;
    setSelectedDataset(preselectedDatasetId);
  }, [preselectedDatasetId]);


  const handleRunJob = () => {
    if (!selectedDataset) return;

    const newJob: Job = {
      id: uuidv4(),
      datasetId: selectedDataset,
      status: JOB_STATUS.PENDING,
      progress: 10,
      startedAt: getCurrentTimeStamp(),
    };

    addJob(newJob);
    startJobSimulation(newJob.id);
  };

  const startJobSimulation = (jobId: string, jobProgress?: number) => {
    updateJobProgress(jobId, jobProgress ?? 10);
  };

  const inProgressJobs = jobs
    .filter((job) => job.status === JOB_STATUS.IN_PROGRESS)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  const completedJobs = jobs
    .filter((job) => job.status === JOB_STATUS.COMPLETE || job.status === JOB_STATUS.CANCELLED)
    .sort((a, b) => new Date(b.completedAt || b.startedAt).getTime() - new Date(a.completedAt || a.startedAt).getTime());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">📊 Computation Jobs</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Select a Dataset:</label>
        <select
          value={selectedDataset || ""}
          onChange={(e) => setSelectedDataset(e.target.value)}
          className="border p-2 rounded w-full bg-gray-800 text-white"
        >
          <option value="" disabled>
            -- Choose a dataset --
          </option>
          {datasets.map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.name} - {dataset.id}
            </option>
          ))}
        </select>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={handleRunJob}
          disabled={!selectedDataset}
        >
          Run Job
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">⏳ Ongoing Jobs</h2>
      <ul className="mt-2 border p-2 rounded">
        {inProgressJobs.length === 0 ? (
          <p>No ongoing jobs</p>
        ) : (
          inProgressJobs.map((job) => (
            <li key={job.id} className="border-b py-2 flex items-center justify-between gap-4">
              <span className="flex-1">
                Dataset: {datasets.find((d) => d.id === job.datasetId)?.name || "Unknown"}
              </span>

              <div className="flex items-center gap-4 w-2/5">
                <ProgressBar progress={job.progress} />
              </div>

              <button
                className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 cursor-pointer"
                onClick={() => cancelJob(job.id)}
              >
                STOP
              </button>
            </li>
          ))
        )}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">✅ Completed Jobs</h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Dataset</th>
              <th className="px-4 py-3 text-left">Started At</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {completedJobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">
                  No completed jobs
                </td>
              </tr>
            ) : (
              completedJobs.map((job, index) => (
                <tr
                  key={job.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } border-b border-gray-700`}
                >
                  <td className="px-4 py-3 text-gray-400 text-xs">{job.id}</td>
                  <td className="px-4 py-3 font-medium">
                    {datasets.find((d) => d.id === job.datasetId)?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {moment(job.startedAt).format("MMM DD, YYYY HH:mm")}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm font-semibold ${
                      job.status === JOB_STATUS.CANCELLED ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {job.status === JOB_STATUS.CANCELLED ? "❌ Cancelled" : "✅ Completed"}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {job.completedAt
                      ? moment(job.completedAt).format("MMM DD, YYYY HH:mm")
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsPage;
