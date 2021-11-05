import { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import {
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
} from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { useHistory } from "react-router";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../api/firebase";
import { useLocation } from "react-router-dom";
import Loader from "./misc/loader";
import { useSelector, useDispatch } from "react-redux";
import { setInfo } from "../redux/infoSlice";
import { useTitle } from "hooks/useTitle";

const provider = new GoogleAuthProvider(auth);

const Login = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();
    const user = useSelector((state) => state.user.userData);

    useTitle("Pollo | login");

    const handleToggle = (event) => {
        localStorage.setItem("persistentLogin", event.target.checked);
    };

    useEffect(() => {
        //setLoading(true);
        if (user?.userData) history.push(search.split("/"));
        getRedirectResult(auth)
            .then((result) => {
                if (!result?.user) {
                    setLoading(false);
                    return;
                }

                const json = JSON.stringify(result.user);
                dispatch(setUser(JSON.parse(json)));

                if (localStorage.getItem("persistentLogin") === "true")
                    localStorage.setItem("user", json);

                setDoc(doc(firestore, "users", result.user.uid), {
                    uid: result.user.uid,
                    FullName: result.user.displayName,
                    photoURL: result.user.photoURL,
                }).then(() => {
                    dispatch(
                        setInfo({
                            infoText: "Successful login",
                            infoType: "info",
                        })
                    );
                    history.push(search.split("from=")[1] || "/");
                });
            })
            .catch((error) => {
                dispatch(
                    setInfo({
                        infoType: "error",
                        infoText: "Unsuccessful login",
                    })
                );
                console.error(error.message);
            })
            .finally(() => setLoading(false));
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
                    <div
                        style={{
                            marginTop: "1rem",
                            alignSelf: "center",
                        }}
                    >
                        <input
                            style={{ cursor: "pointer" }}
                            id="check"
                            onClick={handleToggle}
                            type="checkbox"
                        />
                        <label style={{ cursor: "pointer" }} htmlFor="check">
                            {" "}
                            stay logged in
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
