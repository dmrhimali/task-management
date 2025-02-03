import React from "react";
import { Task } from "../types";


interface TaskItemProps {
    task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({task}) => {
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
        </div>
    )
};

export default TaskItem;