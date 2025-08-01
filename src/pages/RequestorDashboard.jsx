import  { useState, useEffect } from 'react'
import { Activity, CheckCircle, Clock, BarChart3, MessageCircle, Settings } from 'lucide-react'
import Layout from '../components/Layout'
import MessagingSystem from '../components/MessagingSystem'
import { useAuth } from '../context/AuthContext' 

const   RequestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('workflow')
  const [analysisResults, setAnalysisResults] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [sharedRankings, setSharedRankings] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const savedResults = localStorage.getItem('analysisResults')
    if (savedResults) {
      setAnalysisResults(JSON.parse(savedResults))
    }
    
    const requestorNotifications = JSON.parse(localStorage.getItem('requestorNotifications') || '[]')
    setNotifications(requestorNotifications)
    
    const rankings = requestorNotifications.flatMap(n => n.csvData || [])
    setSharedRankings(rankings)
  }, [])  

   const sidebarItems = [
    { name: 'Workflow Status', icon: Activity, active: activeTab === 'workflow', onClick: () => setActiveTab('workflow') },
    { name: 'Ranking Tables', icon: BarChart3, active: activeTab === 'rankings', onClick: () => setActiveTab('rankings') },
    { name: 'Resume Analysis', icon: BarChart3, active: activeTab === 'analysis', onClick: () => setActiveTab('analysis') },
    { name: 'Communication', icon: MessageCircle, active: activeTab === 'communication', onClick: () => setActiveTab('communication') },
    { name: 'Settings', icon: Settings, active: activeTab === 'settings', onClick: () => setActiveTab('settings') }
  ] 

  const workflowSteps = [
    { name: 'JD Uploaded', completed: true, timestamp: '2024-01-15 09:00 AM', icon: CheckCircle },
    { name: 'Resumes Analyzed', completed: true, timestamp: '2024-01-15 10:30 AM', icon: CheckCircle },
    { name: 'Candidates Ranked', completed: true, timestamp: '2024-01-15 11:15 AM', icon: CheckCircle },
    { name: 'Emails Sent', completed: false, timestamp: null, icon: Clock }
  ]

  const topMatches = [
    { name: 'Alex Thompson', email: 'alex@example.com', score: 94, reason: 'Perfect skill match with 5+ years experience' },
    { name: 'Maria Rodriguez', email: 'maria@example.com', score: 91, reason: 'Strong technical background and leadership skills' },
    { name: 'David Kim', email: 'david@example.com', score: 88, reason: 'Excellent problem-solving abilities and team fit' }
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'workflow':
        return (
          <div className="space-y-6">
                       <div className="card p-6 animate-fade-in"> 
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Workflow Progress</h3>
              <div className="space-y-6">
                {workflowSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <step.icon className={`w-5 h-5 ${
                        step.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {step.timestamp || 'Pending'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                {notifications.length > 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {notifications.length} new
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="font-medium text-blue-700 dark:text-blue-300">{notification.message}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">From: {notification.recruiterName} ({notification.recruiterId})</p>
                    <p className="text-xs text-blue-500">{new Date(notification.timestamp).toLocaleDateString()}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No new notifications</p>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top 3 Matches</h3>
              <div className="space-y-4">
                {topMatches.map((match, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{match.name}</h4>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                        {match.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{match.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{match.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) 
           case 'analysis':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Resume Analysis Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {analysisResults ? analysisResults.length : 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Resumes</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analysisResults ? analysisResults.filter(r => r.score >= 80).length : 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High Matches</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analysisResults ? Math.min(3, analysisResults.filter(r => r.score >= 85).length) : 0}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interview Ready</p>
                </div>
              </div>

              {analysisResults && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Analysis Results</h4>
                  {analysisResults.map((result, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{result.candidateName}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{result.email}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          result.score >= 85 ? 'bg-green-100 text-green-800' :
                          result.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {result.score}%
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Skills: {result.matchedSkills.join(', ')}</p>
                    </div>
                  ))}
                </div>
                           )}
            </div>
          </div>
        )
      case 'rankings':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Shared Resume Rankings</h3>
              
              {sharedRankings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Candidate Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Job Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Initial Score</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Recruiter Score</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date Applied</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sharedRankings
                        .sort((a, b) => (b.score || 0) - (a.score || 0))
                        .map((ranking, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="py-3 px-4 text-gray-900 dark:text-white">{ranking.candidateName}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{ranking.candidateEmail}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{ranking.jobRole}</td>
                          <td className="py-3 px-4 text-gray-900 dark:text-white">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded">
                              {ranking.score}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-900 dark:text-white">
                            {ranking.score ? (
                              <span className={`px-2 py-1 text-sm rounded ${
                                ranking.score >= 80 ? 'bg-green-100 text-green-800' :
                                ranking.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {ranking.score}%
                              </span>
                            ) : (
                              <span className="text-gray-400">Not scored</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-sm">
                            {new Date(ranking.timestamp).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No ranking tables received yet.</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Ranking Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{sharedRankings.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {sharedRankings.filter(r => r.score && r.score >= 80).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">High Scorers (≥80%)</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {sharedRankings.filter(r => r.score).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ranked Candidates</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'communication': 
        return (
          <div className="space-y-6">
            <MessagingSystem user={user} />
          </div>
        ) 
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">Content for {activeTab} coming soon...</p>
          </div>
        )
    }
  }

  return (
    <Layout sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AR Requestor Dashboard</h1>
        </div>
        {renderContent()}
      </div>
    </Layout>
  )
}

export default RequestorDashboard
 