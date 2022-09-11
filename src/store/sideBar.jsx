import { createSlice } from '@reduxjs/toolkit';

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: { isExpand: true },
  reducers: {
    Expand: (state) => {
      state.isExpand = true;
    },
    notExpand: (state) => {
      state.isExpand = false;
    },
  },
});

export const { Expand, notExpand} = sideBarSlice.actions;

export default sideBarSlice.reducer;
