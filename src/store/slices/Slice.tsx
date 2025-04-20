import { createSlice } from "@reduxjs/toolkit";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
}
interface IData {
  data: IMovie[];
  search: IMovie[];
  get: IMovie | null;
}
const initialState: IData = {
  data: [],
  search: [],
  get: null,
};
const lining = createSlice({
  name: "lining",
  initialState,
  reducers: {
    searchData: (state, action) => {
      state.search = action.payload;
    },
    getProduct: (state, action) => {
      state.get = action.payload;
    },
  },
});

export const { searchData, getProduct } = lining.actions;
export default lining.reducer;
