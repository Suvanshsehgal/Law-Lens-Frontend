const API_BASE = import.meta.env.VITE_AI_API_URL || "http://127.0.0.1:8000";
const AUTH_BASE = import.meta.env.VITE_AUTH_API_URL || "http://localhost:5000";

export async function uploadPDF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/pdf/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "PDF upload failed");
  }

  return response.json();
}

export async function askQuestion({ session_id, query }) {
  const response = await fetch(`${API_BASE}/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id,
      query,
    }),
  });

  if (!response.ok) {
    console.log(await response.text());
    throw new Error("Chat request failed");
  }

  return response.json();
}

export function getHighlightedPDFUrl(session_id) {
  return `${API_BASE}/pdf/download/highlighted/${session_id}`;
}

// Auth API functions
export async function loginUser(credentials) {
  const response = await fetch(`${AUTH_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
}

export async function signupUser(userData) {
  const response = await fetch(`${AUTH_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Signup failed");
  }

  return response.json();
}

export async function getMe() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${AUTH_BASE}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unauthorized");
  }

  return data;
}
