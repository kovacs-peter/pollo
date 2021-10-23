import Layout from "./layout/layout";
import Login from "./login";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import PollConfig from "./edit-poll/poll-config";
import PollList from "./my-polls/poll-list";
import PollFill from "./fill-out-poll/poll-fill";

const Routes = () => {
    const user = useSelector((state) => state.user);

    if (user)
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
                    <Route path={"/"} exact strict component={PollList} />
                </Switch>
            </Layout>
        );
    return <Login />;
};

export default Routes;
