import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateFibonacci = createAsyncThunk(
  'fibonacci/generate',
  async ({ hours, minutes, seconds }) => {
    const response = await axios.post('http://localhost:3001/api/fibonacci', { hours, minutes, seconds });
    return response.data;
  }
);

export const fibonacciSlice = createSlice({
  name: 'fibonacci',
  initialState: {
    fibonacciSeries: [],
    seeds: { X: 0, Y: 0 },
    numberCount: 0,
    generationTime: '',
    history: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateFibonacci.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateFibonacci.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.fibonacciSeries = action.payload.fibonacciSeries;
        state.seeds = action.payload.seeds;
        state.numberCount = action.payload.numberCount;
        state.generationTime = action.payload.generationTime;
      })
      .addCase(generateFibonacci.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addToHistory } = fibonacciSlice.actions;

export default fibonacciSlice.reducer;