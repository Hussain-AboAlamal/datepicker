import { configureStore } from '@reduxjs/toolkit';
import datepickerReducer from './reducers/datepickerSlice';

const store = configureStore({
  reducer: {
    datepicker: datepickerReducer,
  },
});

export default store;
