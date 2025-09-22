import React, { useState, useEffect, useRef } from 'react';

// Main App Component
const App = () => {
  // State Management
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to ChatIITD! How can I help you today?', sender: 'bot' },
    { id: 2, text: 'You can ask me about campus facilities, events, or general information.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom of the message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // --- MOCK API CALL ---
  // This simulates a bot response after a delay.
  const getBotResponse = (userMessage) => {
    setTimeout(() => {
      const responses = [
        "That's a great question! I'm still learning, but I'll do my best to find out.",
        "Interesting point. Let me check the IITD database for you.",
        "Thanks for asking! For official information, please check the IIT Delhi website.",
        "I'm not sure I understand. Could you rephrase that?",
        "Searching for information about '" + userMessage + "'..."
      ];
      const botMessage = {
        id: Date.now(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsSending(false);
    }, 1500);
  };
  // --- END MOCK API CALL ---


  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isSending) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    setIsSending(true);
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    // Get a response from the bot
    getBotResponse(inputValue);
  };


  // --- UI COMPONENTS ---

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-md w-full p-4 flex items-center z-10 sticky top-0">
      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png" alt="IITD Logo" className="h-10 w-10 mr-4"/>
      <div>
        <h1 className="text-xl font-bold text-gray-800">ChatIITD</h1>
        <p className="text-sm text-green-500 flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            Online
        </p>
      </div>
    </header>
  );

  // Message Bubble Component
  const MessageBubble = ({ message }) => {
    const isBot = message.sender === 'bot';
    return (
      <div className={`flex items-end mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
         {isBot && <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-bold text-sm flex-shrink-0">D</div>}
        <div
          className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${
            isBot
              ? 'bg-gray-100 text-gray-800 rounded-bl-none'
              : 'bg-blue-500 text-white rounded-br-none'
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  };

  // Message Input Form Component
  const MessageInput = () => (
    <div className="bg-white p-4 border-t border-gray-200 sticky bottom-0">
      <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || inputValue.trim() === ''}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center w-12 h-12"
        >
          {isSending ? (
            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          )}
        </button>
      </form>
    </div>
  );

  // Main Render
  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
           {isSending && (
            <div className="flex items-end mb-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-bold text-sm flex-shrink-0">D</div>
               <div className="px-4 py-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <MessageInput />
    </div>
  );
};

export default App;