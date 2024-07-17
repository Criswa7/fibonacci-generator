import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

function FibonacciHistory() {
  const history = useSelector(state => state.fibonacci.history);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>
      <Typography variant="h5" gutterBottom>Historial de Series Fibonacci</Typography>
      <List>
        {history.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Hora: ${item.time}`}
              secondary={`Serie: ${item.series.join(', ')}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default FibonacciHistory;