import { useState } from "react";
import styles from "./style/poll-config.module.css";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../api/firebase";
import { useSelector } from "react-redux";
import LinkPage from "./link-page";

const PollConfig = () => {
    const user = useSelector((state) => {
        if (state.user.userData) return JSON.parse(state.user.userData);
    });
    const [question, setQuestion] = useState("");
    const [pollPassword, setPollPassword] = useState("");
    const [answers, setAnswers] = useState({ option0: "" });
    const [pollId, setpollId] = useState(null);

    const handleAdd = (event) => {
        event.stopPropagation();

        const num = Object.keys(answers).length;
        const option = `option${num}`;
        setAnswers({ ...answers, [option]: "" });
    };

    const handleSubmit = () => {
        const optionsArray = Object.values(answers).map((option) => ({
            option: option,
            chosen_by: [],
        }));
        const params = {
            options: optionsArray,
            password: pollPassword,
            question: question,
            created_by: user.uid,
        };

        addDoc(collection(firestore, "polls"), params).then((res) => setpollId(res.id));
    };

    if (pollId) return <LinkPage id={pollId} />;
    return (
        <div>
            <h1 className={styles.headerText}>Create a poll</h1>
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
                Password:
                <input
                    className="formInput"
                    type="text"
                    name="pollPassword"
                    value={pollPassword}
                    onChange={(event) => setPollPassword(event.target.value)}
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
                SUMBIT POLL
            </button>
        </div>
    );
};

export default PollConfig;
