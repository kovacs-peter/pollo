import Layout from "./layout/layout";
import Login from "./login";
import { useSelector } from "react-redux";

const Routes = () => {
    const user = useSelector((state) => state.user);

    if (user) return <Layout />;
    return <Login />;
};

export default Routes;
