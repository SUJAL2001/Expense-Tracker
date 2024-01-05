import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  text: string;
  amount: number;
}

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

const TransactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    removeTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { addTransaction, removeTransaction } = TransactionSlice.actions;
export default TransactionSlice.reducer;
