export default function Badge({ children, variant = 'neutral', className = '' }) {
  const variants = {
    neutral: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${variants[variant] || variants.neutral} ${className}`}>
      {children}
    </span>
  );
}
