import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  user: null,
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setActiveAvatarId: (state, action: PayloadAction<any>) => {
      if (state.user) {
        state.user["activeAvatarId"] = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, setActiveAvatarId } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;