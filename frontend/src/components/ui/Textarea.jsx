export default function Textarea({ className = '', ...props }) {
  const base = 'w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
  return <textarea className={`${base} ${className}`} {...props} />;
}
