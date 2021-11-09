import { useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "./layout/layout";
import Login from "./login";
import { auth } from "api/firebase";

const PollConfig = lazy(() => import("./poll-config/poll-config"));
const PollList = lazy(() => import("./poll-list/poll-list"));
const PollFill = lazy(() => import("./poll-display/poll-fill"));
const PollResults = lazy(() => import("./poll-results/poll-results"));
const NotFound = lazy(() => import("./misc/not-found"));

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
            <Suspense fallback={<div />}>
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
            </Suspense>
        </Layout>
    );
};

export default Routes;
