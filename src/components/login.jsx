import { useEffect } from "react";
import { auth } from "../api/firebase";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../api/firebase";

const provider = new GoogleAuthProvider(auth);

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                const json = JSON.stringify(result.user);
                dispatch(setUser(json));
                localStorage.setItem("user", json);

                setDoc(doc(firestore, "users", result.user.uid), {
                    uid: result.user.uid,
                    FullName: result.user.displayName,
                    photoURL: result.user.photoURL,
                });
                history.push("/");
            })
            .catch((error) => {
                console.log(error);
            })

            .catch((error) => {
                console.log(error.code);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <button onClick={() => signInWithRedirect(auth, provider)}>
                Login with google
            </button>
        </div>
    );
};

export default Login;
