import { useState, useEffect } from "react";
import styles from "./style/poll-result.module.scss";
import { useParams } from "react-router-dom";
import { usePoll } from "../../hooks/usePoll";
import Loader from "../misc/loader";
import PercentageDisplay from "./percentage-display";

const PollResult = () => {
    const { id: pollUid } = useParams();
    const { data: poll, isLoading: pollLoading } = usePoll(pollUid);
    const [allAnswers, setAllAnswers] = useState([]);

    useEffect(() => {
        if (!poll) return;
        setAllAnswers(
            Object.keys(poll.options)
                .map((key) => {
                    return poll.options[key].chosenBy;
                })
                .flat()
        );
    }, [poll]);

    if (pollLoading)
        return (
            <div className="content center">
                <Loader />
            </div>
        );
    return (
        <div className="content">
            <h1 className={styles.title}>{poll.question}</h1>
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
