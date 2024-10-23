import { RootState } from "./store";

//select characters data from state {count, next, previous, results}
export const selectCharacters = (state: RootState) => state.starWarsState.data; 

//select character data by id
export const selectCharacterDetails = (state: RootState) => state.starWarsState.characterDetails;

//select film details
export const selectFilmDetails = (state: RootState) => state.starWarsState.filmDetails;

//select starship details
export const selectStarshipDetails = (state: RootState) => state.starWarsState.starshipDetails;

