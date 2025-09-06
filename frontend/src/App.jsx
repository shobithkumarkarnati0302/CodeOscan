import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            <AppRoutes />
          </div>
        </main>
        <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="font-semibold">CodeOscan</span>
                <span>© 2025 All rights reserved</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
