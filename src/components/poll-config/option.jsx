const Option = ({ onInput, value, name, handleRemove, noRemove, count }) => {
    return (
        <div style={{ height: "5rem" }}>
            <input
                placeholder={count === 1 ? "42" : ""}
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
                    className="button remove"
                >
                    ×
                </button>
            )}
        </div>
    );
};

export default Option;
