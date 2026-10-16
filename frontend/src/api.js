const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || `Error del servidor (${response.status})`);
  }
  if (response.status === 204) return null;
  return response.json();
}

export const productsApi = {
  list: (search = "") => request(`/api/products${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  create: (product) => request("/api/products", { method: "POST", body: JSON.stringify(product) }),
  update: (id, product) => request(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(product) }),
  remove: (id) => request(`/api/products/${id}`, { method: "DELETE" }),
};
