import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CodeBlock = ({ 
  code = '', 
  language = 'text', 
  title = '', 
  showLineNumbers = true, 
  copyable = true,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: 'text-yellow-400',
      python: 'text-blue-400',
      java: 'text-red-400',
      cpp: 'text-blue-300',
      'c++': 'text-blue-300',
      c: 'text-blue-300',
      html: 'text-orange-400',
      css: 'text-blue-500',
      php: 'text-purple-400',
      ruby: 'text-red-500',
      go: 'text-cyan-400',
      rust: 'text-orange-300',
      typescript: 'text-blue-400',
      swift: 'text-orange-400',
      kotlin: 'text-purple-300'
    };
    return colors[lang?.toLowerCase()] || 'text-green-400';
  };

  // Ensure we have valid code to display
  if (!code || code.trim() === '') {
    return (
      <div className={`relative group ${className}`}>
        <div className="bg-gray-800 rounded-lg p-4">
          <p className="text-gray-400 italic">No code to display</p>
        </div>
      </div>
    );
  }

  const lines = code.split('\n');

  return (
    <div className={`relative group ${className}`}>
      {/* Header */}
      {(title || copyable) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 rounded-t-lg">
          <div className="flex items-center gap-2">
            {title && (
              <span className="text-sm font-medium text-gray-300">{title}</span>
            )}
            <span className={`text-xs px-2 py-1 rounded ${getLanguageColor(language)} bg-gray-700`}>
              {language}
            </span>
          </div>
          {copyable && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded hover:bg-gray-700"
              title="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code Content */}
      <div className="relative overflow-x-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-lg">
        <pre className="text-sm leading-relaxed">
          <code className="block p-4">
            {showLineNumbers ? (
              <table className="w-full">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index} className="hover:bg-gray-800/50 transition-colors">
                      <td className="text-gray-500 text-right pr-4 py-0.5 select-none border-r border-gray-700 w-12">
                        {index + 1}
                      </td>
                      <td className="text-gray-100 pl-4 py-0.5 whitespace-pre-wrap font-mono">
                        {line || ' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-100 whitespace-pre-wrap font-mono">
                {code}
              </div>
            )}
          </code>
        </pre>

        {/* Copy button overlay for non-header version */}
        {copyable && !title && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 hover:text-white"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
