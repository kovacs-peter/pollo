import { usePoll } from "../../hooks/usePoll";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./style/poll-fill.module.scss";
import Loader from "../misc/loader-without-style";
import PollPassword from "./poll-password";

const PollFill = () => {
    const [passCorrect, setPassCorrect] = useState(false);
    const { pathname } = useLocation();
    const { data: poll, isLoading } = usePoll(pathname.slice(1));
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
        <div>
            <h1>{poll.question}</h1>
            {poll.options.map((option) => (
                <p key={option.option}>{option.option}</p>
            ))}
        </div>
    );
};
export default PollFill;
