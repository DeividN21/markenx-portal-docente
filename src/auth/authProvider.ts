import { HttpError } from "react-admin";
// AuthProvider es un TIPO (solo definición), se usa 'import type'
import type { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // 1. LOGIN: Aquí es donde se enviarán las credenciales a Keycloak 
  login: async ({ username, password }) => {
    console.log("Intentando login con:", username);

    // SIMULACIÓN
    // En producción, aquí se haría el fetch al endpoint de token de Keycloak
    if (username === "admin@markenx.com" && password === "password") {
      // Se guarda un token falso
      localStorage.setItem("auth", JSON.stringify({ token: "mock-token-xyz" }));
      return Promise.resolve();
    }
    
    // Si falla:
    return Promise.reject(
      new HttpError("Credenciales inválidas (Usa: admin@markenx.com / password)", 401, {
        message: "Credenciales inválidas",
      })
    );

    /* --- CÓDIGO REAL PARA KEYCLOAK (Descomentar en integración) ---
    const request = new Request('https://TU-KEYCLOAK-URL/realms/markenx/protocol/openid-connect/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: 'markenx-admin',
            grant_type: 'password',
            username,
            password,
        }),
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
    });
    return fetch(request)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(auth => {
            localStorage.setItem('auth', JSON.stringify(auth));
        })
        .catch(() => {
            throw new Error('Error de red o credenciales');
        });
    */
  },

  // 2. LOGOUT: Se limpia el token
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  // 3. CHECK ERROR: Si la API devuelve 401 o 403, se cierra sesión
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // 4. CHECK AUTH: Se verifica si hay token al navegar
  checkAuth: () => {
    return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },

  // 5. PERMISSIONS: Para roles (Admin vs Docente), por ahora retornamos vacío
  getPermissions: () => Promise.resolve(),
};