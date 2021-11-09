const THEME = { light: "#f8f8f8", dark: "#464646" };

export const useTheme = () => {
    const meta = document.querySelector('meta[name="theme-color"]');

    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle("dark");
        switch (body.classList.contains("dark")) {
            case true:
                meta.setAttribute("data-theme", "light");
                break;
            default:
                meta.setAttribute("data-theme", "dark");
        }
    };

    const theme = () => document.body.classList.contains("dark");

    return {
        toggleTheme: toggleTheme,
        theme: theme(),
        options: THEME,
    };
};
