import React from 'react';
import { ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        tabIndex={-1}
        inputProps={{ 'aria-label': 'Marquer comme complétée' }}
      />
      <ListItemText
        primary={todo.text}
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
}

export default TodoItem;
