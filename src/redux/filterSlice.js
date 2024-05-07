import { createSlice } from '@reduxjs/toolkit';
const filterSlices = createSlice({
  name: 'filter',
  initialState: {
    filter: 'price',
  },
  reducers: {
    switchFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { switchFilter } = filterSlices.actions;
export default filterSlices.reducer;
