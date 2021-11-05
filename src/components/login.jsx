import { useRef, useState } from "react";
import { auth } from "../api/firebase";
import { signInAnonymously } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { useHistory } from "react-router";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../api/firebase";
import { useLocation } from "react-router-dom";
import Loader from "./misc/loader";
import { useDispatch } from "react-redux";
import { setInfo } from "../redux/infoSlice";
import { useTitle } from "hooks/useTitle";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();
    const userNameRef = useRef();

    useTitle("Pollo | login");

    const handleSignIn = () => {
        signInAnonymously(auth)
            .then((result) => {
                if (!result?.user) {
                    setLoading(false);
                    return;
                }
                const json = JSON.stringify(result.user);
                dispatch(setUser(JSON.parse(json)));

                if (localStorage.getItem("persistentLogin") === "true")
                    localStorage.setItem("user", json);
                debugger;
                setDoc(doc(firestore, "users", result.user.uid), {
                    uid: result.user.uid,
                    FullName: userNameRef.current.value,
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
    };

    return (
        <div className="content center">
            {loading ? (
                <Loader />
            ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>
                        Choose a name:
                        <input
                            className="formInput"
                            type="text"
                            name="userName"
                            ref={userNameRef}
                        />
                    </label>
                    <button
                        className={"button submit login"}
                        onClick={handleSignIn}
                    >
                        Let's Go
                    </button>
                </div>
            )}
        </div>
    );
};

export default Login;
