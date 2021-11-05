import { useState } from "react";
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
    const [userName, setUserName] = useState("");
    useTitle("Pollo | login");

    const handleSignIn = () => {
        if (!userName) {
            dispatch(
                setInfo({
                    infoType: "error",
                    infoText: "Fill in your name",
                })
            );
            return;
        }
        signInAnonymously(auth)
            .then((result) => {
                if (!result?.user) {
                    setLoading(false);
                    return;
                }
                const json = JSON.stringify(result.user);
                dispatch(setUser(JSON.parse(json)));

                localStorage.setItem("user", json);
                setDoc(doc(firestore, "users", result.user.uid), {
                    uid: result.user.uid,
                    FullName: userName,
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
                        Choose a name to use:
                        <input
                            className="formInput"
                            placeholder="John Doe"
                            type="text"
                            name="userName"
                            onChange={(e) => setUserName(e.target.value)}
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
