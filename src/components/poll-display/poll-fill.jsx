import { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useUpdatePoll } from "../../hooks/useUpdatePoll";
import { usePoll } from "../../hooks/usePoll";
import { useSelector } from "react-redux";
import styles from "./style/poll-fill.module.scss";
import configStyles from "../poll-config/style/poll-config.module.scss";

import Loader from "../misc/loader-without-style";
import PollPassword from "./poll-password";
import OptionRadio from "./option-radio";

const PollFill = () => {
    const [passCorrect, setPassCorrect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { id: pollUid } = useParams();

    const history = useHistory();
    const { data: poll, isLoading: pollLoading } = usePoll(pollUid);
    const user = useSelector((state) => {
        if (state.user.userData) return JSON.parse(state.user.userData);
    });
    const { mutate, isSuccess, isLoading: mutationRunning } = useUpdatePoll();

    useEffect(() => {
        if (!isSuccess) return;
        history.push(`/${pollUid}/answers`);
        // eslint-disable-next-line
    }, [isSuccess]);

    const handleAnswer = () => {
        mutate({
            userId: user.uid,
            selectedOption: selectedOption,
            pollUid: pollUid,
        });
    };

    if (pollLoading || !user)
        return (
            <div className={styles.loaderContainer}>
                <Loader styles={styles} />
            </div>
        );
    if (!pollLoading && !poll) return <Redirect to="/" />;
    if (
        poll.answeredBy?.length &&
        poll.answeredBy.map((ans) => ans.id).includes(user.uid)
    )
        return <Redirect to={`${pollUid}/answers`} />;

    if (poll.password && !passCorrect)
        return (
            <PollPassword passInput={(val) => setPassCorrect(val === poll.password)} />
        );
    return (
        <div className={styles.fillContainer}>
            <div>
                <h1 className={styles.title}>{poll.question}</h1>
                <div className={styles.optionsContainer}>
                    {Object.keys(poll.options)
                        .sort()
                        .map((option) => (
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
                    {mutationRunning ? <Loader styles={configStyles} /> : "ANSWER"}
                </button>
                <div onClick={handleAnswer} className={styles.noAnswer}>
                    Bring me the answers
                </div>
            </div>
        </div>
    );
};
export default PollFill;
