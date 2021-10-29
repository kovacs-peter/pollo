import { useState, useEffect, useRef } from "react";
import styles from "./style/poll-config.module.scss";
import { useSelector } from "react-redux";
import LinkPage from "./link-page";
import Option from "./option";
import { useCreatePoll } from "../../hooks/useCreatePoll";
import Loader from "../misc/loader";

const PollConfig = () => {
    const user = useSelector((state) => state.user.userData);

    const questionRef = useRef("");
    const [passNeeded, setPassNeeded] = useState(false);
    const passRef = useRef();
    const [answers, setAnswers] = useState({ option0: "" });
    const [pollId, setPollId] = useState(null);
    const { mutate: createPoll, isLoading, isSuccess, data } = useCreatePoll();

    useEffect(() => {
        if (isSuccess) {
            setPollId(data.id);
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
            password: passRef.current.value,
            question: questionRef.current.value,
            userId: user.uid,
        };
        createPoll(params);
    };

    if (pollId) return <LinkPage id={pollId} />;
    return (
        <div className="content">
            <h1 className="header-text">
                Create a poll
                <span
                    className={styles.lakat}
                    aria-label="Protect the poll with a password"
                    onClick={() => {
                        setPassNeeded((oldState) => !oldState);
                    }}
                >
                    {passNeeded ? "🔒" : "🔓"}
                </span>
            </h1>
            <div className={styles.form}>
                <label>
                    Question:
                    <input
                        className="formInput"
                        type="text"
                        name="question"
                        placeholder="What is the meaing of life?"
                        ref={questionRef}
                    />
                </label>
                {passNeeded && (
                    <label>
                        Password:
                        <input
                            className="formInput"
                            type="text"
                            name="pollPassword"
                            ref={passRef}
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
