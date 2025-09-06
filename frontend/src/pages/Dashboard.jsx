import { useEffect, useState } from 'react';
import api from '../api/client';
import { PROGRAMMING_LANGUAGES } from '../constants';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { Tooltip } from '../components/ui/Tooltip';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import CodeBlock from '../components/ui/CodeBlock';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [explanationLevel, setExplanationLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filterLang, setFilterLang] = useState('all');
  const [error, setError] = useState('');

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/api/analysis', { params: { language: filterLang } });
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load history');
    }
  };

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/analysis', { title, language, code, explanationLevel });
      // Prepend a synthetic item to the list
      setItems((prev) => [
        {
          _id: Math.random().toString(36).slice(2),
          title: title || `Analysis for ${language}`,
          language,
          codeSnippet: code,
          timeComplexity: data.timeComplexity,
          spaceComplexity: data.spaceComplexity,
          explanation: data.explanation,
          improvementSuggestions: data.improvementSuggestions,
          createdAt: new Date().toISOString(),
          isFavorite: false,
          userNotes: '',
        },
        ...prev,
      ]);
      setTitle('');
      setLanguage('');
      setCode('');
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await api.patch(`/api/analysis/${id}/favorite`);
      setItems((prev) => prev.map((it) => it._id === id ? { ...it, isFavorite: !it.isFavorite } : it));
    } catch (err) {
      setError('Failed to update favorite');
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/api/analysis/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch (err) {
      setError('Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Analyze Code</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4" aria-busy={loading}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Title (optional)</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., My Sorting Algorithm" disabled={loading} />
              </div>
              <div>
                <label className="block text-sm mb-1">Language</label>
                <Select value={language} onChange={(e) => setLanguage(e.target.value)} required disabled={loading}>
                  <option value="" disabled>Select a language</option>
                  {PROGRAMMING_LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 flex items-center gap-2">
                Explanation Level
                <Tooltip content="Choose how detailed you want the AI analysis to be">
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Tooltip>
              </label>
              <Select value={explanationLevel} onChange={(e) => setExplanationLevel(e.target.value)} disabled={loading} className="transition-all duration-300 hover:border-blue-400 focus:border-blue-500">
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Deep</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm mb-1 flex items-center gap-2">
                Code
                <Tooltip content="Paste your code snippet here for AI-powered complexity analysis">
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Tooltip>
              </label>
              <Textarea 
                id="code-textarea"
                className="font-mono min-h-[160px] transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                required 
                placeholder="Paste your code here..." 
                disabled={loading} 
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="inline-flex items-center gap-2">
              {loading && <Spinner />}
              {loading ? 'Analyzing…' : 'Analyze'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Analysis History</CardTitle>
          <div className="w-56">
            <Select value={filterLang} onChange={(e) => setFilterLang(e.target.value)}>
              <option value="all">All Languages</option>
              {PROGRAMMING_LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((it, index) => (
              <div 
                key={it._id} 
                className="rounded-lg border border-gray-200 p-5 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white shadow-sm hover:shadow-lg transition-all duration-300 animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-800">{it.title || 'Untitled Analysis'}</h3>
                      {it.isFavorite && (
                        <span className="text-yellow-500 animate-bounce-custom">⭐</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{it.language}</Badge>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {new Date(it.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleFavorite(it._id)}
                      className={`${it.isFavorite ? 'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100' : ''} transition-colors duration-200`}
                    >
                      {it.isFavorite ? '⭐ Favorited' : '☆ Favorite'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeItem(it._id)} 
                      className="text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  {/* Code Snippet with Syntax Highlighting */}
                  {it.codeSnippet && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Code Snippet
                      </h4>
                      <CodeBlock 
                        code={it.codeSnippet} 
                        language={it.language} 
                        title={`${it.language} Code`}
                        className="shadow-lg"
                      />
                    </div>
                  )}

                  {/* Complexity Information */}
                  <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">⏱️ Time Complexity:</span>
                      <code className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono font-semibold">{it.timeComplexity || 'N/A'}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">💾 Space Complexity:</span>
                      <code className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-mono font-semibold">{it.spaceComplexity || 'N/A'}</code>
                    </div>
                  </div>

                  {/* Analysis Explanation */}
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Analysis Explanation
                    </h4>
                    <p className="text-sm text-blue-800 whitespace-pre-line leading-relaxed">{it.explanation}</p>
                  </div>

                  {/* Optimization Suggestions */}
                  {it.improvementSuggestions && (
                    <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-400">
                      <h4 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Optimization Suggestions
                      </h4>
                      <p className="text-sm text-emerald-800 whitespace-pre-line leading-relaxed">{it.improvementSuggestions}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && items.length === 0 && <LoadingSkeleton />}
            {!loading && items.length === 0 && (
              <div className="text-center py-12 animate-fadeIn">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses yet</h3>
                <p className="text-gray-600 mb-6">Start by analyzing your first piece of code above!</p>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  Paste code, select language, and click Analyze
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Floating Action Button for Quick Analysis */}
      <FloatingActionButton
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        }
        onClick={() => {
          document.getElementById('code-textarea')?.focus();
          document.getElementById('code-textarea')?.scrollIntoView({ behavior: 'smooth' });
        }}
        tooltip="Quick Analyze"
      />
    </div>
  );
}

export default Dashboard;
