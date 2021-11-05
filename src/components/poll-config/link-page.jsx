import { useState } from "react";
import { Link } from "react-router-dom";
const LinkPage = ({ id }) => {
    const [clicked, setClicked] = useState(false);
    const plloUrl = `${window.location.host}/#/${id}`;
    const handleClick = () => {
        navigator.clipboard.writeText(plloUrl);
        setClicked(true);
    };
    return (
        <div className="content" style={{ justifyContent: "space-between" }}>
            <h1 style={{ textAlign: "center" }}>
                🐓🐓🐓 Your Pollo is available! 🐓🐓🐓
            </h1>
            <div style={{ textAlign: "center" }}>
                <small>You can access the poll here:</small>
                <br />
                <div>
                    <Link style={{ cursor: "pointer" }} to={`/${id}`}>
                        {plloUrl}
                    </Link>
                </div>
                <br />
                <button className="button submit" onClick={handleClick}>
                    {clicked ? "Copied!" : "Copy to Clipborad"}
                </button>
            </div>
            <div></div>
        </div>
    );
};

export default LinkPage;
