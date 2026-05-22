import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultItem {
  correct: number;
  total: number;
}

interface ListsState {
  lists: string[][];
  results: ResultItem[];
}

const initialState: ListsState = {
  lists: [],
  results: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (
      state,
      action: PayloadAction<{ index: number; items: string[] }>,
    ) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },

    setDraggedItems: (
      state,
      action: PayloadAction<{ index: number; items: string[] }>,
    ) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },

    setResult: (
      state,
      action: PayloadAction<{
        index: number;
        correct: number;
        total: number;
      }>,
    ) => {
      const { index, correct, total } = action.payload;

      state.results[index] = {
        correct,
        total,
      };
    },

    clearResults: (state) => {
      state.results = [];
    },

    resetLists: (state) => {
      state.lists = [];
      state.results = [];
    },
  },
});

export const { addList, setDraggedItems, setResult, clearResults, resetLists } =
  listsSlice.actions;

export default listsSlice.reducer;
