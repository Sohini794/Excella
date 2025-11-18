import React from 'react';
import * as XLSX from 'xlsx';

const FileUpload = ({ setData }) => {  // receive setData from parent

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Read file
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        console.log(jsonData);
        setData(jsonData); // send data to parent
    }
    
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 m-4 w-full rounded-lg'>
            <div className='p-6 border-2 border-dashed border-gray-400 rounded-lg bg-white shadow'>
                <h2 className='mb-4 font-bold text-lg text-center'>
                    Upload your sheets here
                </h2> 

                <input 
                    type="file" 
                    className="block w-full cursor-pointer border p-3 rounded bg-gray-900 hover:bg-gray-700 font-medium text-sm text-white" 
                    accept='.xlsx,.csv,.xls'  
                    onChange={handleFile} 
                />
            </div>
        </div>
    );
};

export default FileUpload;
