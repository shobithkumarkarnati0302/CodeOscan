import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  return (
    <button
      aria-label="Toggle theme"
      className="h-9 w-9 inline-flex items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
      onClick={() => setDark((v) => !v)}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
