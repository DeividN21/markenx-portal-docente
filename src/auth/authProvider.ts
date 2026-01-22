import type { AuthProvider } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL;

export const authProvider: AuthProvider = {
  // Redirige al BFF para OAuth (no usa formulario local)
  login: async () => {
    window.location.href = `${API_URL}/auth/login`;
    return Promise.resolve();
  },

  // Logout via POST form al BFF
  logout: async () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `${API_URL}/auth/logout`;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "redirect_uri";
    input.value = `${window.location.origin}/logged-out`;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();

    return Promise.resolve();
  },

  // Verifica sesión activa contra /auth/me
  checkAuth: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("No autenticado");
      }
      return Promise.resolve();
    } catch {
      window.location.href = `${API_URL}/auth/login`;
      return Promise.reject();
    }
  },

  // Maneja errores de autorización
  checkError: async (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      window.location.href = `${API_URL}/auth/login`;
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Obtiene identidad del usuario para mostrar en UI
  getIdentity: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error obteniendo identidad");
      }
      const data = await response.json();
      return {
        id: data.userId || data.id,
        fullName: data.fullName || data.name,
        email: data.email,
      };
    } catch {
      throw new Error("Error obteniendo identidad");
    }
  },

  // Obtiene permisos/roles del usuario
  getPermissions: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      return data.roles || [];
    } catch {
      return [];
    }
  },
};
