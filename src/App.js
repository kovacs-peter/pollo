import { HashRouter } from "react-router-dom";
import Routes from "./components/routes";

function App() {
    return (
        <>
            <HashRouter>
                <Routes />
            </HashRouter>
        </>
    );
}

export default App;
