import styles from "./style/header.module.scss";
import { Link } from "react-router-dom";

const HEADER_ITEMS = [
    { title: "CREATE POLL", path: "/new" },
    { title: "MY POLLS", path: "/" },
];
const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div>
                <Link className={styles.logo} to="/">
                    🐓 POLLO
                </Link>
            </div>
            <div className={styles.headerItems}>
                {HEADER_ITEMS.map((item) => (
                    <Link key={item.path} to={item.path} className={styles.link}>
                        {item.title}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Header;
