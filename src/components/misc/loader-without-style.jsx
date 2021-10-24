import React from "react";

const LoaderWithoutStyle = (styles) => {
    return (
        <div className={styles.container}>
            <span className={styles.circle}></span>
            <span className={styles.circle}></span>
            <span className={styles.circle}></span>
            <span className={styles.circle}></span>
        </div>
    );
};

export default LoaderWithoutStyle;
