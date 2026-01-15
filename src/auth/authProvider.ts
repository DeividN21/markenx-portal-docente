import { HttpError } from "react-admin";
import type { AuthProvider } from "react-admin";

// 1. LÓGICA MOCK
const mockAuthProvider: AuthProvider = {
    login: async ({ username, password }) => {
        if (username === "admin@markenx.com" && password === "password") {
            localStorage.setItem("auth", JSON.stringify({ token: "mock-token-xyz" }));
            return Promise.resolve();
        }
        return Promise.reject(new HttpError("Credenciales Mock inválidas", 401));
    },
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("auth");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.resolve(),
};

// 2. LÓGICA REAL (Conexión a Keycloak)
const realAuthProvider: AuthProvider = {
    login: async ({ username, password }) => {
        // Se obtienen las variables de entorno
        const tokenUrl = import.meta.env.VITE_KEYCLOAK_URL;
        const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

        const request = new Request(tokenUrl, {
            method: 'POST',
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'password', // Flujo: Resource Owner Password Credentials
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
                // Se guarda el token real que devuelve Keycloak
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Error de autenticación: Verifica Keycloak');
            });
    },
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("auth");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        // Verificar si el token JWT ha expirado
        return localStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
};

// 3. EXPORTACIÓN CONDICIONAL
// Si VITE_USE_MOCK es 'true', usa el Mock. Si no, usa el Real.
export const authProvider = import.meta.env.VITE_USE_MOCK === 'true' 
    ? mockAuthProvider 
    : realAuthProvider;