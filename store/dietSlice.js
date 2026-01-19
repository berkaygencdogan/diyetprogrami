import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boy: null,
  kilo: null,
  yas: null,
  cinsiyet: null,
  hedef: null,
  sonuc: null,
};

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {
    setUserData(state, action) {
      return { ...state, ...action.payload };
    },
    setResult(state, action) {
      state.sonuc = action.payload;
    },
    resetDiet() {
      return initialState;
    },
  },
});

export const { setUserData, setResult, resetDiet } = dietSlice.actions;
export default dietSlice.reducer;
