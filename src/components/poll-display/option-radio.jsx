import styles from "./style/poll-fill.module.scss";

const OptionRadio = ({ onCheck, checked, children }) => {
    return (
        <div onClick={onCheck} className={styles.optionContainer}>
            <div
                className={
                    checked ? styles.activeCheckbox : styles.optionCheckbox
                }
            ></div>
            <div className={styles.optionText}>{children}</div>
        </div>
    );
};

export default OptionRadio;
