import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllCharacters, fetchCharacterById, fetchStarshipDetailById, fetchFilmDetailById } from "./operations";
import { Character, Film, Starship } from '../types/types'

// characters state description
export interface CharactersState {
  error: string | null,
  isLoading: boolean,
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[]
  },
  page: number
  characterDetails: Character | null,
  starshipDetails: Starship[],
  filmDetails: Film[]
}

const initialState: CharactersState = {
  error: null,
  isLoading: false,
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  page: 1, 
  characterDetails: null,
  starshipDetails: [],
  filmDetails: [],
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    clearFilmsAndStarshipsDetails: (state) => {
      state.filmDetails = [];
      state.starshipDetails = [];
    },
    setPage: (state, action) => {
      state.page = action.payload
    }
  },
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
    .addCase(fetchAllCharacters.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch characters'
    })
    //request character by id
    .addCase(fetchCharacterById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchCharacterById.fulfilled, (state, action: PayloadAction<CharactersState['characterDetails']>) => {
      state.isLoading = false;
      state.error = null;
      state.characterDetails = action.payload;
    }).addCase(fetchCharacterById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch selected character';
    })
  // handling request to get starship by id
    .addCase(fetchStarshipDetailById.pending, (state) => {
      state.error = null;
    })
    .addCase(fetchStarshipDetailById.fulfilled, (state, action) => {
      state.error = null;
      state.starshipDetails = [...state.starshipDetails, action.payload]
    })
    .addCase(fetchStarshipDetailById.rejected, (state , action) => {
      state.error = action.error.message || 'Failed to fetch selected starship details';
    })
  // handling request to get film details by id
    .addCase(fetchFilmDetailById.pending, (state) => {
      state.error = null;
    })
    .addCase(fetchFilmDetailById.fulfilled, (state, action) => {
      state.error = null;
      state.filmDetails = [...state.filmDetails, action.payload];
    })
    .addCase(fetchFilmDetailById.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch selected film details';
    })
})

export const characterReducer = characterSlice.reducer;
export const { clearFilmsAndStarshipsDetails, setPage } = characterSlice.actions