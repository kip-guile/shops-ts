import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const userSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {

  },
})

export default userSlice.reducer