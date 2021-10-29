import { useEffect, useState } from "react";
import { auth } from "../api/firebase";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { setInfo } from "../redux/infoSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../api/firebase";
import { useLocation } from "react-router-dom";
import Loader from "./misc/loader";
import { useSelector } from "react-redux";

const provider = new GoogleAuthProvider(auth);

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();
    const user = useSelector((state) => state.user.userData);

    useEffect(() => {
        if (user?.userData) history.push(search.split("/"));
        getRedirectResult(auth)
            .then((result) => {
                setLoading(true);
                if (!result?.user) {
                    setLoading(false);
                    return;
                }

                const json = JSON.stringify(result.user);
                dispatch(setUser(JSON.parse(json)));
                localStorage.setItem("user", json);

                setDoc(doc(firestore, "users", result.user.uid), {
                    uid: result.user.uid,
                    FullName: result.user.displayName,
                    photoURL: result.user.photoURL,
                }).then(() => {
                    dispatch(setInfo({ infoText: "Successful login", infoType: "info" }));
                    history.push(search.split("from=")[1] || "/");
                });
            })
            .catch((error) => {
                dispatch(setInfo({ infoType: "error", infoText: "Unsuccessful login" }));
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
                </div>
            )}
        </div>
    );
};

export default Login;
