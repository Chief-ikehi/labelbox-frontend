import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Your Django backend URL

export const fetchProjects = async () => {
    const response = await axios.get(`${API_URL}/projects/`);
    return response.data;
};

// Function to fetch tasks
export const fetchTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
};

// Function to save annotations
export const saveAnnotation = async (taskId, annotationData) => {
    try {
        const response = await axios.post(`${API_URL}/tasks/`, {
            id: taskId,
            annotations: annotationData,  // Send annotations here
        });
        return response.data;
    } catch (error) {
        console.error("Error saving annotation:", error);
        throw error;  // Rethrow the error for handling in UI
    }
};
