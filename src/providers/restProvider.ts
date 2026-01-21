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

        // --- TRADUCTOR AUTOMÁTICO ---
        // Normalizamos los datos para que React Admin no sufra
        const data = (json.content || []).map((item: any) => ({
            ...item,
            // 1. Si no hay 'id' pero hay 'studentId', úsalo como ID
            id: item.id || item.studentId,
            // 2. Si no hay 'name' pero hay 'label', úsalo como Name
            name: item.name || item.label,
        }));
        // ----------------------------

        return {
            data: data,
            total: json.totalElements || data.length || 0,
        };
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: { ...json, id: json.id || json.studentId, name: json.name || json.label },
        })),

    getMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`))
        ).then(responses => ({
            data: responses.map(({ json }) => ({ 
                ...json, 
                id: json.id || json.studentId, 
                name: json.name || json.label 
            }))
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
        if (params.filter) {
            Object.keys(params.filter).forEach(key => query.append(key, params.filter[key]));
        }
        const url = `${apiUrl}/${resource}?${query.toString()}`;
        const { json } = await httpClient(url);
        
        const data = (json.content || []).map((item: any) => ({
            ...item,
            id: item.id || item.studentId,
            name: item.name || item.label,
        }));

        return {
            data: data,
            total: json.totalElements || data.length || 0,
        };
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) =>
        Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(params.data) })))
        .then((responses) => ({ data: responses.map(({ json }) => json.id) })),

    delete: (resource, params) => httpClient(`${apiUrl}/${resource}/${params.id}`, { method: 'DELETE' }).then(({ json }) => ({ data: json })),
    deleteMany: (resource, params) => Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`, { method: 'DELETE' }))).then((responses) => ({ data: responses.map(({ json }) => json.id) })),
};