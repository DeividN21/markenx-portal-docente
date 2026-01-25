import { fetchUtils } from 'react-admin';

const apiUrl = import.meta.env.VITE_API_URL;

const changeTermStatus = async (
    id: number,
    status: string
) => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth.access_token || auth.token;

    return fetchUtils.fetchJson(
        `${apiUrl}/academic-terms/${id}/status`,
        {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({ status }),
        }
    );
};

export { changeTermStatus }
