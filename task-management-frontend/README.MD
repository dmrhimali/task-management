Creating a production-grade TypeScript frontend project for our Task Management API involves several steps. Here's a guide that walks through setting up the project with proper tooling, structure, and configurations for a scalable application.

### **Steps to Set Up the Frontend Project**

We will create a frontend application using **React** (a popular JavaScript framework) and **TypeScript**. This frontend will interact with our existing Task Management API.

### **1. Initialize the Project**

#### Step 1.1: Initialize a New React Project with TypeScript

We will use **Create React App** to set up the project. This will give us a lot of useful configurations out of the box.

Run the following command to create a new React app:

```bash
npx create-react-app task-management-frontend --template typescript
```

This will set up a new React project with TypeScript already configured.

#### Step 1.2: Change to the Project Directory

Navigate to the `task-management-frontend` directory:

```bash
cd task-management-frontend
```

#### Step 1.3: Install Dependencies

Install necessary dependencies for development. These include `Axios` for HTTP requests, `React Router` for routing, and possibly other libraries for state management or form handling:

```bash
npm install axios react-router-dom
npm install --save-dev @types/react-router-dom
npm install --save-dev @types/react-dom
npm install --save-dev @types/node
npm install @testing-library/react @testing-library/jest-dom
npm install --save-dev @types/jest
npm install --save-dev jest
npm install web-vitals
npm install --save-dev @types/web-vitals
```

add `tsconfig.ts`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "es2015"],
    "jsx": "react",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node", "jest"], //allow using process.env calls, allow Jest's type definitions to properly included in  project
    "allowJs": true,
    "strict": true
  },
  "include": ["src"]
}
```

add logo.svg in /assets folder and add following file so typescript identify svg:

`task-management-frontend/src/declaration.d.ts`:
```js
declare module "*.svg" {
    const content: string;
    export default content;
}
```

### **2. Set Up the Project Structure**

Organize the project files in a way that is scalable. Here’s an example structure:

```
src/
|-- api/
|   |-- taskApi.ts          # Handles API requests to our backend
|
|-- components/
|   |-- TaskList.tsx        # Displays the list of tasks
|   |-- TaskItem.tsx        # Displays an individual task
|   |-- TaskForm.tsx        # Form for creating/updating tasks
|
|-- pages/
|   |-- Home.tsx            # Displays all tasks
|   |-- TaskDetail.tsx      # Shows task details
|
|-- utils/
|   |-- constants.ts        # Stores static values like API URLs
|
|-- App.tsx                 # Main application component
|-- index.tsx               # Entry point
|-- tsconfig.json           
|-- types.ts                # All the types and interfaces we can import into other parts of the application
```

### **3. Set Up Axios for API Requests**

Create a new file under `src/api/taskApi.ts` to handle communication with the backend API. Axios will be used to send requests to the backend.

#### `src/api/taskApi.ts`

```typescript
import axios from 'axios';
import { Task } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id' | 'created_at'>): Promise<Task> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/tasks/${id}`, task);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
```

### **4. Create Types for Task**

Create a `types.ts` file under `src/` to define our `Task` type, which will be used throughout the application.

#### `src/types.ts`

```typescript
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  created_at: string;
  updated_at: string;
}
```

### **5. Set Up Pages and Components**

Now, let’s create React components for the frontend pages and features:

#### `src/pages/Home.tsx`

This page will display the list of tasks.

```typescript
import React, { useEffect, useState } from 'react';
import { getAllTasks } from '../api/taskApi';
import { Task } from '../types';
import TaskItem from '../components/TaskItem';

const Home: React.FC = () => {
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
```

#### `src/components/TaskItem.tsx`

This component will display individual tasks.

```typescript
import React from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskItem;
```

#### `src/components/TaskForm.tsx`

This component will handle the creation and updating of tasks.

```typescript
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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
```

### **6. Set Up Routing**

We can use React Router to handle navigation between pages. Update `src/App.tsx` to include routes.

#### `src/App.tsx`

```typescript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/task/new" component={TaskForm} />
        <Route path="/task/:id/edit" component={TaskForm} />
      </Switch>
    </Router>
  );
};

export default App;
```

### **7. Set Up .env for API URL**

Create an `.env` file at the root of the project and define the API base URL:

```
REACT_APP_API_URL=http://localhost:3000/api
```

### **8. Start the Development Server**

Finally, run the development server:

```bash
npm start
```

The frontend application will now be running at `http://localhost:3000`.

### **9. Build the Project for Production**

To build the project for production:

```bash
npm run build
```

This will create a `build` directory containing the optimized production build, which we can deploy to a web server.

---

### **Summary of Key Features**

- **React with TypeScript**: Fully typed React application with TypeScript for better maintainability.
- **Axios for API requests**: Clean and structured HTTP requests to communicate with our backend API.
- **React Router**: Used

 for routing between pages (Home, Task creation/editing).
- **State Management**: Local component state used for handling tasks (could be expanded with Redux or Context API if needed).
- **Environment Variables**: Configured API URL using `.env` to make it flexible between different environments.
