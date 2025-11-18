import * as XLSX from "xlsx";

export default function DataPreview({ data }) {
  // if (!data || data.length === 0)
  //   return <p className="text-gray-500 text-center">No data</p>;

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Result");
    XLSX.writeFile(wb, "Excella_Result.xlsx");
  };

  return (
    <div className="w-full h-full flex flex-col overflow-auto p-2">
      <button
        onClick={downloadExcel}
        className="mb-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 self-start"
      >
        Download Excel
      </button>
      <div className="overflow-auto flex-1">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              {Object.keys(data[0]).map((key, idx) => (
                <th key={idx} className="p-2 text-left border-b">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, colIdx) => (
                  <td key={colIdx} className="p-2 border-b">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


