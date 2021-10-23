import { BrowserRouter } from "react-router-dom";
import Routes from "./components/routes";
import { useEffect } from "react";

import { setUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
    const user = useSelector((state) => {
        JSON.parse(state.user.userData);
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) return;
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            const parsedUser = JSON.parse(userJSON);
            dispatch(setUser(parsedUser));
        }
    }, [dispatch, user]);

    return (
        <>
            <BrowserRouter>
                <Routes user={user} />
            </BrowserRouter>
        </>
    );
}

export default App;
