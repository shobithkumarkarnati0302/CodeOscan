export function Card({ children, className = '', interactive = false }) {
  const interactiveClasses = interactive 
    ? 'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group' 
    : 'hover:shadow-md';
  
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${interactiveClasses} transition-all duration-300 animate-fadeIn ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`p-5 border-b ${className}`} {...props} />;
}

export function CardTitle({ className = '', ...props }) {
  return <h3 className={`text-xl font-semibold ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div className={`p-5 ${className}`} {...props} />;
}

export function CardFooter({ className = '', ...props }) {
  return <div className={`p-5 border-t ${className}`} {...props} />;
}
