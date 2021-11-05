import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./answerer.module.scss";
const Answerer = ({ user }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        try {
            getDoc(user).then((doc) => {
                setUserData(doc.data());
            });
        } catch {}
        // eslint-disable-next-line
    }, []);
    if (userData) return <div className={styles.pill}>{userData.FullName}</div>;
    return <>asd</>;
};

export default Answerer;
