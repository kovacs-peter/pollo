import { useState, useEffect, useRef } from "react";
import styles from "./style/poll-config.module.scss";
import { useSelector } from "react-redux";
import LinkPage from "./link-page";
import Option from "./option";
import { useCreatePoll } from "../../hooks/useCreatePoll";
import Loader from "../misc/loader";
import useValidate from "../../hooks/useValidation";
import { useTitle } from "hooks/useTitle";

const PollConfig = () => {
    const user = useSelector((state) => state.user.userData);
    const { validate } = useValidate();
    const questionRef = useRef("");
    const [passNeeded, setPassNeeded] = useState(false);
    const passRef = useRef();
    const [answers, setAnswers] = useState({ option0: "" });
    const [pollId, setPollId] = useState(null);
    const { mutate: createPoll, isLoading, isSuccess, data } = useCreatePoll();

    useTitle("Pollo | create a poll");

    useEffect(() => {
        if (isSuccess) {
            setPollId(data.id);
        }
    }, [isSuccess, data]);

    const handleAdd = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const nums = Object.keys(answers).map(
            (ansKey) => ansKey.match(/\d+$/)[0]
        );
        const num = Math.max(...nums) + 1;
        const option = `option${num}`;
        setAnswers({ ...answers, [option]: "" });
    };

    const handleRemove = (key) => {
        let modifyObject = { ...answers };
        delete modifyObject[key];
        setAnswers(modifyObject);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const options = Object.values(answers);
        const valid = validate([
            {
                key: "question",
                value: questionRef?.current?.value,
                required: true,
            },
            {
                key: "password",
                value: passRef?.current?.value,
                required: passNeeded,
            },
            {
                key: "answer options",
                value: options,
                required: true,
            },
        ]);
        if (!valid) return;

        const optionsObject = {};
        options.forEach(
            (option) =>
                (optionsObject[option] = {
                    chosenBy: [],
                })
        );

        const params = {
            options: optionsObject,
            password: passRef?.current?.value || null,
            question: questionRef?.current?.value || null,
            userId: user.uid,
        };
        createPoll(params);
    };

    if (pollId) return <LinkPage id={pollId} />;
    return (
        <form className="content" onSubmit={handleSubmit}>
            <div>
                <h1>Create a poll</h1>
                <div
                    className={styles.lakat}
                    aria-label="Protect the poll with a password"
                    onClick={() => {
                        setPassNeeded((oldState) => !oldState);
                    }}
                >
                    Protected Mode: {passNeeded ? "????" : "????"}
                </div>
            </div>
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
            <button
                type="submit"
                disabled={isLoading}
                className="button submit"
            >
                {isLoading ? <Loader small /> : "SUMBIT POLL"}
            </button>
        </form>
    );
};

export default PollConfig;
