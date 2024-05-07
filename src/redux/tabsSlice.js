import { createSlice } from '@reduxjs/toolkit';
const tabsSlices = createSlice({
  name: 'tabs',
  initialState: {
    tabs: [],
  },
  reducers: {
    deleteTab(state, action) {
      state.tabs = state.tabs.filter((tab) => tab !== action.payload);
    },
    switchTab(state, action) {
      state.tabs = [...state.tabs, action.payload];
    },
  },
});

export const { deleteTab, switchTab } = tabsSlices.actions;
export default tabsSlices.reducer;
