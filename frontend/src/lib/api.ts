const API_BASE = 'http://localhost:3000';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Demo-Mode': 'true',
      ...options.headers,
    },
  });
  return res.json();
}

export const api = {
  getStatus: () => apiFetch('/api/protection/status'),
  activate: () => apiFetch('/api/protection/activate', { method: 'POST' }),
  deactivate: () => apiFetch('/api/protection/deactivate', { method: 'POST' }),
  analyze: (text: string, platform = 'twitter') =>
    apiFetch('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ text, platform }),
    }),
  analyzeBatch: (items: Array<{ id: string; text: string }>) =>
    apiFetch('/api/analyze/batch', {
      method: 'POST',
      body: JSON.stringify({ items, platform: 'twitter' }),
    }),
  getLogs: (page = 1, pageSize = 20) =>
    apiFetch(`/api/logs?page=${page}&pageSize=${pageSize}`),
  getStats: () => apiFetch('/api/logs/stats'),
};
