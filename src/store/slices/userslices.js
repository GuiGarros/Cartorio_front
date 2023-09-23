import { createSlice } from "@reduxjs/toolkit";
import { getApiInstance } from "../../utils/axios";


const initialState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const setUserInfo =
  () =>
  async (dispatch) => {
    try {
      const instance = getApiInstance();
      const {data} = await instance.get("/users")
      dispatch(setUser(data));
    } catch (error) {
      //
    }
  };

