import styles from "./style/poll-result.module.scss";
import Answerer from "components/misc/answerer";

const PercentageDisplay = ({ optionText, answers, allAnswerCount }) => {
    const percentage = (answers.length / allAnswerCount) * 100;

    return (
        <div className={styles.percentageContainer}>
            <small>{optionText}</small>
            <div>
                <div className={styles.percentageBackground}>
                    <div
                        className={styles.percentage}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                {answers.map((user) => (
                    <Answerer key={user} user={user}></Answerer>
                ))}
            </div>
        </div>
    );
};

export default PercentageDisplay;
