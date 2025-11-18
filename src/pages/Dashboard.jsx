// import Header from "../components/Header";
// import ChatBot from "../components/ChatBot";
// import FileUpload from "../components/FileUpload";
// import DataPreview from "../components/DataPreview";
// import { useState } from "react";

// export default function Dashboard() {
//   const [data, setData] = useState([]); // Uploaded Excel sheet
//   const [resultData, setResultData] = useState(null); // AI JSON result

//   return (
//     <>
//       <Header />
//       {/* Full height minus header */}
//       <div className="flex h-[calc(100vh-64px)]">
//         {/* Left: FileUpload or DataPreview */}
//         <div className="flex-1 flex flex-col p-4">
//           {resultData ? (
//             <DataPreview data={resultData} />
//           ) : data.length > 0 ? (
//             <DataPreview data={data} />
//           ) : (
//             <FileUpload setData={setData} />
//           )}
//         </div>

//         {/* Right: ChatBot */}
//         <div className="flex-1 flex flex-col p-4">
//           <ChatBot data={data} setResultData={setResultData} />
//         </div>
//       </div>
//     </>
//   );
// }

import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import FileUpload from "../components/FileUpload";
import DataPreview from "../components/DataPreview";
import { useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState([]); // Uploaded Excel sheet
  const [resultData, setResultData] = useState(null); // AI JSON result

  return (
    // 1. Create a flex container that takes the full screen height and arranges items in a column.
    <div className="flex flex-col h-screen">
      <Header />

      {/* 2. The <main> tag will now automatically fill the remaining vertical space. */}
      {/* 'flex-1' makes it grow, and 'overflow-y-auto' allows content to scroll if it's too tall. */}
      <main className="flex-1 overflow-y-auto">
        {data.length === 0 ? (
          // IF NO FILE IS UPLOADED:
          <div className="flex items-center justify-center h-full">
            <FileUpload setData={setData} />
          </div>
        ) : (
          // IF A FILE HAS BEEN UPLOADED:
          // 'h-full' ensures this div takes the full height of the <main> container.
          <div className="flex h-full">
            <div className="flex-1 flex flex-col p-4">
              <DataPreview data={resultData ? resultData : data} />
            </div>
            <div className="flex-1 flex flex-col p-4">
              <ChatBot data={data} setResultData={setResultData} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}