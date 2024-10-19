import { RootState } from "./store";

//select characters data from state {count, next, previous, results}
export const selectCharacters = (state: RootState) => state.characters.data; 