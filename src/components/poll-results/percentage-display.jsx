import styles from "./style/poll-result.module.scss";

const PercentageDisplay = ({ optionText, answers, allAnswerCount }) => {
    const percentage = (answers.length / allAnswerCount) * 100;
    return (
        <div className={styles.percentageContainer}>
            <small>{optionText}</small>
            <div className={styles.percentageBackground}>
                <div
                    className={styles.percentage}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default PercentageDisplay;
