import React, { useState, useRef, useEffect, useContext } from "react";
import { RagContext } from "../../context/RagContext";

const ChatBot = ({ title = "AI Assistant" }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you with CampusEase today?" }
  ]);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (isOpen && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  /* ---------------- CLEAN RESPONSE ---------------- */

  const cleanResponse = (text) => {
    if (!text) return "";

    let cleaned = text;

    cleaned = cleaned.replace(/\*\*/g, "");
    cleaned = cleaned.replace(/\*/g, "");

    cleaned = cleaned.replace(/\r/g, "");

    cleaned = cleaned.replace(/:\s*\n\s*/g, ": ");

    return cleaned;
  };

  /* ---------------- PARSE ACCOMMODATION DATA ---------------- */

  const parseAccommodationData = (text) => {
    const accommodations = [];

    const parts = text.split(/\d+\.\s+\*\*Accommodation ID:\s*([^\n]+)\*\*/);

    for (let i = 1; i < parts.length; i += 2) {
      const id = parts[i];
      const content = parts[i + 1];

      if (id && content) {
        const acc = {
          id: id.trim(),
          name: "",
          type: "",
          monthlyRent: "",
          gender: "",
          rooms: "",
          beds: "",
          bathrooms: "",
          distanceToMain: "",
          distanceToJunction: "",
          amenities: []
        };

        const nameMatch = content.match(/Name:\s*([^\n]+)/);
        if (nameMatch) acc.name = nameMatch[1].trim();

        const typeMatch = content.match(/Type:\s*([^\n]+)/);
        if (typeMatch) acc.type = typeMatch[1].trim();

        const rentMatch = content.match(/Monthly Rent:\s*([^\n]+)/);
        if (rentMatch) acc.monthlyRent = rentMatch[1].trim();

        const genderMatch = content.match(/Gender:\s*([^\n]+)/);
        if (genderMatch) acc.gender = genderMatch[1].trim();

        const roomsMatch = content.match(/Rooms:\s*([^\n]+)/);
        if (roomsMatch) acc.rooms = roomsMatch[1].trim();

        const bedsMatch = content.match(/Beds:\s*([^\n]+)/);
        if (bedsMatch) acc.beds = bedsMatch[1].trim();

        const bathroomsMatch = content.match(/Bathrooms:\s*([^\n]+)/);
        if (bathroomsMatch) acc.bathrooms = bathroomsMatch[1].trim();

        const distMainMatch = content.match(/Distance from SUSL Main Gate:\s*([^\n]+)/);
        if (distMainMatch) acc.distanceToMain = distMainMatch[1].trim();

        const distJunctionMatch = content.match(/Distance from Pambahinna Junction:\s*([^\n]+)/);
        if (distJunctionMatch) acc.distanceToJunction = distJunctionMatch[1].trim();

        const amenitiesMatch = content.match(/Amenities:\s*([^\n]+)/);
        if (amenitiesMatch) {
          acc.amenities = amenitiesMatch[1].split(',').map(a => a.trim());
        }

        accommodations.push(acc);
      }
    }

    return accommodations;
  };

  /* ---------------- FORMAT ACCOMMODATION CARD ---------------- */

  const AccommodationCard = ({ accommodation }) => {
    const getGenderColor = (gender) => {
      return gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800';
    };

    const getTypeColor = (type) => {
      switch (type) {
        case 'villa':
          return 'bg-purple-100 text-purple-800';
        case 'other':
          return 'bg-green-100 text-green-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition-shadow duration-300">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{accommodation.name}</h3>
            <p className="text-xs text-gray-500 mt-1">ID: {accommodation.id}</p>
          </div>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGenderColor(accommodation.gender)}`}>
              {accommodation.gender === 'male' ? '👨 Male Only' : '👩 Female Only'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(accommodation.type)}`}>
              {accommodation.type}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">💰 Rent:</span>
            <span className="font-semibold text-primary">LKR {accommodation.monthlyRent}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">🛏️ Beds:</span>
            <span>{accommodation.beds}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">🚪 Rooms:</span>
            <span>{accommodation.rooms}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">🚽 Bathrooms:</span>
            <span>{accommodation.bathrooms}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm mb-1">
            <span className="text-gray-600">📍 Distances:</span>
          </div>
          <div className="pl-4 text-sm text-gray-600">
            <div>• SUSL Main Gate: {accommodation.distanceToMain}</div>
            <div>• Pambahinna Junction: {accommodation.distanceToJunction}</div>
          </div>
        </div>

        {accommodation.amenities.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-gray-600">✨ Amenities:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {accommodation.amenities.map((amenity, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  /* ---------------- FORMAT BOT RESPONSE ---------------- */

  const formatBotResponse = (text) => {
    const cleanedText = cleanResponse(text);

    if (cleanedText.includes("Accommodation ID:") && cleanedText.includes("Name:")) {
      const accommodations = parseAccommodationData(cleanedText);

      if (accommodations.length > 0) {
        return (
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
              <p className="text-sm text-blue-800 font-medium">
                🏠 Found {accommodations.length} accommodation(s) matching your criteria
              </p>
            </div>
            {accommodations.map((acc, idx) => (
              <AccommodationCard key={idx} accommodation={acc} />
            ))}
          </div>
        );
      }
    }

    if (cleanedText.includes("I can help you with") && cleanedText.includes("**")) {
      const lines = cleanedText.split('\n');
      const helpItems = [];

      for (let line of lines) {
        if (line.match(/^\d+\.\s/)) {
          helpItems.push(line.replace(/^\d+\.\s/, '').trim());
        }
      }

      if (helpItems.length > 0) {
        return (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="font-semibold text-green-800 mb-2">🤖 How I Can Help You:</p>
              <div className="space-y-2">
                {helpItems.map((item, idx) => {
                  const [title, ...descParts] = item.split(':');
                  const description = descParts.join(':').trim();

                  return (
                    <div key={idx} className="border-l-2 border-green-400 pl-3">
                      <p className="font-medium text-gray-800">{title}</p>
                      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
    }

    const paragraphs = cleanedText.split(/\n\s*\n/);

    return (
      <div className="space-y-2">
        {paragraphs.map((paragraph, idx) => {
          const lines = paragraph.split('\n').filter(l => l.trim());

          if (lines.length === 1) {
            return <p key={idx} className="text-sm text-gray-700">{lines[0]}</p>;
          }

          return (
            <div key={idx} className="space-y-1">
              {lines.map((line, i) => {
                if (line.match(/^\d+\.\s/)) {
                  return (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">{line.split('.')[0]}.</span>
                      <span className="text-sm text-gray-700">{line.substring(line.indexOf('.') + 1)}</span>
                    </div>
                  );
                }

                if (line.includes(':')) {
                  const [key, value] = line.split(':');
                  return (
                    <div key={i} className="flex items-baseline gap-2">
                      <span className="font-semibold text-gray-800 min-w-[100px]">{key.trim()}:</span>
                      <span className="text-sm text-gray-600">{value.trim()}</span>
                    </div>
                  );
                }

                return <p key={i} className="text-sm text-gray-700">{line}</p>;
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
      console.error("Error asking question:", err);
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
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
        >
          <span className="material-symbols-outlined">chat</span>
        </button>
      )}

      {isOpen && (
        <div
          ref={chatContainerRef}
          className="bg-white rounded-2xl shadow-2xl w-[450px] flex flex-col h-[650px] border border-gray-200"
        >
          {/* HEADER */}
          <div className="bg-primary text-white px-4 py-3 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <h2 className="font-semibold text-lg">{title}</h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="hover:bg-primary/20 p-1 rounded-full transition-all duration-300"
                title="Clear chat"
              >
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>

              <button
                onClick={toggleChat}
                className="hover:bg-primary/20 p-1 rounded-full transition-all duration-300"
                title="Close"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] px-4 py-2 rounded-2xl ${msg.type === "user"
                    ? "bg-primary text-white"
                    : "bg-white shadow-sm border border-gray-200"
                    }`}
                >
                  {renderMessage(msg)}

                  {msg.timestamp && (
                    <div className={`text-xs mt-1 ${msg.type === "user" ? "text-white/70" : "text-gray-400"
                      }`}>
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
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-gray-200 px-4 py-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <span className="text-sm text-gray-600 ml-1">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* INPUT */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                rows="1"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-primary text-white px-4 rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-all duration-300 text-gray-700"
                >
                  Available accommodations
                </button>

                <button
                  onClick={() =>
                    setInput("What vehicles are for rent?")
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-all duration-300 text-gray-700"
                >
                  Available Vehicles
                </button>

                <button
                  onClick={() =>
                    setInput("how you can help me")
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-all duration-300 text-gray-700"
                >
                  How can you help?
                </button>

                <button
                  onClick={() =>
                    setInput("How do I get verified on CampusEase?")
                  }
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-all duration-300 text-gray-700"
                >
                  Verification process
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