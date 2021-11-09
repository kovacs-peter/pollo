import { createSlice } from "@reduxjs/toolkit";

const THEME = { light: "#f8f8f8", dark: "#464646" };

const initialState = "light";

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            const newTheme = state === "light" ? "dark" : "light";
            document.body.className = newTheme;
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", THEME[newTheme]);
            localStorage.setItem("theme", newTheme);
            state = newTheme;
            return state;
        },
        setTheme: (state, action) => {
            if (!action.payload) return;
            const newTheme = action.payload;
            document.body.className = newTheme;
            document
                .querySelector('meta[name="theme-color"]')
                .setAttribute("content", THEME[newTheme]);
            localStorage.setItem("theme", newTheme);
            state = newTheme;
            return state;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
