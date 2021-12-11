import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const filterSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {

  },
})

export default filterSlice.reducer