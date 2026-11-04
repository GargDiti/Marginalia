import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) { const [theme, setTheme] = useState(localStorage.getItem('marginalia_theme') || 'light'); const [accent, setAccent] = useState(localStorage.getItem('marginalia_accent') || '#e8590c');
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.style.setProperty('--accent', accent); localStorage.setItem('marginalia_theme', theme); localStorage.setItem('marginalia_accent', accent); }, [theme, accent]);
  return <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent, toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
