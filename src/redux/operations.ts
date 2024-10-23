import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = 'https://sw-api.starnavi.io'

// getting all characters by pages
// 10 characters by page
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

//request to get data for one certain character
export const fetchCharacterById = createAsyncThunk(
  'characters/fetchById',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`/people/${id}`)
      return response.data
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.message)
    }
  }
)

// request to get details about starship by char id
export const fetchStarshipDetailById = createAsyncThunk(
  'starship/fetch',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`/starships/${id}`)
      return response.data
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.message)
    }
  }
)

//request to get film details by char id
export const fetchFilmDetailById = createAsyncThunk(
  'films/fetch',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`/films/${id}`)
      return response.data
    } catch (error) {
      const typedError = error as AxiosError;
      return thunkAPI.rejectWithValue(typedError.message)
    }
  }
)