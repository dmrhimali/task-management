-- Create a tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample tasks into the table
INSERT INTO tasks (title, description, status) VALUES
    ('Task 1', 'First task description', 'pending'),
    ('Task 2', 'Second task description', 'in-progress'),
    ('Task 3', 'Third task description', 'completed');

