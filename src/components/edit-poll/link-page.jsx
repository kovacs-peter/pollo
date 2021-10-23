import React from "react";

const LinkPage = ({ id }) => {
    const plloUrl = `${window.location.host}/${id}`;
    const handleClick = () => {
        navigator.clipboard.writeText(plloUrl);
    };
    return (
        <div>
            <h1>Your Pollo is available here:</h1>
            <p onClick={handleClick}>{plloUrl}</p>
        </div>
    );
};

export default LinkPage;
