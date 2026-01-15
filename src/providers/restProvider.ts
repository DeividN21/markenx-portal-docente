import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL;

// Cliente HTTP personalizado para inyectar el Token
const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    
    // Se recupera el token guardado por el authProvider
    const authString = localStorage.getItem('auth');
    const token = authString ? JSON.parse(authString).access_token : null; // Keycloak devuelve 'access_token'

    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }

    return fetchUtils.fetchJson(url, options);
};

// Se exporta el provider configurado
export const restProvider = simpleRestProvider(apiUrl, httpClient);