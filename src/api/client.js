// Thin fetch wrapper around the FlyDesk API. Returns `data` and throws a
// normalized Error({ message, status, details }) on failure.
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

async function request(path, { method = 'GET', body, signal } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal,
    });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw Object.assign(new Error('Network error. Please check your connection and try again.'), { status: 0 });
  }

  let json = null;
  try { json = await res.json(); } catch { /* empty body */ }

  if (!res.ok || (json && json.success === false)) {
    const err = new Error((json && json.error && json.error.message) || `Request failed (${res.status})`);
    err.status = res.status;
    err.details = json && json.error && json.error.details;
    throw err;
  }
  return json ? { data: json.data, meta: json.meta } : { data: null };
}

export const api = {
  bootstrap: () => request('/public/bootstrap'),
  services: () => request('/public/services'),
  service: (slug) => request(`/public/services/${slug}`),
  page: (slug) => request(`/public/pages/${slug}`),
  testimonials: () => request('/public/testimonials'),
  faqs: (params = '') => request(`/public/faqs${params}`),
  achievements: () => request('/public/achievements'),
  articles: (query = '') => request(`/public/articles${query}`),
  article: (slug) => request(`/public/articles/${slug}`),
  routeSeo: (key) => request(`/public/seo/${key}`),
  submitInquiry: (payload) => request('/inquiries', { method: 'POST', body: payload }),
};

export { BASE };
