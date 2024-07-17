import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FibonacciGenerator from './FibonacciGenerator';
import FibonacciHistory from './FibonacciHistory';
import fibonacciReducer from './fibonacciSlice';
import { CssBaseline, Container } from '@mui/material';

const store = configureStore({
  reducer: {
    fibonacci: fibonacciReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container>
        <FibonacciGenerator />
        <FibonacciHistory />
      </Container>
    </Provider>
  );
}

export default App;