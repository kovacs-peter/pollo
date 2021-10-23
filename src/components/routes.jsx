import Layout from "./layout/layout";
import Login from "./login";
import { Switch, Route } from "react-router-dom";
import PollConfig from "./edit-poll/poll-config";
import PollList from "./my-polls/poll-list";
import PollFill from "./fill-out-poll/poll-fill";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Routes = ({ user }) => {
    const history = useHistory();
    useEffect(() => {
        if (user) return;
        history.push("/login");
    }, [history, user]);

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
