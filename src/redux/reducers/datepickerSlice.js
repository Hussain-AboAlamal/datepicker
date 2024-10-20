import { createSlice } from '@reduxjs/toolkit';
// import moment from 'moment';

/**
 * initial state for datepicker
 */
const initialState = {
  show: false,
}

const datepickerSlice = createSlice({
  name: 'datepicker',
  initialState,
  reducers: {
    openDialog(state) {
      state.show = true;
    },
    closeDialog(state) {
      state.show = false;
    },
    setDepartureDate(state, action) {
      state.departureDate = action.payload;
    },
    setReturnDate(state, action) {
      state.returnDate = action.payload;
    }
  },
});

export const { openDialog, closeDialog, setDepartureDate, setReturnDate } = datepickerSlice.actions

export default datepickerSlice.reducer;
