import styles from "./style/header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "redux/themeSlice";

const HEADER_ITEMS = [
    { title: "CREATE POLL", path: "/new" },
    { title: "MY POLLS", path: "/" },
];
const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);

    return (
        <header className={`${styles.headerContainer} `}>
            <div>
                <Link className={`${styles.logo} `} to="/">
                    🐓 POLLO
                </Link>
            </div>
            <div className={styles.headerItems}>
                {HEADER_ITEMS.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`${styles.link} `}
                    >
                        {item.title}
                    </Link>
                ))}
                <div
                    style={{ cursor: "pointer", fontsize: "0.9rem" }}
                    onClick={() => dispatch(toggleTheme())}
                >
                    {theme === "dark" ? "🌘" : "🌕"}
                </div>
            </div>
        </header>
    );
};

export default Header;
