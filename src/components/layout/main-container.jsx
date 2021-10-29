import styles from "./style/main-container.module.scss";

const MainContainer = ({ children }) => {
    return (
        <div className={styles.centerChildren}>
            <main className={styles.mainContent}>{children}</main>
        </div>
    );
};

export default MainContainer;
