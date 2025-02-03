# Task Management Appliation
This is a task management application that allows crud operations for different tasks.

## 
- **Backend REST API**:  Node, Typescript, Express
- **FrontEnd**: React with Typescript


## How to run

#### Run backend: 
```sh
cd task-management-api

docker-compose up -d

npx ts-node src/app.ts
```

Backend will start at `http:localhost:3000/api/tasks/`


#### Run frontEnd

```sh
cd task-management-frontend

npm start
```

Frontend will load at `http:localhost:3001`


- `http://localhost:3001/` : list all tasks
- `http://localhost:3001/task/new` : create new task
- `http://localhost:3001/task/:id/edit` : update existing task