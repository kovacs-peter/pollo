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
import { auth } from "api/firebase";

const Routes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const user = useSelector((state) => state.user.userData);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userData) => {
            if (userData) {
                dispatch(setUser(JSON.parse(JSON.stringify(userData))));
            } else {
                history.push(`/login?from=${pathname}`);
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);

    return (
        <Layout user={user}>
            <Switch>
                {!user && (
                    <Route path={"/login"} exact strict component={Login} />
                )}
                <Route path="/new" exact strict component={PollConfig} />
                <Route path={"/:id"} exact component={PollFill} />
                <Route
                    path={"/:id/answers"}
                    exact
                    strict
                    component={PollResults}
                />
                <Route path={"/"} exact component={PollList} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    );
};

export default Routes;
