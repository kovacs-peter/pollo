import styles from "./loader.module.scss";

const Loader = ({ small }) => {
    return (
        <div className={small ? styles.smallContainer : styles.container}>
            <span className={small ? styles.smallCircle : styles.circle}></span>
            <span className={small ? styles.smallCircle : styles.circle}></span>
            <span className={small ? styles.smallCircle : styles.circle}></span>
            <span className={small ? styles.smallCircle : styles.circle}></span>
        </div>
    );
};

export default Loader;
