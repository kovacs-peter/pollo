import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice";
import InfoReducer from "./infoSlice";
import ThemeReducer from "./themeSlice";

const store = configureStore({
    reducer: {
        user: UserReducer,
        info: InfoReducer,
        theme: ThemeReducer,
    },
});

export default store;
