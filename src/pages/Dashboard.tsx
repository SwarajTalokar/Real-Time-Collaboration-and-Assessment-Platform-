import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Code,
  Clock,
  TrendingUp,
  BookOpen,
  PlayCircle,
  Calendar,
  Award
} from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Active Sessions', value: '12', icon: Users, color: 'bg-blue-500' },
    { name: 'Problems Solved', value: '248', icon: Code, color: 'bg-green-500' },
    { name: 'Total Users', value: '1,234', icon: Users, color: 'bg-purple-500' },
    { name: 'Success Rate', value: '87%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const recentSessions = [
    {
      id: 1,
      candidate: 'John Doe',
      interviewer: 'Sarah Johnson',
      problem: 'Two Sum',
      status: 'completed',
      score: 85,
      date: '2025-01-16'
    },
    {
      id: 2,
      candidate: 'Alice Smith',
      interviewer: 'Mike Wilson',
      problem: 'Binary Tree Traversal',
      status: 'in-progress',
      score: null,
      date: '2025-01-16'
    },
    {
      id: 3,
      candidate: 'Bob Brown',
      interviewer: 'Sarah Johnson',
      problem: 'Dynamic Programming',
      status: 'scheduled',
      score: null,
      date: '2025-01-17'
    }
  ];

  const quickActions = [
    { name: 'Start New Session', href: '/editor', icon: PlayCircle, color: 'bg-blue-600' },
    { name: 'Create Problem', href: '/problems', icon: BookOpen, color: 'bg-green-600' },
    { name: 'Schedule Assessment', href: '/assessment', icon: Calendar, color: 'bg-purple-600' },
    { name: 'View Reports', href: '/reports', icon: Award, color: 'bg-orange-600' }
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening on your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.href}
                    className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg ${action.color} group-hover:scale-105 transition-transform`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-3 font-medium text-gray-900 dark:text-white">
                      {action.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Sessions
                </h2>
                <Link
                  to="/reports"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Candidate
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Problem
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Score
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentSessions.map((session) => (
                      <tr key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {session.candidate}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            with {session.interviewer}
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-900 dark:text-white">
                          {session.problem}
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            session.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : session.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {session.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-900 dark:text-white">
                          {session.score ? `${session.score}%` : '-'}
                        </td>
                        <td className="py-4 text-sm text-gray-500 dark:text-gray-400">
                          {session.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}