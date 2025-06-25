import React, { useState, useEffect } from 'react';
import { Terminal, X, Play } from 'lucide-react';

interface ConsoleProps {
  isRunning: boolean;
}

export default function Console({ isRunning }: ConsoleProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isRunning) {
      setOutput(prev => [...prev, '> Running code...']);
      
      setTimeout(() => {
        setOutput(prev => [
          ...prev,
          '[0, 1]',
          '> Execution completed successfully',
          '> Time: 45ms, Memory: 12.3MB'
        ]);
      }, 2000);
    }
  }, [isRunning]);

  const clearConsole = () => {
    setOutput([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setOutput(prev => [...prev, `> ${input}`, 'Command executed']);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-gray-900 text-green-400 font-mono text-sm flex flex-col">
      {/* Console Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4" />
          <span className="text-gray-300">Console</span>
        </div>
        <button
          onClick={clearConsole}
          className="text-gray-400 hover:text-gray-200 transition-colors"
          title="Clear console"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Console Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {output.length === 0 ? (
          <div className="text-gray-500">
            Console output will appear here...
          </div>
        ) : (
          output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))
        )}
        {isRunning && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="animate-spin rounded-full h-3 w-3 border border-yellow-400 border-t-transparent"></div>
            <span>Executing...</span>
          </div>
        )}
      </div>

      {/* Console Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <span className="text-green-400">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none placeholder-gray-500"
            placeholder="Enter command..."
          />
          <button
            type="submit"
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            <Play className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}