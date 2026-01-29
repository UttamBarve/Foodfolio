const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiRequest = async (url, method = "GET", data, token) => {
  const options = {
    method,
    headers: {},
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  // If FormData → let browser set headers
  if (data instanceof FormData) {
    options.body = data;
  } 
  // Else normal JSON
  else if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const res = await fetch(`${API_BASE}${url}`, options);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Something went wrong");
  }

  return res.json();
};
