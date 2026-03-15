import React, { useState, useRef, useEffect, useContext } from "react";
import { RagContext } from "../../context/RagContext";

const ChatBot = ({ title = "AI Assistant" }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you with CampusEase today?" }
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const { askQuestion, loading, responses } = useContext(RagContext);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (responses.length > 0) {
      const lastResponse = responses[responses.length - 1];

      const isDuplicate = messages.some(
        msg => msg.type === "bot" && msg.text === lastResponse.answer
      );

      if (!isDuplicate) {
        setMessages(prev => [
          ...prev,
          {
            type: "bot",
            text: lastResponse.answer,
            formatted: true
          }
        ]);
      }
    }
  }, [responses]);

  /* ---------------- CLEAN RESPONSE ---------------- */

  const cleanResponse = (text) => {
    if (!text) return "";

    let cleaned = text;

    // remove markdown stars
    cleaned = cleaned.replace(/\*\*/g, "");
    cleaned = cleaned.replace(/\*/g, "");

    // normalize spaces
    cleaned = cleaned.replace(/\r/g, "");

    // merge lines like "Type:\nHostel"
    cleaned = cleaned.replace(/:\s*\n\s*/g, ": ");

    return cleaned;
  };

  /* ---------------- FORMAT RESPONSE ---------------- */

  const formatBotResponse = (text) => {
    const cleanedText = cleanResponse(text);

    const entries = cleanedText.split(/\n\s*\n/);

    return (
      <div className="space-y-3">
        {entries.map((entry, idx) => {
          const lines = entry.split("\n").filter(l => l.trim());

          return (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1"
            >
              {lines.map((line, i) => {
                if (line.includes(":")) {
                  const [key, ...valueParts] = line.split(":");
                  const value = valueParts.join(":").trim();

                  return (
                    <div key={i} className="flex">
                      <span className="font-semibold min-w-[130px]">
                        {key.trim()}:
                      </span>
                      <span className="ml-2">{value}</span>
                    </div>
                  );
                }

                return <div key={i}>{line}</div>;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      type: "user",
      text: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      await askQuestion(input.trim());
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          text: "Something went wrong. Please try again."
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const clearChat = () => {
    setMessages([
      { type: "bot", text: "Hello! How can I assist you with CampusEase today?" }
    ]);
  };

  /* ---------------- RENDER MESSAGE ---------------- */

  const renderMessage = (msg) => {
    if (msg.type === "user") {
      return <div className="whitespace-pre-wrap text-sm">{msg.text}</div>;
    }

    if (msg.formatted) {
      return formatBotResponse(msg.text);
    }

    return <div className="whitespace-pre-wrap text-sm">{msg.text}</div>;
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-primary text-white p-4 rounded-full shadow-lg"
        >
          <span className="material-symbols-outlined">chat</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[400px] flex flex-col h-[600px] border border-gray-200">

          {/* HEADER */}

          <div className="bg-primary text-white px-4 py-3 flex justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <h2>{title}</h2>
            </div>

            <div className="flex gap-2">
              <button onClick={clearChat}>
                <span className="material-symbols-outlined">refresh</span>
              </button>

              <button onClick={toggleChat}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          {/* MESSAGES */}

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl ${msg.type === "user"
                      ? "bg-primary text-white"
                      : "bg-white shadow-sm"
                    }`}
                >
                  {renderMessage(msg)}

                  {msg.timestamp && (
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex">
                <div className="bg-white px-4 py-3 rounded-xl shadow">
                  AI is typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* INPUT */}

          <div className="border-t p-3">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm resize-none"
                rows="1"
              />

              <button
                onClick={sendMessage}
                className="bg-primary text-white px-4 rounded-lg"
              >
                <span className="material-symbols-outlined text-sm">
                  send
                </span>
              </button>
            </div>

            {/* QUICK BUTTONS */}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() =>
                    setInput("Show me available accommodations")
                  }
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  🏠 Available accommodations
                </button>

                <button
                  onClick={() =>
                    setInput("What vehicles are for rent?")
                  }
                  className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                >
                  🚗 Vehicles
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;