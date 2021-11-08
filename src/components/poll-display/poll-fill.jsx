import { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useUpdatePoll } from "../../hooks/useUpdatePoll";
import { usePoll } from "../../hooks/usePoll";
import { useSelector } from "react-redux";
import styles from "./style/poll-fill.module.scss";
import { useTitle } from "hooks/useTitle";

import Loader from "../misc/loader";
import PollPassword from "./poll-password";
import OptionRadio from "./option-radio";

const PollFill = () => {
    const [passCorrect, setPassCorrect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const { id: pollUid } = useParams();
    const history = useHistory();
    const { data: poll, isLoading: pollLoading } = usePoll(pollUid);
    const user = useSelector((state) => state.user.userData);
    const {
        mutate,
        isSuccess: mutationSuccess,
        isLoading: mutationRunning,
    } = useUpdatePoll();

    useTitle(`Pollo | ${poll?.question || "loading..."}`);

    useEffect(() => {
        if (mutationSuccess) {
            history.push(`/${pollUid}/answers`);
        }
        // eslint-disable-next-line
    }, [mutationSuccess, mutationRunning]);

    const handleAnswer = (noAns = false) => {
        mutate({
            userId: user.uid,
            selectedOption: noAns ? null : selectedOption,
            pollUid: pollUid,
        });
    };
    const alreadyAnswered = () => {
        return (
            poll.answeredBy?.length &&
            poll.answeredBy.map((ans) => ans.id).includes(user.uid)
        );
    };

    if (pollLoading || !user)
        return (
            <div className="content center">
                <Loader />
            </div>
        );
    if (!poll) return <Redirect to="/" />;
    if (alreadyAnswered()) return <Redirect to={`${pollUid}/answers`} />;

    if (poll.password && !passCorrect)
        return (
            <PollPassword
                passInput={(val) => setPassCorrect(val === poll.password)}
            />
        );
    return (
        <div className="content">
            <div className={styles.form}>
                <div>
                    <h1 className="header-text">{poll.question}</h1>
                    <p>Select an Option</p>
                </div>

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
                    onClick={() => handleAnswer(false)}
                    disabled={!selectedOption}
                    className={
                        `button submit ${!selectedOption ? "disabled" : " "} ` +
                        styles.buttonOffset
                    }
                >
                    {mutationRunning ? <Loader small /> : "ANSWER"}
                </button>
                <div
                    onClick={() => handleAnswer(true)}
                    className={styles.noAnswer}
                >
                    Just show the answers
                </div>
            </div>
        </div>
    );
};
export default PollFill;
