import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const explainCode = createAsyncThunk(
  'code/explain',
  async ({ code, language }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/explain/', { code, language });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const codeSlice = createSlice({
  name: 'code',
  initialState: {
    code: '',
    language: 'python',
    explanation: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(explainCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(explainCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.explanation = action.payload.explanation;
      })
      .addCase(explainCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCode, setLanguage } = codeSlice.actions;

export default codeSlice.reducer;