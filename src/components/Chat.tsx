import React, { useState } from "react";
import { Send, Smile } from "lucide-react";

interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: string;
  avatar: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Janvi Sawai",
      message: "Hi! Ready to start the coding session?",
      timestamp: "10:30 AM",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
    },
    {
      id: 2,
      user: "John Doe",
      message: "Yes, I'm ready. Should we start with the Two Sum problem?",
      timestamp: "10:31 AM",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
    },
    {
      id: 3,
      user: "Shrutika ",
      message: "Perfect! Take your time to read through the problem statement.",
      timestamp: "10:32 AM",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar:
          "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-800 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <h3 className="font-medium text-gray-900 dark:text-white">Team Chat</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          2 participants online
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            <img
              src={message.avatar}
              alt={message.user}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {message.user}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 dark:border-gray-600 p-4"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            type="submit"
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
