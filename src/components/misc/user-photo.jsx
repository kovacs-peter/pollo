import styles from "./user-photo.module.scss";
import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const FACES = [
    "👶🏻",
    "👧🏼",
    "🧒🏽",
    "👦🏾",
    "👩🏽",
    "🧑",
    "👨🏻",
    "👩🏽‍🦱",
    "🧑🏾‍🦱",
    "👨🏼‍🦱",
    "👩🏻‍🦰",
    "🧑🏽‍🦰",
    "👨🏼‍🦰",
    "👱🏻‍♀️",
    "👱🏼",
    "👱🏽‍♂️",
    "👩🏽‍🦳",
    "🧑🏻‍🦳",
    "👨🏿‍🦳",
    "👩🏽‍🦲",
    "🧑🏻‍🦲",
    "👨🏾‍🦲",
    "🧔🏻",
    "👵🏼",
    "🧓🏾",
    "👴🏿",
    "👲🏿",
    "👳🏼‍♀️",
    "👳🏽",
    "👳🏾‍♂️",
];

const UserPhoto = ({ user }) => {
    const [userData, setUserData] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * (FACES.length - 1)));

        try {
            getDoc(user).then((doc) => {
                setUserData(doc.data());
            });
        } catch {}
        // eslint-disable-next-line
    }, []);

    return userData?.photoURL ? (
        <img
            className={styles.photo}
            src={userData.photoURL}
            alt={userData.displayName}
            referrerpolicy="no-referrer"
        ></img>
    ) : (
        <div className={styles.photo} alt={userData?.displayName}>
            {FACES[index]}
        </div>
    );
};

export default UserPhoto;
