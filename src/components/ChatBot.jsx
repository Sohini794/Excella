import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
 
import { getExcelAiPrompt } from "./Prompt";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);


const arrayToObject = (data) => {
  if (!data || data.length < 1) return [];
  const headers = data[0];
  const rows = data.slice(1);
  return rows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] !== undefined ? row[index] : "";
    });
    return obj;
  });
};

export default function ChatBot({ data, setResultData }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! Upload a sheet and ask me anything about it." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userQuery = input;

    setMessages((prev) => [...prev, { role: "user", text: userQuery }]);
    setInput("");

    if (!data || data.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Please upload a sheet before asking questions.",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const fullPrompt = getExcelAiPrompt(data, userQuery);

      const result = await model.generateContent(fullPrompt);
      const responseText = await result.response.text();

      // Clean the response to extract only the JSON object
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid response format from AI. Expected JSON.");
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);
      const { explanation, modifiedData } = parsedResponse;

      console.log(explanation);
      console.log(modifiedData);
      
      if (explanation) {
        setMessages((prev) => [...prev, { role: "bot", text: explanation }]);
      }

      if (modifiedData) {
        const formattedData = arrayToObject(modifiedData);
        setResultData(formattedData);
      }
    } catch (error) {
      console.error("Gemini API or parsing error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ Sorry, I couldn't process that. Please try rephrasing.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 rounded-lg shadow-lg">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                msg.role === "user"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl max-w-xs shadow bg-white text-gray-600 italic">
              ⚙️ Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input fixed at bottom */}
      <div className="flex p-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-gray-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`ml-2 px-4 py-2 rounded-full text-white ${
            loading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}