import Layout from "./layout/layout";
import Login from "./login";
import { Switch, Route } from "react-router-dom";
import PollConfig from "./edit-poll/poll-config";
import PollList from "./my-polls/poll-list";
import PollFill from "./fill-out-poll/poll-fill";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Routes = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const user = useSelector((state) => {
        if (state.user.userData) return JSON.parse(state.user.userData);
    });
    useEffect(() => {
        if (user) return;
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            dispatch(setUser(userJSON));
        } else {
            history.push(`/login?from=${pathname}`);
        }
        // eslint-disable-next-line
    }, [dispatch, user, history]);

    return (
        <Layout>
            <Switch>
                <Route path="/new" exact strict component={PollConfig} />
                <Route path={"/:id"} exact strict component={PollFill} />
                <Route path={"/login"} exact strict component={Login} />
                <Route path={"/"} exact strict component={PollList} />
            </Switch>
        </Layout>
    );
};

export default Routes;
