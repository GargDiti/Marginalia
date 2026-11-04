import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) { const [user, setUser] = useState(null); const [ready, setReady] = useState(false);
  useEffect(() => { const token = localStorage.getItem('marginalia_token'); if (!token) { setReady(true); return; } try { JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); } catch { localStorage.removeItem('marginalia_token'); setReady(true); return; } api.get('/auth/me').then(r => setUser(r.data.user)).catch(() => localStorage.removeItem('marginalia_token')).finally(() => setReady(true)); }, []);
  useEffect(() => { if (!user) return; const token = localStorage.getItem('marginalia_token'); if (!token) return; try { const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); const delay = payload.exp * 1000 - Date.now(); if (delay <= 0) { localStorage.removeItem('marginalia_token'); setUser(null); return; } const timer = setTimeout(() => { localStorage.removeItem('marginalia_token'); setUser(null); }, delay); return () => clearTimeout(timer); } catch { localStorage.removeItem('marginalia_token'); setUser(null); } }, [user]);
  useEffect(() => { const clear = () => setUser(null); window.addEventListener('marginalia:logout', clear); return () => window.removeEventListener('marginalia:logout', clear); }, []);
  const authenticate = (data) => { localStorage.setItem('marginalia_token', data.token); setUser(data.user); };
  const logout = () => { localStorage.removeItem('marginalia_token'); setUser(null); };
  return <AuthContext.Provider value={{ user, ready, authenticate, logout, setUser }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
