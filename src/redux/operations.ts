import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = 'https://sw-api.starnavi.io'

export const fetchAllCharacters = createAsyncThunk(
  'characters/fetch',
  async (page: number = 1, thunkAPI) => {
    try {
       const response = await axios.get(`/people?page=${page}`)
    return response.data
    } catch (error) {
       const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.message)
    }
  }
)