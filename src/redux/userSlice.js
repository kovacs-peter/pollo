import { createSlice } from "@reduxjs/toolkit";

const initialState = { userData: null };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            debugger;
            state.userData = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
