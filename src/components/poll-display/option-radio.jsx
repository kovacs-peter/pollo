import styles from "./style/poll-fill.module.scss";

const OptionRadio = ({ onCheck, checked, children }) => {
    return (
        <div className={styles.optionContainer}>
            <div
                onClick={onCheck}
                className={checked ? styles.activeCheckbox : styles.optionCheckbox}
            ></div>
            <div className={styles.optionText}>{children}</div>
        </div>
    );
};

export default OptionRadio;
