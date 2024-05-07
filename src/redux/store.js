import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filterSlice';
import tabsReducer from './tabsSlice';
import ticketReducer from './ticketSlice';

export default configureStore({
  reducer: {
    filter: filterReducer,
    tabs: tabsReducer,
    tickets: ticketReducer,
  },
});
