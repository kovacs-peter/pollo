import { useState } from "react";
import styles from "./style/poll-config.module.css";
const PollConfig = ({ action }) => {
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState({ option0: "" });

    const handleAdd = (event) => {
        event.stopPropagation();

        const num = Object.keys(answers).length;
        const option = `option${num}`;
        setAnswers({ ...answers, [option]: "" });
    };

    const handleSubmit = () => {};
    return (
        <div>
            <h1 className={styles.headerText}>
                {action === "new" ? "Create a poll" : "Edit poll"}
            </h1>
            <label>
                Question:
                <input
                    className="formInput"
                    type="text"
                    name="question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                />
            </label>
            <label>
                Answer option:
                {Object.keys(answers).map((answerKey) => (
                    <input
                        key={answerKey}
                        className="formInput"
                        type="text"
                        name={answerKey}
                        value={answers[answerKey]}
                        onInput={(event) =>
                            setAnswers({
                                ...answers,
                                [answerKey]: event.target.value,
                            })
                        }
                    />
                ))}
            </label>
            <button
                onClick={handleAdd}
                className={`${styles.addButton} ${styles.button}`}
            >
                ADD OPTION
            </button>
            <button
                onClick={handleSubmit}
                className={`${styles.submitButton} ${styles.button}`}
            >
                SUBMIT POLL
            </button>
        </div>
    );
};

export default PollConfig;
