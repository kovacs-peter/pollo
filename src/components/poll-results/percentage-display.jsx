import styles from "./style/poll-result.module.scss";
import UserPhoto from "components/misc/user-photo";

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
                    <UserPhoto key={user} user={user}></UserPhoto>
                ))}
            </div>
        </div>
    );
};

export default PercentageDisplay;
