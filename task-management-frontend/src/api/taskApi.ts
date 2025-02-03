import axios from 'axios';
import { Task } from '../types';

const API_URL =  process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getAllTasks = async(): Promise<Task[]> => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data
    } catch (error) {
        console.error("Error fetching tasks.", error);
        throw error;
    }
};

export const createTask = async(task: Omit<Task, 'id'|'created_at'| 'updated_at'>): Promise<Task> => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task);
        return response.data
    } catch (error) {
        console.error("Error creating tasks.", error);
        throw error;
    }
};

export const updateTask = async(id: number, task: Partial<Task>): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    } catch (error) {
        console.error("Error updating tasks.", error);
        throw error;
    }
};

export const deleteTask = async(id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
        console.error("Error deleting tasks.", error);
        throw error;
    }
};