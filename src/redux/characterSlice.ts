import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllCharacters } from "./operations";
import { Character } from '../types/types'

// characters state description
export interface CharactersState {
  error: string | null,
  isLoading: boolean,
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[]
  }
}

const initialState: CharactersState = {
  error: null,
  isLoading: false,
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    //request for all characters. Set loading
    .addCase(fetchAllCharacters.pending, (state) => {
    state.isLoading = true;
    state.error = null;
    })
    // Set data in state, unset loading and error
    .addCase(fetchAllCharacters.fulfilled, (state, actiion: PayloadAction<CharactersState['data']>) => {
      state.isLoading = false;
      state.error = null;
      state.data = actiion.payload;
    })
    // unset loading, set error
    .addCase(fetchAllCharacters.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch characters'
  })
})

export const characterReducer = characterSlice.reducer;