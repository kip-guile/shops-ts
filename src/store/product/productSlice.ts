import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const productSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {

  },
})

export default productSlice.reducer