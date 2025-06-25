import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Download, Filter, TrendingUp, Users, Code, Clock, Award } from 'lucide-react';
import Layout from '../components/Layout';

const performanceData = [
  { date: '2025-01-10', sessions: 12, avgScore: 78, completionRate: 85 },
  { date: '2025-01-11', sessions: 15, avgScore: 82, completionRate: 88 },
  { date: '2025-01-12', sessions: 18, avgScore: 75, completionRate: 82 },
  { date: '2025-01-13', sessions: 22, avgScore: 79, completionRate: 86 },
  { date: '2025-01-14', sessions: 20, avgScore: 84, completionRate: 91 },
  { date: '2025-01-15', sessions: 25, avgScore: 81, completionRate: 89 },
  { date: '2025-01-16', sessions: 28, avgScore: 83, completionRate: 87 }
];

const languageData = [
  { name: 'JavaScript', value: 35, color: '#F7DF1E' },
  { name: 'Python', value: 28, color: '#3776AB' },
  { name: 'Java', value: 20, color: '#ED8B00' },
  { name: 'C++', value: 12, color: '#00599C' },
  { name: 'TypeScript', value: 5, color: '#3178C6' }
];

const difficultyData = [
  { difficulty: 'Easy', solved: 156, attempted: 180 },
  { difficulty: 'Medium', solved: 89, attempted: 125 },
  { difficulty: 'Hard', solved: 34, attempted: 78 }
];

const recentReports = [
  {
    id: 1,
    candidate: 'John Doe',
    interviewer: 'Sarah Johnson',
    position: 'Frontend Developer',
    date: '2025-01-16',
    score: 85,
    status: 'completed',
    problems: 3,
    duration: '45m'
  },
  {
    id: 2,
    candidate: 'Alice Smith',
    interviewer: 'Mike Wilson',
    position: 'Backend Developer',
    date: '2025-01-16',
    score: 92,
    status: 'completed',
    problems: 4,
    duration: '60m'
  },
  {
    id: 3,
    candidate: 'Bob Brown',
    interviewer: 'Sarah Johnson',
    position: 'Full Stack Developer',
    date: '2025-01-15',
    score: 78,
    status: 'completed',
    problems: 3,
    duration: '40m'
  }
];

export default function Reports() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('sessions');

  const stats = [
    { name: 'Total Sessions', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-600' },
    { name: 'Avg Score', value: '81.2%', change: '+5.2%', icon: Award, color: 'text-green-600' },
    { name: 'Completion Rate', value: '87.5%', change: '+3.1%', icon: TrendingUp, color: 'text-purple-600' },
    { name: 'Avg Duration', value: '47m', change: '-2m', icon: Clock, color: 'text-orange-600' }
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track performance and analyze assessment results
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs last period
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Performance Trends
              </h2>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="sessions">Sessions</option>
                <option value="avgScore">Average Score</option>
                <option value="completionRate">Completion Rate</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  formatter={(value, name) => [
                    typeof value === 'number' ? 
                      (name === 'sessions' ? value : `${value}%`) : value,
                    name === 'avgScore' ? 'Avg Score' : 
                    name === 'completionRate' ? 'Completion Rate' : 'Sessions'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Language Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Language Usage
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Difficulty Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Problem Difficulty Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={difficultyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="difficulty" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="attempted" fill="#E5E7EB" name="Attempted" />
              <Bar dataKey="solved" fill="#3B82F6" name="Solved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Reports */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Assessment Reports
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all reports
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Candidate</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Position</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Interviewer</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Score</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Problems</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Duration</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {report.candidate}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {report.position}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {report.interviewer}
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex px-2 py-1 text-sm font-medium rounded-full ${
                        report.score >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        report.score >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {report.score}%
                      </span>
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {report.problems}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {report.duration}
                    </td>
                    <td className="py-4 text-sm text-gray-600 dark:text-gray-400">
                      {report.date}
                    </td>
                    <td className="py-4">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}