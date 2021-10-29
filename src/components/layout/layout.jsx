import Header from "./header";
import MainContainer from "./main-container";
import InfoBar from "./info-bar";
import { useSelector } from "react-redux";
const Layout = ({ children, user }) => {
    const { infoType, infoText } = useSelector((state) => state.info);
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            {infoText && <InfoBar type={infoType} text={infoText} />}
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
