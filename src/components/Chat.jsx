import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Chat() {
  const { id } = useParams();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    // Send a dummy response after a short delay
    const dummyResponse = "This is a dummy response from ChatGPT.";
    // Add the user's message to the messages array
    setMessages([...messages, { user: 'You', message: input }]);
    // Insert the dummy response before the user's message
    setMessages([{ user: 'ChatGPT', message: dummyResponse }, ...messages]);
    // Clear the input field
    setInput('');
  };

  return (
    <div className="relative">
     <div className="mt-4 text-left">
          <Link
            to="/"
            className="bg-gray-500 text-white p-3 rounded-l-lg hover:bg-gray-700"
          >
            👈  HomePage
          </Link>
        </div>
      <div className="max-w-4xl mx-auto pb-16"> 
        <div className="space-y-10">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col p-6 bg-gray-200 rounded-lg`}>
              <div className="flex flex-row ">
                <span className="text-black">{msg.message}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0  shadow-md p-4"> {/* Changed to bg-white for better contrast */}
        <div className="max-w-4xl mx-auto flex flex-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg text-black"
          />
          <button
            onClick={sendMessage}
            className="bg-gray-500 text-white p-2 rounded-r-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
