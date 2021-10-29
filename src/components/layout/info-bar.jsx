import { useEffect } from "react";
import styles from "./style/header.module.scss";
import { resetInfo } from "../../redux/infoSlice";
import { useDispatch } from "react-redux";

const InfoBar = ({ text, type }) => {
    const dispatch = useDispatch();
    const closeBar = () => {
        dispatch(resetInfo());
    };
    useEffect(() => {
        window.setTimeout(() => {
            closeBar();
        }, 10000);
        // eslint-disable-next-line
    }, []);

    return (
        <div
            style={{ backgroundColor: type === "info" ? "#00aa09" : "#b82424" }}
            className={styles.infoBar}
            onClick={closeBar}
        >
            <div></div>
            <div>{text}</div>
            <div className={styles.close} onClick={closeBar}>
                x
            </div>
        </div>
    );
};

export default InfoBar;
