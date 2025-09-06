import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

function Home() {
  return (
    <div className="max-w-6xl mx-auto text-center space-y-12 animate-fadeIn">
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-medium text-emerald-600 tracking-wide uppercase animate-slideIn">CodeOscan</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Analyze Your Code's 
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Complexity</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            Get instant insights into your algorithm's time and space complexity with AI-powered analysis
          </p>
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <Button as={Link} to="/dashboard" size="lg" className="inline-flex items-center gap-3 text-lg px-8 py-4 shadow-xl hover:shadow-2xl">
            <span>Get Started</span>
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </div>
      </div>
      <section id="features" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-xl border bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-3 text-gray-900 font-semibold mb-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-lg">Instant Analysis</span>
          </div>
          <p className="text-gray-600 leading-relaxed">Paste your code and get comprehensive insights in seconds with our AI-powered engine.</p>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-white to-purple-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn" style={{ animationDelay: '1.0s' }}>
          <div className="flex items-center gap-3 text-gray-900 font-semibold mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-lg">Multiple Languages</span>
          </div>
          <p className="text-gray-600 leading-relaxed">Support for Python, JavaScript, Java, C++, and many more programming languages.</p>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-white to-green-50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <div className="flex items-center gap-3 text-gray-900 font-semibold mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-lg">AI-Powered</span>
          </div>
          <p className="text-gray-600 leading-relaxed">Advanced Gemini AI provides accurate complexity analysis and optimization suggestions.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
