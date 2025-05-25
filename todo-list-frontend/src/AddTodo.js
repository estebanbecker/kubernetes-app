import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

function AddTodo({ onAdd }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Ajouter une tâche"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter
        </Button>
      </Stack>
    </form>
  );
}

export default AddTodo;
