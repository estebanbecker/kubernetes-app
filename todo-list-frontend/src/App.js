
import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { Container, Typography, Paper, Box } from '@mui/material';



function App() {
  const [todos, setTodos] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    fetch('/tasks')
      .then(res => res.json())
      .then(data => {
        setTodos(data.map(task => ({
          id: task.id,
          text: task.description,
          completed: false // backend does not support completed
        })));
      });
  }, []);

  // Add a new task
  const addTodo = (text) => {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: text })
    })
      .then(res => res.json())
      .then(() => {
        // Re-fetch tasks after adding
        fetch('/tasks')
          .then(res => res.json())
          .then(data => {
            setTodos(data.map(task => ({
              id: task.id,
              text: task.description,
              completed: false
            })));
          });
      });
  };

  // Delete a task
  const deleteTodo = (id) => {
    fetch(`/tasks/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  // Toggle is only local (backend does not support completed)
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>
        <Box sx={{ mb: 2 }}>
          <AddTodo onAdd={addTodo} />
        </Box>
        <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
      </Paper>
    </Container>
  );
}

export default App;
