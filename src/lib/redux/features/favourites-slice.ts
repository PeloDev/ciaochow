import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import reduxConstants from "../reduxConstants";

// TODO: store in DB

export const FAVOURITES_KEY = "cc_favourites";

interface IState {
  favouriteChows: number[];
}

const initialState: IState = {
  favouriteChows: [],
};

const slice = createSlice({
  name: reduxConstants.FAVOURITES.NAME,
  initialState,
  reducers: {
    addRemoveFavourite: (
      state,
      { payload: { chowId } }: PayloadAction<{ chowId: number }>
    ) => {
      if (state.favouriteChows.includes(chowId)) {
        state.favouriteChows = state.favouriteChows.filter(
          (id) => id !== chowId
        );
      } else {
        state.favouriteChows.push(chowId);
      }
    },
  },
});

export const { addRemoveFavourite } = slice.actions;

export default slice.reducer;
