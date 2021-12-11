import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const cartSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {

  },
})

export default cartSlice.reducer