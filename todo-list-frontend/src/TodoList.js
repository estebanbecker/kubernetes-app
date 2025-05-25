import React from 'react';
import TodoItem from './TodoItem';
import { List, Typography } from '@mui/material';

function TodoList({ todos, onDelete, onToggle }) {
  if (todos.length === 0) {
    return <Typography color="text.secondary" align="center">Aucune tâche pour le moment !</Typography>;
  }
  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
}

export default TodoList;
