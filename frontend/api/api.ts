import axios from 'axios';
import { TrainingPlan, TrainingPlans } from '~/lib/types';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    // other configurations
});

// Function to get CSRF token from cookies
function getCsrfToken() {
    return document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken'))
        ?.split('=')[1];
}

// Add a request interceptor to include CSRF token
api.interceptors.request.use(config => {
    const token = getCsrfToken();
    if (token) {
        config.headers['X-CSRFToken'] = token;
    }
    return config;
});

// Export your API methods
export const fetchTrainingPlanSimple = async (): Promise<TrainingPlans> => {
    const res = await api.get('training_plan/');
    return res.data;
};

export const fetchTrainingPlan = async (slug: string): Promise<TrainingPlan> => {
    const res = await api.get(`http://localhost:8000/api/training_plan/${slug}/`); 
    return res.data;
}

export const deleteTrainingPlan = async (slug: string) => {
    const res = await api.delete(`training_plan/${slug}/`);
    return res.data;
};

