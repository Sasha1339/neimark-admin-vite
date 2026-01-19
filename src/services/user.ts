import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "@/shared/user/types.ts";

type UserState = {
  user: User | null;
  rememberRoute: string | null;
}

const initialState: UserState = {
  user: null,
  rememberRoute: null,
}

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state: UserState) => {state.user = null},
    resetRoute: (state: UserState) => {state.rememberRoute = null},
    rememberNewRoute: (state: UserState, action: PayloadAction<string>) => {state.rememberRoute = action.payload},
  },
  selectors: {
    user: (state: UserState) => state.user,
    rememberRoute: (state: UserState) => state.rememberRoute,
  }
});

export const { selectors: userSelectors, reducer: userReducer, actions: userActions } = user;