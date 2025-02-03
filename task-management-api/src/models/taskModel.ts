import knex from '../config/database';


export interface Task {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: string;
}


class TaskModel {
    static async getAllTasks(): Promise<Task[]> {
        return knex('tasks').select('*');
    }

    static async getTaskById(id: number): Promise<Task | undefined> {
        return knex('tasks').where('id', id).first(); 
    }

    static async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
        const [newTask] = await knex('tasks').insert(task).returning('*');
        return newTask;
    } 

    static async updateTask(id: number, task: Partial<Task>): Promise<void> {
        await knex('tasks').where('id', id).update(task)
    }

    static async deleteTask(id: number): Promise<void> {
        await knex('tasks').where('id', id).del()
    }
}

export default TaskModel;