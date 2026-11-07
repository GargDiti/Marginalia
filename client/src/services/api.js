import axios from 'axios';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api' });
export function mediaUrl(value) {
  if (!value) return '';
  try {
    const apiBase = api.defaults.baseURL || window.location.origin;
    const media = new URL(value, apiBase);
    const apiOrigin = new URL(apiBase, window.location.origin).origin;
    if (media.pathname.startsWith('/uploads/') && media.origin === window.location.origin && apiOrigin !== window.location.origin) {
      return new URL(media.pathname, apiOrigin).href;
    }
    return media.href;
  } catch {
    return value;
  }
}
api.interceptors.request.use((config) => { const token = localStorage.getItem('marginalia_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
api.interceptors.response.use((response) => response, (error) => { if (error.response?.status === 401 && localStorage.getItem('marginalia_token')) { localStorage.removeItem('marginalia_token'); window.dispatchEvent(new Event('marginalia:logout')); } return Promise.reject(error); });
export const messageOf = (error) => error?.response?.data?.message || 'Something went wrong. Please try again.';
