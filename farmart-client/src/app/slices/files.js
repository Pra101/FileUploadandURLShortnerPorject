import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFile: (state, action) => {
      return { files: action.payload };
    },
    clearFiles: () => {
      return { files: "" };
    },
  },
});

const { reducer, actions } = filesSlice;

export const { setFile, clearFiles } = actions
export default reducer;