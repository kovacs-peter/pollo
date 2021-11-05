import { useState, useEffect } from "react";
import styles from "./style/poll-result.module.scss";
import { useParams } from "react-router-dom";
import { usePoll } from "../../hooks/usePoll";
import Loader from "../misc/loader";
import PercentageDisplay from "./percentage-display";
import { useSelector } from "react-redux";
import { useUpdatePoll } from "../../hooks/useUpdatePoll";

const PollResult = () => {
    const { id: pollUid } = useParams();
    const { data: poll, isLoading: pollLoading } = usePoll(pollUid);
    const { mutate } = useUpdatePoll();
    const [allAnswers, setAllAnswers] = useState([]);
    const user = useSelector((state) => state.user.userData);

    useEffect(() => {
        if (!user) return;
        mutate({
            userId: user.uid,
            selectedOption: null,
            pollUid: pollUid,
        });
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (!poll) return;

        setAllAnswers(
            Object.keys(poll.options)
                .map((key) => {
                    return poll.options[key].chosenBy;
                })
                .flat()
        );
        // eslint-disable-next-line
    }, [poll]);

    if (pollLoading)
        return (
            <div className="content center">
                <Loader />
            </div>
        );
    return (
        <div className="content">
            <div className={styles.title}>
                <h1>{poll.question}</h1>
                <p>Poll results:</p>
            </div>
            {!allAnswers.length && (
                <>
                    <h2>No Answers yet.</h2>
                    <h3>options:</h3>
                </>
            )}
            {Object.keys(poll.options)
                .sort()
                .map((key) =>
                    allAnswers.length ? (
                        <PercentageDisplay
                            key={key}
                            optionText={key}
                            answers={poll.options[key].chosenBy}
                            allAnswerCount={allAnswers.length}
                        />
                    ) : (
                        <div key={key}>{key}</div>
                    )
                )}
        </div>
    );
};

export default PollResult;
