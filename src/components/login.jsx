import { useState } from "react";
import { useHistory } from "react-router";
import { loginAnonymously } from "../api/firebase";
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

    const handleSignIn = (event) => {
        event.preventDefault();
        if (!userName) {
            dispatch(
                setInfo({
                    infoType: "error",
                    infoText: "Fill in your name",
                })
            );
            return;
        }
        loginAnonymously()
            .then((result) => {
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
                <form
                    onSubmit={handleSignIn}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "calc(100% - 2rem)",
                        gap: "1rem",
                    }}
                >
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
                    <button type="submit" className={"button submit login"}>
                        Let's Go
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;
