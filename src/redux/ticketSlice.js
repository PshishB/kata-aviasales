import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchId = createAsyncThunk('tickets/fetchId', async function () {
  const res = await fetch('https://aviasales-test-api.kata.academy/search');
  const data = await res.json();
  return data.searchId;
});

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async function (id, { dispatch }) {
  let stop = false;
  while (!stop) {
    try {
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
      const data = await res.json();
      dispatch(ticketSlice.actions.updateTickets(data.tickets));
      stop = data.stop;
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  }
});

const compareTicketsPrice = (a, b) => {
  return a.price - b.price;
};
const compareTicketsDuration = (a, b) => {
  return (
    a.segments.reduce((acc, segment) => acc + segment.duration, 0) -
    b.segments.reduce((acc, segment) => acc + segment.duration, 0)
  );
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    filteredTicketsPrice: [],
    filteredTicketsDuration: [],
    tickets: [],
    status: null,
    error: null,
    id: null,
    ticketsNumber: 5,
  },
  reducers: {
    updateTickets(state, action) {
      state.tickets = state.tickets.concat(action.payload);
    },
    filterTicketsPrice(state) {
      state.filteredTicketsPrice = [...state.tickets].sort(compareTicketsPrice);
    },
    filterTicketsDuration(state) {
      state.filteredTicketsDuration = [...state.tickets].sort(compareTicketsDuration);
    },
    addTickets(state) {
      state.ticketsNumber += 5;
    },
    removeTickets(state) {
      state.ticketsNumber = 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchId.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.id = action.payload;
      })
      .addCase(fetchId.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state) => {
        state.status = 'resolved';
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});
export default ticketSlice.reducer;
export const { filterTicketsPrice, filterTicketsDuration, addTickets, removeTickets } = ticketSlice.actions;
