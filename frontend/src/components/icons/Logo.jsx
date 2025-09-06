export default function Logo({ className = "", size = 22 }) {
  return (
    <div className={`font-extrabold tracking-tight transition-all duration-300 ${className}`} style={{ fontSize: size }}>
      <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Code</span>
      <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">Oscan</span>
    </div>
  );
}
