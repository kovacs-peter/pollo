import { usePoll } from "../../hooks/usePoll";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./style/poll-fill.module.scss";
import Loader from "../misc/loader-without-style";
import PollPassword from "./poll-password";
import OptionRadio from "./option-radio";
import { useUpdatePoll } from "../../hooks/useUpdatePoll";
import { useSelector } from "react-redux";

const PollFill = () => {
    const [passCorrect, setPassCorrect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { pathname } = useLocation();
    const pollUid = pathname.slice(1);
    const { data: poll, isLoading } = usePoll(pollUid);
    const user = useSelector((state) => {
        if (state.user.userData) return JSON.parse(state.user.userData);
    });
    const { mutate } = useUpdatePoll();

    const handleAnswer = () => {
        mutate({
            userId: user.uid,
            selectedOption: selectedOption,
            pollUid: pollUid,
        });
    };

    if (isLoading)
        return (
            <div className={styles.loaderContainer}>
                <Loader styles={styles} />
            </div>
        );
    if (poll.password && !passCorrect)
        return (
            <PollPassword passInput={(val) => setPassCorrect(val === poll.password)} />
        );
    return (
        <div className={styles.fillContainer}>
            <div>
                <h1 className={styles.title}>{poll.question}</h1>
                <div className={styles.optionsContainer}>
                    {Object.keys(poll.options).map((option, index) => (
                        <OptionRadio
                            onCheck={() => setSelectedOption(option)}
                            key={option}
                            checked={selectedOption === option}
                        >
                            {option}
                        </OptionRadio>
                    ))}
                </div>
            </div>
            <div style={{ alignSelf: "flex-end" }}>
                <button
                    onClick={handleAnswer}
                    className={`${
                        !(typeof selectedOption === "string") ? styles.disabled : ""
                    } ${styles.answerButton}`}
                >
                    ANSWER
                </button>
                <div onClick={handleAnswer} className={styles.noAnswer}>
                    Bring me the answers
                </div>
            </div>
        </div>
    );
};
export default PollFill;
