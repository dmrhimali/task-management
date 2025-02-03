import express from 'express';
import router from './routes/taskRoutes';
import cors from 'cors';

const app = express();

// Enable CORS for your frontend URL (localhost:3001)
const corsOptions = {
  origin: 'http://localhost:3001',  // Frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed methods
  allowedHeaders: 'Content-Type',  // Allowed headers
};

app.use(cors(corsOptions));  // Apply CORS middleware or app.use(cors()); to Enable CORS for all routes (Not recommended for production)
app.use(express.json());
app.use('/api/tasks', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
