import { useEffect, useRef, useState } from "react";
import { auth } from "../api/firebase";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../api/firebase";
import { useLocation } from "react-router-dom";
import Loader from "./misc/loader";
const provider = new GoogleAuthProvider(auth);

const Login = () => {
    const [loading, setLoading] = useState(true);
    const checkboxRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                setLoading(true);
                if (!result?.user) {
                    setLoading(false);
                    return;
                }

                const json = JSON.stringify(result.user);
                dispatch(setUser(JSON.parse(json)));
                if (checkboxRef.current?.checked) localStorage.setItem("user", json);

                setDoc(doc(firestore, "users", result.user.uid), {
                    uid: result.user.uid,
                    FullName: result.user.displayName,
                    photoURL: result.user.photoURL,
                }).then(() => {
                    history.push(search.split("?from=")[1] || "/");
                });
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <div className="content center">
            {loading ? (
                <Loader />
            ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <button
                        className={"button submit login"}
                        onClick={() => signInWithRedirect(auth, provider)}
                    >
                        Login with google
                    </button>
                    <div style={{ marginTop: "1rem", alignSelf: "center" }}>
                        <input ref={checkboxRef} type="checkbox" /> stay logged in
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
