import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://gizitrack.samuelcedric.com',
    headers: {
        'X-API-KEY': '634f9029-d458-457f-9940-4c51918fe40e',
    },
});

export const isAxiosError = axios.isAxiosError;
export default apiClient;