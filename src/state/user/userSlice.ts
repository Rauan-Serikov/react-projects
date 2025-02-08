import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  name: string | null;
  surname: string | null;
  email: string | null;
  isLoading: boolean; 
}

const initialState: UserState = {
  isAuthenticated: false,
  name: null,
  surname: null,
  email: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ name: string; surname: string; email: string }>) => {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.isLoading = false; 
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.name = null;
      state.surname = null;
      state.email = null;
      state.isLoading = false;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { loginUser, logoutUser, finishLoading } = userSlice.actions;
export default userSlice.reducer;
