import { useEffect, useState } from 'react';
import api from '../api/client';
import { PROGRAMMING_LANGUAGES } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

function Profile() {
  const [items, setItems] = useState([]);
  const [filterLang, setFilterLang] = useState('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingNotes, setSavingNotes] = useState({});

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/analysis', { params: { language: filterLang } });
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLang]);

  const saveNotes = async (id, notes) => {
    setSavingNotes(prev => ({ ...prev, [id]: true }));
    try {
      await api.patch(`/api/analysis/${id}/notes`, { notes });
      setItems((prev) => prev.map((it) => it._id === id ? { ...it, userNotes: notes } : it));
    } catch (err) {
      setError('Failed to save notes');
    } finally {
      setSavingNotes(prev => ({ ...prev, [id]: false }));
    }
  };

  const getComplexityColor = (complexity) => {
    if (!complexity) return 'bg-gray-100 text-gray-700';
    const lower = complexity.toLowerCase();
    if (lower.includes('o(1)') || lower.includes('constant')) return 'bg-green-100 text-green-700';
    if (lower.includes('o(log') || lower.includes('logarithmic')) return 'bg-blue-100 text-blue-700';
    if (lower.includes('o(n)') && !lower.includes('o(n²)') && !lower.includes('o(n^2)')) return 'bg-yellow-100 text-yellow-700';
    if (lower.includes('o(n²)') || lower.includes('o(n^2)') || lower.includes('quadratic')) return 'bg-orange-100 text-orange-700';
    if (lower.includes('o(2^n)') || lower.includes('exponential')) return 'bg-red-100 text-red-700';
    return 'bg-purple-100 text-purple-700';
  };

  const getLanguageIcon = (language) => {
    const icons = {
      javascript: '🟨',
      python: '🐍',
      java: '☕',
      cpp: '⚡',
      c: '🔧',
      csharp: '#️⃣',
      php: '🐘',
      ruby: '💎',
      go: '🐹',
      rust: '🦀',
      typescript: '🔷',
      swift: '🍎',
      kotlin: '🎯'
    };
    return icons[language?.toLowerCase()] || '📝';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600">View and manage your code analysis history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{items.length}</div>
              <div className="text-sm text-blue-700">Total Analyses</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {new Set(items.map(item => item.language)).size}
              </div>
              <div className="text-sm text-emerald-700">Languages Used</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {items.filter(item => item.userNotes?.trim()).length}
              </div>
              <div className="text-sm text-purple-700">With Notes</div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis History */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Analysis History
              </CardTitle>
              <div className="w-full sm:w-64">
                <Select 
                  value={filterLang} 
                  onChange={(e) => setFilterLang(e.target.value)}
                  className="h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Languages</option>
                  {PROGRAMMING_LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-fadeIn">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-300 rounded w-16"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-full"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((it, index) => (
                  <div 
                    key={it._id} 
                    className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{getLanguageIcon(it.language)}</span>
                          <h3 className="text-xl font-semibold text-gray-800">
                            {it.title || 'Untitled Analysis'}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {it.language}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{new Date(it.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Complexity Badges */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(it.timeComplexity)}`}>
                        ⏱️ Time: {it.timeComplexity || 'N/A'}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(it.spaceComplexity)}`}>
                        💾 Space: {it.spaceComplexity || 'N/A'}
                      </div>
                    </div>

                    {/* Analysis Content */}
                    <div className="space-y-4">
                      {it.explanation && (
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Explanation
                          </h4>
                          <p className="text-blue-700 text-sm whitespace-pre-line leading-relaxed">
                            {it.explanation}
                          </p>
                        </div>
                      )}

                      {it.improvementSuggestions && (
                        <div className="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400">
                          <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Optimization Suggestions
                          </h4>
                          <p className="text-emerald-700 text-sm whitespace-pre-line leading-relaxed">
                            {it.improvementSuggestions}
                          </p>
                        </div>
                      )}

                      {/* Notes Section */}
                      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-yellow-800 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Your Notes
                          </h4>
                          {savingNotes[it._id] && (
                            <div className="flex items-center gap-1 text-xs text-yellow-600">
                              <svg className="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Saving...
                            </div>
                          )}
                        </div>
                        <Textarea
                          className="min-h-[100px] bg-white border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400"
                          defaultValue={it.userNotes || ''}
                          onBlur={(e) => saveNotes(it._id, e.target.value)}
                          placeholder="Add your personal notes, insights, or reminders here..."
                        />
                        <div className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Notes save automatically when you click outside the field
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {items.length === 0 && !loading && (
                  <div className="text-center py-12 animate-fadeIn">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No analyses yet</h3>
                    <p className="text-gray-500 mb-6">Start analyzing your code to see your history here</p>
                    <Button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                    >
                      Analyze Code Now
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
