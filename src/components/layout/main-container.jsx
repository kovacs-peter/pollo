import styles from "./style/main-container.module.css";

const MainContainer = ({ children }) => {
    return (
        <div className={styles.centerChildren}>
            {/* <h1 className={styles.polLogo}>pollo</h1> */}
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
};

export default MainContainer;
