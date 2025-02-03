import { Request,Response } from 'express';
import taskService from '../services/taskService';

class TaskController {
    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({error: "something went wrong!"});
        }
    }

    async getTaskById(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        try {
            const task  = await taskService.getTaskById(parseInt(id, 10));
            if(task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({message: "task with id ${id}not found"});
            }
        } catch (error) {
            res.status(500).json({error: "something went wrong!"});
        }
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const { title, description, status } = req.body

        const validStatuses: ("pending" | "in-progress" | "completed")[] = ["pending", "in-progress", "completed"];
    
        if (!validStatuses.includes(status as "pending" | "in-progress" | "completed")) {
            res.status(400).json({ error: "Invalid status value" });
            return;
        }

        try {
            const newTask = await taskService.createTask({ title, description,  status: status as "pending" | "in-progress" | "completed" });
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({error: "something went wrong!"});
        }
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const {id} = req.params
        const { title, description, status } = req.body

        const validStatuses: ("pending" | "in-progress" | "completed")[] = ["pending", "in-progress", "completed"];
    
        if (!validStatuses.includes(status as "pending" | "in-progress" | "completed")) {
            res.status(400).json({ error: "Invalid status value" });
            return;
        }

        try {
            await taskService.updateTask(parseInt(id, 10), { title, description,  status: status as "pending" | "in-progress" | "completed" });
            res.status(200).json({ message: 'Task updated' });
        } catch (error) {
            res.status(500).json({error: "something went wrong!"});
        }
    }

    async deleteTask(req: Request, res: Response): Promise<void> { 
        const { id } = req.params;
        try {
            await taskService.deleteTask(parseInt(id, 10));
            res.status(201).json({ message: 'Task deleted' });
        } catch (error) {
            res.status(500).json({error: "something went wrong!"});
        }
    }
}

export default new TaskController();