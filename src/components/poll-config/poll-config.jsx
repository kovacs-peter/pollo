import { useState, useEffect } from "react";
import styles from "./style/poll-config.module.scss";
import { useSelector } from "react-redux";
import LinkPage from "./link-page";
import Option from "./option";
import { useCreatePoll } from "../../hooks/useCreatePoll";
import Loader from "../misc/loader";

const PollConfig = () => {
    const user = useSelector((state) => {
        if (state.user.userData) return JSON.parse(state.user.userData);
    });

    const [question, setQuestion] = useState("");
    const [passNeeded, setPassNeeded] = useState(false);
    const [pollPassword, setPollPassword] = useState("");
    const [answers, setAnswers] = useState({ option0: "" });
    const [pollId, setpollId] = useState(null);
    const { mutate: createPoll, isLoading, isSuccess, data } = useCreatePoll();

    useEffect(() => {
        if (isSuccess) {
            setpollId(data.id);
        }
    }, [isSuccess, data]);

    const handleAdd = (event) => {
        event.stopPropagation();

        const num = Object.keys(answers).length;
        const option = `option${num}`;
        setAnswers({ ...answers, [option]: "" });
    };

    const handleRemove = (key) => {
        let modifyObject = { ...answers };
        delete modifyObject[key];
        setAnswers(modifyObject);
    };

    const handleSubmit = () => {
        const optionsObject = {};
        Object.values(answers).forEach(
            (option) =>
                (optionsObject[option] = {
                    chosenBy: [],
                })
        );
        const params = {
            options: optionsObject,
            password: pollPassword,
            question: question,
            userId: user.uid,
        };
        createPoll(params);
    };

    if (pollId) return <LinkPage id={pollId} />;
    return (
        <div className={styles.flex}>
            <h1 className={styles.headerText}>
                Create a poll
                <span
                    aria-label="Protect the poll with a password"
                    style={{ cursor: "pointer", fontSize: "1.6rem" }}
                    onClick={() => {
                        setPassNeeded((oldState) => !oldState);
                    }}
                >
                    {passNeeded ? "🔒" : "🔓"}
                </span>
            </h1>
            <div>
                <label style={{ width: "100%" }}>
                    Question:
                    <input
                        className="formInput"
                        type="text"
                        name="question"
                        placeholder="What is the meaing of life?"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                    />
                </label>
                {passNeeded && (
                    <label>
                        Password:
                        <input
                            className="formInput"
                            type="text"
                            name="pollPassword"
                            value={pollPassword}
                            onChange={(event) => setPollPassword(event.target.value)}
                        />
                    </label>
                )}
                <div>
                    <label>
                        Options to select:
                        {Object.keys(answers).map((answerKey) => (
                            <Option
                                noRemove={Object.keys(answers).length === 1}
                                count={Object.keys(answers).length}
                                key={answerKey}
                                name={answerKey}
                                value={answers[answerKey]}
                                onInput={(event) =>
                                    setAnswers({
                                        ...answers,
                                        [answerKey]: event.target.value,
                                    })
                                }
                                handleRemove={() => handleRemove(answerKey)}
                            />
                        ))}
                    </label>
                    <button onClick={handleAdd} className="button add">
                        +
                    </button>
                </div>
            </div>
            <button disabled={isLoading} onClick={handleSubmit} className="button submit">
                {isLoading ? <Loader small /> : "SUMBIT POLL"}
            </button>
        </div>
    );
};

export default PollConfig;
