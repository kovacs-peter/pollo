import styles from "./style/poll-password.module.scss";

const PollPassword = ({ passInput }) => {
    return (
        <div className="content center">
            <h1>🐓 POLLO</h1>

            <input
                className={"formInput " + styles.input}
                type="text"
                placeholder="Enter the Poll's Password"
                name="pollPasswordInput"
                onInput={(event) => passInput(event.target.value)}
            />
        </div>
    );
};

export default PollPassword;
