import React, { useState } from 'react';
import { Task } from '../types';
import { createTask, updateTask } from '../api/taskApi';

interface TaskFormProps {
  existingTask?: Task; // Optional if editing an existing task
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask }) => {
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [status, setStatus] = useState(existingTask?.status || 'pending');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = { title, description, status };

    try {
      if (existingTask) {
        await updateTask(existingTask.id, taskData);
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value  as "pending" | "in-progress" | "completed" )}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button type="submit">{existingTask ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
};

export default TaskForm;
