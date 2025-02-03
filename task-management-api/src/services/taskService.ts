import TaskModel, {Task} from "../models/taskModel";

class TaskService {
    async getAllTasks(): Promise<Task[]> {
        return TaskModel.getAllTasks()
    }

    async getTaskById(id: number): Promise<Task | undefined> {
        return TaskModel.getTaskById(id)
    }

    async createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
        return TaskModel.createTask(taskData)
    }

    async updateTask(id: number, task: Partial<Task>): Promise<void> {
        return TaskModel.updateTask(id, task);
    }

    async deleteTask(id:number): Promise<void>{
        return TaskModel.deleteTask(id)
    }
}

export default new TaskService();