import { usePoll } from "../../hooks/usePoll";
import { useLocation } from "react-router-dom";
import styles from "./style/poll-fill.module.scss";
import Loader from "../misc/loader-without-style";
const PollFill = () => {
    const { pathname } = useLocation();
    const { data: poll, isLoading } = usePoll(pathname.slice(1));
    if (isLoading)
        return (
            <div className={styles.loaderContainer}>
                <Loader styles={styles} />
            </div>
        );
    if (poll.password) return <div>Give password!!!!</div>;
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
