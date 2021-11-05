import { useEffect } from "react";
import styles from "./style/header.module.scss";
import { resetInfo } from "../../redux/infoSlice";
import { useDispatch } from "react-redux";

const InfoBar = ({ text, type, loggedIn }) => {
    const dispatch = useDispatch();
    const closeBar = () => {
        dispatch(resetInfo());
    };
    useEffect(() => {
        window.setTimeout(() => {
            closeBar();
        }, 30000);
        // eslint-disable-next-line
    }, []);

    return (
        <div
            style={{
                cursor: "pointer",
                backgroundColor: type === "info" ? "#00aa09" : "#e93030",
                top: loggedIn ? "3rem" : "0px",
            }}
            className={styles.infoBar}
            onClick={closeBar}
        >
            <div></div>
            <div>{text}</div>
            <div className={styles.close} onClick={closeBar}>
                ×
            </div>
        </div>
    );
};

export default InfoBar;
