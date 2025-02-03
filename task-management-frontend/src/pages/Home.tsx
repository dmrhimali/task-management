import React, {useEffect, useState} from "react";
import { getAllTasks } from "../api/taskApi";
import { Task } from "../types";
import TaskItem from "../components/TaskItem";

const Home: React.FC = () =>  {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const tasksData = await getAllTasks();
            setTasks(tasksData);
          } catch (error) {
            console.error('Error fetching tasks:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTasks();
      }, []);

      if (loading) return <div>Loading tasks...</div>;

      return (
        <div>
          <h1>Task List</h1>
          <div>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      );

};

export default Home;