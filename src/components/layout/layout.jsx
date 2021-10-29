import Header from "./header";
import MainContainer from "./main-container";
const Layout = ({ children, user }) => {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            {user ? (
                <>
                    <Header />
                    <MainContainer>{children}</MainContainer>
                </>
            ) : (
                <div
                    style={{ display: "flex", justifyContent: "center", height: "100%" }}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Layout;
