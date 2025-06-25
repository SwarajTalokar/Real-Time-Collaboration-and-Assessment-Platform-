import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Play,
  Save,
  Share2,
  Users,
  MessageCircle,
  Video,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import Layout from '../components/Layout';
import MonacoEditor from '../components/MonacoEditor';
import Console from '../components/Console';
import Chat from '../components/Chat';
import toast from 'react-hot-toast';

const languages = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' }
];

const defaultCode = {
  javascript: `// Two Sum Problem
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
  python: `# Two Sum Problem
def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []

# Test the function
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
  java: `// Two Sum Problem
import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] result = solution.twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // [0, 1]
    }
}`,
  cpp: `// Two Sum Problem
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        
        map[nums[i]] = i;
    }
    
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> result = twoSum(nums, 9);
    
    cout << "[" << result[0] << ", " << result[1] << "]" << endl; // [0, 1]
    return 0;
}`,
  typescript: `// Two Sum Problem
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

// Test the function
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`
};

export default function CodeEditor() {
  const { sessionId } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultCode.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeUsers] = useState([
    { id: 1, name: 'Sarah Johnson', color: 'bg-blue-500', cursor: { line: 12, column: 15 } },
    { id: 2, name: 'John Doe', color: 'bg-green-500', cursor: { line: 8, column: 22 } }
  ]);

  useEffect(() => {
    setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
  }, [selectedLanguage]);

  const handleRunCode = async () => {
    setIsRunning(true);
    toast.loading('Running code...', { id: 'run-code' });
    
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      toast.success('Code executed successfully!', { id: 'run-code' });
    }, 2000);
  };

  const handleSave = () => {
    toast.success('Code saved successfully!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Session link copied to clipboard!');
  };

  return (
    <Layout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Code Editor {sessionId && `- Session ${sessionId}`}
              </h1>
              
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              {/* Active Users */}
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div className="flex -space-x-2">
                  {activeUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800`}
                      title={user.name}
                    >
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>{isRunning ? 'Running...' : 'Run'}</span>
              </button>

              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </button>

              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Video className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Editor Panel */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <MonacoEditor
                language={selectedLanguage}
                value={code}
                onChange={setCode}
                activeUsers={activeUsers}
              />
            </div>
            
            {/* Console */}
            <div className="h-64 border-t border-gray-200 dark:border-gray-700">
              <Console isRunning={isRunning} />
            </div>
          </div>

          {/* Chat Panel */}
          {showChat && (
            <div className="w-80 border-l border-gray-200 dark:border-gray-700">
              <Chat />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}