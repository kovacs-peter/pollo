import { HashRouter } from "react-router-dom";
import Routes from "./components/routes";
import { useDispatch } from "react-redux";
import { setTheme } from "redux/themeSlice";
import { useEffect } from "react";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme) {
            dispatch(setTheme(localTheme));
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            dispatch(setTheme("dark"));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <HashRouter>
                <Routes />
            </HashRouter>
        </>
    );
}

export default App;
