import { fetchUtils } from "react-admin";
import type { DataProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL;

const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const authString = localStorage.getItem('auth');
    if (authString) {
        const auth = JSON.parse(authString);
        const token = auth.access_token || auth.accessToken || auth.token;
        if (token) {
            options.headers.set('Authorization', `Bearer ${token}`);
        }
    }
    return fetchUtils.fetchJson(url, options);
};

// Función auxiliar para normalizar datos
const normalizeData = (item: any) => {
    return {
        ...item,
        id: item.id || item.studentId,
        name: item.name || item.label || item.fullName
    };
};

export const restProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = new URLSearchParams({
            page: (page - 1).toString(),
            size: perPage.toString(),
            sort: `${field},${order}`
        });

        if (params.filter) {
            Object.keys(params.filter).forEach(key => {
                query.append(key, params.filter[key]);
            });
        }
        
        const url = `${apiUrl}/${resource}?${query.toString()}`;
        const { json } = await httpClient(url);
        
        // Manejo de respuesta Spring Boot (Page<T>)
        if (json.content && Array.isArray(json.content)) {
            return { 
                data: json.content.map(normalizeData),
                total: json.totalElements 
            };
        }
        // Manejo de lista simple
        if (Array.isArray(json)) {
            return { 
                data: json.map(normalizeData), 
                total: json.length 
            };
        }
        
        return { data: [], total: 0 };
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: normalizeData(json),
        })),

    getMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`))
        ).then(responses => ({
            data: responses.map(({ json }) => normalizeData(json))
        }));
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = new URLSearchParams({
            page: (page - 1).toString(),
            size: perPage.toString(),
            sort: `${field},${order}`,
            [params.target]: params.id.toString()
        });
        const url = `${apiUrl}/${resource}?${query.toString()}`;
        const { json } = await httpClient(url);
        
        if (json.content) {
            return { 
                data: json.content.map(normalizeData), 
                total: json.totalElements 
            };
        }
        return { data: [], total: 0 };
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) => {
        // Limpiamos el ID para evitar el error "Duplicate entry"
        const { id, ...data } = params.data;
        // Limpiamos campos basura
        delete (data as any).lifecycleStatus;
        delete (data as any).createdAt;
        delete (data as any).updatedAt;
        
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }).then(({ json }) => ({ data: json }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),
};