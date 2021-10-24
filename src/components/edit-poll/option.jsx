import styles from "./style/poll-config.module.css";

const Option = ({ onInput, value, name, handleRemove, noRemove }) => {
    return (
        <div style={{ height: "5rem" }}>
            <input
                className="formInput"
                type="text"
                name={name}
                value={value}
                onInput={onInput}
            />
            {!noRemove && (
                <button
                    aria-label="Add another option"
                    onClick={handleRemove}
                    className={`${styles.removeButton} ${styles.button}`}
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Option;
