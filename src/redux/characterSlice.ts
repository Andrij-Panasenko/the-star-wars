import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllCharacters } from "./operations";

export interface CharactersState {
  error: string | null,
  isLoading: boolean,
  characters: ICharacters[]
}

export interface ICharacters {
  name: string,
}

const initialState: CharactersState = {
  error: null,
  isLoading: false,
  characters: []
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
    // Set data in state
    .addCase(fetchAllCharacters.fulfilled, (state, actiion: PayloadAction<ICharacters[]>) => {
      state.isLoading = false;
      state.error = null;
      state.characters = actiion.payload;
    })
    .addCase(fetchAllCharacters.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch characters'
  })
})

export const characterReducer = characterSlice.reducer;