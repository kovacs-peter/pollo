import styles from "./style/poll-config.module.scss";
import { useState } from "react";
const LinkPage = ({ id }) => {
    const [clicked, setClicked] = useState(false);
    const plloUrl = `${window.location.host}/${id}`;
    const handleClick = () => {
        navigator.clipboard.writeText(plloUrl);
        setClicked(true);
    };
    return (
        <div className={styles.flex}>
            <h1 style={{ textAlign: "center" }}>
                🐓🐓🐓 Your Pollo is available! 🐓🐓🐓
            </h1>
            <div style={{ textAlign: "center" }}>
                <small>You can access the poll here:</small>
                <br />
                <div>
                    <a style={{ cursor: "pointer" }} href={plloUrl}>
                        {plloUrl}
                    </a>
                </div>
                <br />
                <button
                    className={`${styles.submitButton} ${styles.button}`}
                    onClick={handleClick}
                >
                    {clicked ? "Copied!" : "Copy to Clipborad"}
                </button>
            </div>
            <div></div>
        </div>
    );
};

export default LinkPage;
