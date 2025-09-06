export default function Button({ children, variant = 'primary', size = 'md', className = '', as, ...props }) {
  const Component = as || 'button';
  const base = 'inline-flex items-center justify-center rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95';
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 focus:ring-emerald-500 shadow-lg hover:shadow-xl',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-blue-500 shadow-sm hover:shadow-md',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-blue-500'
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  return <Component className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</Component>;
}
