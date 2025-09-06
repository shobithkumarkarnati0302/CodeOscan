export default function Select({ className = '', children, ...props }) {
  const base = 'w-full h-10 px-3 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
  return (
    <select className={`${base} ${className}`} {...props}>
      {children}
    </select>
  );
}
