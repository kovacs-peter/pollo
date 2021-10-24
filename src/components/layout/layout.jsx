import Header from "./header";
import MainContainer from "./main-container";

const Layout = ({ children }) => {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <Header />
            <MainContainer>{children}</MainContainer>
        </div>
    );
};

export default Layout;
