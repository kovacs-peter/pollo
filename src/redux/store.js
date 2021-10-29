import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import InfoReducer from "./infoSlice";

const store = configureStore({
    reducer: {
        user: UserReducer,
        info: InfoReducer,
    },
});

export default store;
