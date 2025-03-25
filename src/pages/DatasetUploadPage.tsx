import { useEffect, useState } from "react";
import { Dataset } from "../types/datasetType";
import { v4 as uuidv4 } from "uuid";
import { FaUpload, FaTrash, FaPlayCircle, FaTable } from "react-icons/fa";
import { useDatasetStore } from "../store/datasets/datasetStore";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CardInfo from "../components/CardInfo";
import { parseCSV } from "../utils/datasetUtils";
import CSVTable from "../components/CSVTable";
import ModalView from "../components/ModalView";

const DatasetUploadPage: React.FC = () => {
    const { datasets, addDataset, removeDataset, fetchDatasets } = useDatasetStore();
    const [previewDataSet, setPreviewDataSet] = useState<Dataset>();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDatasets();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFiles(Array.from(event.target.files));
            event.target.value = "";
        }
    };

    const handleUpload = () => {
        if (selectedFiles.length === 0) return;

        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const parsedData = parseCSV(content)
                const dataset: Dataset = {
                    id: uuidv4(),
                    name: file.name,
                    uploadedAt: new Date().toISOString(),
                    data: parsedData
                };
                addDataset(dataset);
            };
            reader.readAsText(file);
        });

        setSelectedFiles([]);
    };

    const handlePreviewDataset = ( data:Dataset) => {
        setPreviewDataSet(data);
    }

    const clearPreview = () => {
        setPreviewDataSet(undefined);
    }

    const handleDeleteDataset = (datasetId: string) => {
        removeDataset(datasetId);
    };

    const handleRunJob = (datasetId: string) => {
        navigate(`/jobs?datasetId=${datasetId}`);
    };

    return (
        <div>
            <div>
                <CardInfo/>
            </div>
            <h1 className="text-2xl font-semibold mb-4">📂 Upload Datasets</h1>

            <div className="flex flex-col gap-2 mb-6">
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white hover:bg-gray-600 transition duration-200"
                >
                    <FaUpload className="text-gray-300" />
                    <span>Choose Files</span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                />

                {selectedFiles.length > 0 && (
                    <div className="bg-gray-800 p-3 rounded-md">
                        <h3 className="text-sm font-semibold text-gray-300">Selected Files:</h3>
                        <ul className="text-sm text-gray-400">
                            {selectedFiles.map((file, index) => (
                                <li key={index}>📂 {file.name}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-600"
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0}
                >
                    Upload Selected Files
                </button>

                
            </div>

            <h2 className="text-xl font-semibold mb-3">📊 Uploaded Datasets</h2>
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">File Name</th>
                            <th className="px-4 py-3 text-left">Uploaded At</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasets.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-400">
                                    No datasets uploaded
                                </td>
                            </tr>
                        ) : (
                            datasets.map((dataset, index) => (
                                <tr
                                    key={dataset.id}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                                    } border-b border-gray-700`}
                                >
                                    <td className="px-4 py-3 text-gray-400 text-xs">{dataset.id}</td>
                                    <td className="px-4 py-3 font-medium">{dataset.name}</td>
                                    <td className="px-4 py-3 text-gray-400 text-sm">
                                        {moment(dataset.uploadedAt).format("MMM DD, YYYY HH:mm")}
                                    </td>
                                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                                            onClick={() => handleDeleteDataset(dataset.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                                            onClick={() => handleRunJob(dataset.id)}
                                        >
                                            <FaPlayCircle />
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition"
                                            onClick={() => handlePreviewDataset(dataset)}
                                        >
                                            <FaTable />
                                        </button>
                                    </td>
                                </tr>
                                
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <ModalView isOpen={previewDataSet !== undefined} onClose={clearPreview}>
                <CSVTable dataset={previewDataSet}/>
            </ModalView>
        </div>
    );
};

export default DatasetUploadPage;
