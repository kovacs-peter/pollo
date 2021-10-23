import Layout from "./layout/layout";
import Login from "./login";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PollConfig from "./edit-poll/poll-config";
import PollList from "./my-polls/poll-list";
import PollFill from "./fill-out-poll/poll-fill";
import { useEffect } from "react";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Routes = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const userJSON = sessionStorage.getItem("user");
        if (userJSON) {
            const parsedUser = JSON.parse(userJSON);
            dispatch(setUser(parsedUser));
        } else {
            history.push("/login");
        }
    }, [dispatch, history]);

    return (
        <Layout>
            <Switch>
                <Route path={"/:id(\\d+)"} exact strict component={PollFill} />
                <Route path={"/edit/:id(\\d+)"} exact strict>
                    <PollConfig action="edit" />
                </Route>
                <Route path="/new" exact strict>
                    <PollConfig action="new" />
                </Route>
                <Route path={"/login"} exact strict component={Login} />
                <Route path={"/"} exact strict component={PollList} />
            </Switch>
        </Layout>
    );
};

export default Routes;
