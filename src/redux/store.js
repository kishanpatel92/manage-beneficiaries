import { configureStore } from '@reduxjs/toolkit';
import beneficiariesReducer from './beneficiariesSlice';

const store = configureStore({
  reducer: {
    beneficiaries: beneficiariesReducer
  }
});

export default store;
