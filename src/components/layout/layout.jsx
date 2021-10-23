import Header from "./header";
import MainContainer from "./main-container";

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <MainContainer>{children}</MainContainer>
        </div>
    );
};

export default Layout;
