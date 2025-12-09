# Excella
Excella is an AI-powered Excel automation tool that transforms spreadsheets into intelligent workflows. Upload your Excel/CSV files, analyze data, and interact with it using an AI chatbot — all in a sleek and responsive interface.

#Features
File Upload: Drag & drop or select Excel/CSV files easily.
AI ChatBot: Ask questions and get insights from your spreadsheet data using AI.
Data Preview: Quickly view your uploaded spreadsheet in a clean table.
Intelligent Suggestions: Gemini API provides smart insights based on your data.
Responsive UI: Works smoothly on desktop and mobile devices.
Modern Design: Clean interface with dark/light message bubbles.
#Tech Stack
Frontend: React.js, Tailwind CSS
Backend / API: Node.js (for AI integration)
File Handling: SheetJS (xlsx) for Excel/CSV parsing
AI Integration: Gemini API
#Installation
Clone the repository:

git clone https://github.com/<your-username>/excella.git
cd excella

#Install dependencies:

npm install
 or
yarn install
Create a .env file in the root directory with your API keys. For example:

GEMINI_API_KEY=your_gemini_api_key_here
Replace your_gemini_api_key_here with your actual Gemini API key.
Add other environment variables if needed for your project.
Start the development server:

npm run dev
or
yarn dev

#Usage
Upload an Excel or CSV file using drag & drop or the file selector.
View your spreadsheet in the Data Preview section.
Ask questions or request insights from the AI ChatBot.
Receive Gemini API-powered analysis and suggestions instantly.
