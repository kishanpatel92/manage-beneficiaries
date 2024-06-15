import { createSlice } from '@reduxjs/toolkit';

const beneficiariesSlice = createSlice({
  name: 'beneficiaries',
  initialState: [
    { id: 1, name: 'John Doe', accountNumber: '123456', bankName: 'Bank America', accountType: 'Savings' },
    { id: 2, name: 'Jane Smith', accountNumber: '654321', bankName: 'Hdfc Bank', accountType: 'Current' }
  ],
  reducers: {
    addBeneficiary: (state, action) => {
      state.push(action.payload);
    },
    updateBeneficiary: (state, action) => {
      const index = state.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeBeneficiary: (state, action) => {
      return state.filter(b => b.id !== action.payload);
    }
  }
});

export const { addBeneficiary, updateBeneficiary, removeBeneficiary } = beneficiariesSlice.actions;
export default beneficiariesSlice.reducer;
