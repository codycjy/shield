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
