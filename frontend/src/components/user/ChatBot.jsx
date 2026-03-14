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

  // Update messages when new responses come from context
  useEffect(() => {
    if (responses.length > 0) {
      const lastResponse = responses[responses.length - 1];
      
      // Check if this response is already in messages to avoid duplicates
      const isDuplicate = messages.some(
        msg => msg.type === "bot" && msg.text === lastResponse.answer
      );
      
      if (!isDuplicate) {
        const botMessage = {
          type: "bot",
          text: lastResponse.answer,
          rawText: lastResponse.answer,
          formatted: true
        };
        setMessages(prev => [...prev, botMessage]);
      }
    }
  }, [responses]);

  const formatBotResponse = (text) => {
    if (!text) return null;

    // Check if text contains a table (has pipe characters and newlines)
    const hasTable = text.includes('|') && text.includes('\n') && text.split('\n').some(line => line.includes('|'));
    
    // Check if text contains bullet points (lines starting with - or • or numbers)
    const hasBulletPoints = /^[-•]\s|\d+\.\s/m.test(text);
    
    // Check if text contains numbered steps
    const hasNumberedSteps = /\d+\.\s+\w+/m.test(text);
    
    // Check if text contains key-value pairs (e.g., "Name: value")
    const hasKeyValuePairs = /\w+:\s+\w+/m.test(text);

    if (hasTable) {
      // Format as table
      const rows = text.split('\n').filter(row => row.trim() && row.includes('|'));
      const headers = rows[0].split('|').map(h => h.trim()).filter(h => h);
      
      return (
        <div className="overflow-x-auto my-2">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {headers.map((header, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold border border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, i) => {
                const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
                return (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {cells.map((cell, j) => (
                      <td key={j} className="px-3 py-2 border border-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (hasBulletPoints || hasNumberedSteps) {
      // Format as bullet points or numbered list
      const lines = text.split('\n').filter(line => line.trim());
      
      // Check if it's a numbered list
      if (hasNumberedSteps) {
        return (
          <ol className="list-decimal pl-5 space-y-1 my-1">
            {lines.map((line, i) => {
              // Remove the number for display (ol will handle numbering)
              const cleanLine = line.replace(/^\d+\.\s*/, '');
              return <li key={i}>{cleanLine}</li>;
            })}
          </ol>
        );
      } else {
        // Bullet points
        return (
          <ul className="list-disc pl-5 space-y-1 my-1">
            {lines.map((line, i) => {
              // Remove bullet point markers for display
              const cleanLine = line.replace(/^[-•]\s*/, '');
              return <li key={i}>{cleanLine}</li>;
            })}
          </ul>
        );
      }
    } else if (hasKeyValuePairs) {
      // Format as key-value pairs
      const lines = text.split('\n').filter(line => line.trim());
      return (
        <div className="space-y-1 my-1">
          {lines.map((line, i) => {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();
            if (value) {
              return (
                <div key={i} className="flex">
                  <span className="font-semibold min-w-[100px]">{key.trim()}:</span>
                  <span className="ml-2">{value}</span>
                </div>
              );
            }
            return <p key={i}>{line}</p>;
          })}
        </div>
      );
    } else {
      // Regular text - split into paragraphs
      return text.split('\n\n').map((paragraph, i) => (
        <p key={i} className={i > 0 ? 'mt-3' : ''}>{paragraph}</p>
      ));
    }
  };

  const extractKeyInfo = (text) => {
    // Extract important information like prices, contact details, etc.
    const priceMatch = text.match(/(?:Rs\.?|LKR|₹)\s*\d+(?:,\d+)*(?:\.\d+)?/g);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
    const phoneMatch = text.match(/(?:\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g);
    
    return { prices: priceMatch, emails: emailMatch, phones: phoneMatch };
  };

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
    } catch (error) {
      console.error('Error in sendMessage:', error);
      const errorMessage = {
        type: "bot",
        text: "I encountered an error. Please try again or check your connection.",
        formatted: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => setIsOpen(prev => !prev);

  const clearChat = () => {
    setMessages([
      { type: "bot", text: "Hello! How can I assist you with CampusEase today?" }
    ]);
  };

  // Render message content based on type and format
  const renderMessageContent = (msg) => {
    if (msg.type === "user") {
      return <div className="whitespace-pre-wrap text-sm">{msg.text}</div>;
    } else {
      // Check if the message contains important information to highlight
      const { prices, emails, phones } = extractKeyInfo(msg.text);
      
      return (
        <div className="space-y-2">
          {msg.formatted ? (
            formatBotResponse(msg.text)
          ) : (
            <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
          )}
          
          {/* Highlight extracted information if present */}
          {(prices?.length > 0 || emails?.length > 0 || phones?.length > 0) && (
            <div className="mt-2 pt-2 border-t border-gray-200 text-xs">
              {prices?.length > 0 && (
                <div className="text-green-600">
                  💰 Prices: {prices.join(', ')}
                </div>
              )}
              {emails?.length > 0 && (
                <div className="text-blue-600">
                  📧 Emails: {emails.join(', ')}
                </div>
              )}
              {phones?.length > 0 && (
                <div className="text-purple-600">
                  📞 Phones: {phones.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Toggle Button with AI/Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center"
          aria-label="Open chat"
        >
          <span className="material-symbols-outlined text-2xl">
            chat
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[400px] flex flex-col h-[600px] overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined">
                smart_toy
              </span>
              <h2 className="font-semibold">{title}</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="hover:bg-primary-dark p-1 rounded transition-colors"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <span className="material-symbols-outlined text-sm">
                  refresh
                </span>
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-primary-dark p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <span className="material-symbols-outlined text-sm">
                  close
                </span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] ${
                    msg.type === "user"
                      ? "bg-primary text-white rounded-2xl rounded-tr-none"
                      : "bg-white text-gray-800 rounded-2xl rounded-tl-none shadow-sm"
                  } px-4 py-2`}
                >
                  {renderMessageContent(msg)}
                  
                  {/* Timestamp - optional */}
                  {msg.timestamp && (
                    <div className={`text-xs mt-1 ${
                      msg.type === "user" ? "text-primary-100" : "text-gray-400"
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-tl-none shadow-sm px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm max-h-32"
                rows="1"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`px-4 py-2 bg-primary text-white rounded-lg transition-all flex items-center justify-center ${
                  loading || !input.trim() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-primary-dark hover:shadow-md'
                }`}
                aria-label="Send message"
              >
                <span className="material-symbols-outlined text-sm">
                  send
                </span>
              </button>
            </div>
            
            {/* Quick suggestion chips */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => setInput("Show me available accommodations")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  🏠 Available accommodations
                </button>
                <button
                  onClick={() => setInput("What vehicles are for rent?")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  🚗 Vehicles for rent
                </button>
                <button
                  onClick={() => setInput("Tell me about CampusEase policies")}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  📋 Platform policies
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