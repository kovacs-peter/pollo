import { createSlice } from "@reduxjs/toolkit";

const initialState = { infoType: "info", infoText: "" };

export const infoSlice = createSlice({
    name: "info",
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.infoType = action.payload.infoType;
            state.infoText = action.payload.infoText;
        },
        resetInfo: (state) => initialState,
    },
});

export const { setInfo, resetInfo } = infoSlice.actions;

export default infoSlice.reducer;
