import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./login";
import PollConfig from "./poll-config/poll-config";
import PollList from "./poll-list/poll-list";
import PollFill from "./poll-display/poll-fill";
import PollResults from "./poll-results/poll-results";
import NotFound from "./misc/not-found";

const Routes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const user = useSelector((state) => state.user.userData);
    useEffect(() => {
        if (user || pathname === "/login") return;
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            dispatch(setUser(JSON.parse(userJSON)));
        } else {
            history.push(`/login?from=${pathname}`);
        }
        // eslint-disable-next-line
    }, [dispatch, user, history]);

    return (
        <Layout user={user}>
            <Switch>
                <Route path={"/login"} exact strict component={Login} />
                <Route path="/new" exact strict component={PollConfig} />
                <Route path={"/:id"} exact component={PollFill} />
                <Route
                    path={"/:id/answers"}
                    exact
                    strict
                    component={PollResults}
                />
                <Route path={"/"} exact strict component={PollList} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
};

export default Routes;
