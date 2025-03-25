import React, { useState } from "react";
import { useDatasetStore } from "../store/datasets/datasetStore";
import { Dataset } from "../types/datasetType";

interface CsvPreviewTableProps {
  dataset?: Dataset;
}

const CSVTable: React.FC<CsvPreviewTableProps> = ({ dataset }) => {

  if (!dataset || dataset.data.length === 0) return <p>No data to validate</p>

  const [editableData, setEditableData] = useState<Record<string,string>[]>([...dataset.data])
  const {updateDatasetsBulk} = useDatasetStore();

  const handleSave = () => {
    const updatedDataSet = {...dataset, data:editableData}
    updateDatasetsBulk(updatedDataSet);
  }

  const handleCellChange = (rowIndex:number, key:string, value:string) => {
    setEditableData((prev)=>{
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [key]:value
      };
      return updated;
    })

  }

  const headers = Object.keys(dataset.data[0]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-white">✏️ Editable CSV Table</h2>
      <div className="overflow-y-auto max-h-60">
        <table className="min-w-full text-sm text-white border border-gray-600">
          <thead className="bg-gray-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 border border-gray-600 sticky bg-gray-700 -top-0.5"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {editableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-gray-800">
                {headers.map((header) => (
                  <td key={header} className="px-4 py-2 border border-gray-700">
                    <input
                      className="bg-gray-900 text-white px-2 py-1 w-full"
                      type="text"
                      value={row[header]}
                      onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
};

export default CSVTable;
