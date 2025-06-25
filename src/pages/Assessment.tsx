import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import Layout from "../components/Layout";
import MonacoEditor from "../components/MonacoEditor";
import toast from "react-hot-toast";

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  hidden: boolean;
}

interface AssessmentProblem {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLimit: number;
  testCases: TestCase[];
  starterCode: Record<string, string>;
}

const mockAssessment: AssessmentProblem = {
  id: 1,
  title: "Two Sum",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
Input: nums = [3,2,4], target = 6
Output: [1,2]

**Example 3:**
Input: nums = [3,3], target = 6
Output: [0,1]

**Example 4:**
Input: nums = [1,2,3,4,5], target = 8
Output: [2,4]

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
  difficulty: "Easy",
  timeLimit: 45,
  testCases: [
    {
      id: 1,
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
      hidden: false,
    },
    {
      id: 2,
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
      hidden: false,
    },
    {
      id: 3,
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
      hidden: false,
    },
    {
      id: 4,
      input: "nums = [1,2,3,4,5], target = 8",
      expectedOutput: "[2,4]",
      hidden: true,
    },
    {
      id: 5,
      input: "nums = [-1,-2,-3,-4,-5], target = -8",
      expectedOutput: "[2,4]",
      hidden: true,
    },
  ],
  starterCode: {
    javascript: `function twoSum(nums, target) {
    // Your solution here
}`,
    python: `def two_sum(nums, target):
    # Your solution here
    pass`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        return new int[]{};
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your solution here
        return {};
    }
};`,
  },
};

export default function Assessment() {
  const { assessmentId } = useParams();
  const [problem] = useState<AssessmentProblem>(mockAssessment);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problem.starterCode.javascript);
  const [timeRemaining, setTimeRemaining] = useState(problem.timeLimit * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestCase[]>(problem.testCases);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerActive(false);
      toast.error("Time's up! Assessment submitted automatically.");
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  React.useEffect(() => {
    setCode(
      problem.starterCode[selectedLanguage as keyof typeof problem.starterCode]
    );
  }, [selectedLanguage, problem.starterCode]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => setIsTimerActive(true);
  const pauseTimer = () => setIsTimerActive(false);
  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(problem.timeLimit * 60);
  };

  const runTests = async () => {
    setIsRunning(true);
    toast.loading("Running test cases...", { id: "run-tests" });

    // Simulate test execution
    setTimeout(() => {
      const updatedResults = testResults.map((testCase, index) => ({
        ...testCase,
        actualOutput: index < 3 ? testCase.expectedOutput : "[1,3]", // Mock some failures
        passed: index < 3,
      }));

      setTestResults(updatedResults);
      setShowResults(true);
      setIsRunning(false);

      const passedCount = updatedResults.filter((tc) => tc.passed).length;
      const totalCount = updatedResults.length;

      if (passedCount === totalCount) {
        toast.success(`All ${totalCount} test cases passed!`, {
          id: "run-tests",
        });
      } else {
        toast.error(`${passedCount}/${totalCount} test cases passed`, {
          id: "run-tests",
        });
      }
    }, 2000);
  };

  const submitAssessment = () => {
    toast.success("Assessment submitted successfully!");
    setIsTimerActive(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400";
      case "Medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Hard":
        return "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Layout>
      <div className="h-full flex">
        {/* Problem Description Panel */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Problem Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {problem.title}
              </h1>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span
                  className={`text-lg font-mono ${
                    timeRemaining < 300
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={isTimerActive ? pauseTimer : startTimer}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                >
                  {isTimerActive ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  <span>{isTimerActive ? "Pause" : "Start"}</span>
                </button>
                <button
                  onClick={resetTimer}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Reset Timer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Problem Description */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {problem.description}
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Editor Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>

              <div className="flex items-center space-x-3">
                <button
                  onClick={runTests}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>{isRunning ? "Running..." : "Run Tests"}</span>
                </button>

                <button
                  onClick={submitAssessment}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <MonacoEditor
              language={selectedLanguage}
              value={code}
              onChange={setCode}
              activeUsers={[]}
            />
          </div>

          {/* Test Results */}
          {showResults && (
            <div className="h-64 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Test Results
                </h3>
                <div className="space-y-3">
                  {testResults.map((testCase) => (
                    <div
                      key={testCase.id}
                      className={`p-3 rounded-lg border ${
                        testCase.passed
                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                          : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Test Case {testCase.id}{" "}
                          {testCase.hidden && "(Hidden)"}
                        </span>
                        {testCase.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      {!testCase.hidden && (
                        <div className="text-sm space-y-1">
                          <div className="text-gray-600 dark:text-gray-400">
                            <strong>Input:</strong> {testCase.input}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            <strong>Expected:</strong> {testCase.expectedOutput}
                          </div>
                          {testCase.actualOutput && (
                            <div className="text-gray-600 dark:text-gray-400">
                              <strong>Actual:</strong> {testCase.actualOutput}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
