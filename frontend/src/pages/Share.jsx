import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import CodeBlock from '../components/ui/CodeBlock';

function Share() {
  const { analysisId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/api/analysis/${analysisId}`);
        setItem(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [analysisId]);

  const getComplexityColor = (complexity) => {
    if (!complexity) return 'bg-gray-100 text-gray-700';
    const lower = complexity.toLowerCase();
    if (lower.includes('o(1)') || lower.includes('constant')) return 'bg-green-100 text-green-700 border-green-200';
    if (lower.includes('o(log') || lower.includes('logarithmic')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (lower.includes('o(n)') && !lower.includes('o(n²)') && !lower.includes('o(n^2)')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (lower.includes('o(n²)') || lower.includes('o(n^2)') || lower.includes('quadratic')) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (lower.includes('o(2^n)') || lower.includes('exponential')) return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-purple-100 text-purple-700 border-purple-200';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Analysis</h2>
          <p className="text-gray-600">Please wait while we fetch the shared analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-100 to-red-200 rounded-3xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Analysis Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md">{error}</p>
          <Button 
            as={Link} 
            to="/" 
            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="text-center animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Shared Analysis
          </h1>
          <p className="text-lg text-gray-600">View this read-only code analysis</p>
        </div>

        {/* Main Analysis Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getLanguageIcon(item.language)}</span>
                <span className="text-2xl font-semibold text-gray-800">
                  {item.title || 'Untitled Analysis'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  {item.language}
                </Badge>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Code Snippet Section */}
              <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code Snippet
                </h4>
                <CodeBlock 
                  code={item.codeSnippet} 
                  language={item.language} 
                  title={`Shared ${item.language} Analysis`}
                  className="shadow-xl"
                />
              </div>

              {/* Complexity Badges */}
              <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className={`px-4 py-3 rounded-xl border-2 ${getComplexityColor(item.timeComplexity)} shadow-sm`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">⏱️</span>
                    <span className="text-sm font-medium">Time Complexity</span>
                  </div>
                  <div className="font-mono text-lg font-semibold">{item.timeComplexity || 'N/A'}</div>
                </div>
                <div className={`px-4 py-3 rounded-xl border-2 ${getComplexityColor(item.spaceComplexity)} shadow-sm`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">💾</span>
                    <span className="text-sm font-medium">Space Complexity</span>
                  </div>
                  <div className="font-mono text-lg font-semibold">{item.spaceComplexity || 'N/A'}</div>
                </div>
              </div>

              {/* Analysis Details */}
              {item.explanation && (
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-400 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                  <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Analysis Explanation
                  </h4>
                  <p className="text-blue-700 leading-relaxed whitespace-pre-line">
                    {item.explanation}
                  </p>
                </div>
              )}

              {/* Improvement Suggestions */}
              {item.improvementSuggestions && (
                <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-400 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Optimization Suggestions
                  </h4>
                  <p className="text-emerald-700 leading-relaxed whitespace-pre-line">
                    {item.improvementSuggestions}
                  </p>
                </div>
              )}

              {/* User Notes */}
              {item.userNotes !== undefined && (
                <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-400 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                  <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    User Notes
                  </h4>
                  <p className="text-yellow-700 leading-relaxed whitespace-pre-line">
                    {item.userNotes || 'No notes added yet.'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              to="/" 
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to CodeOscan
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Analysis
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Want to create your own analysis?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Share;
