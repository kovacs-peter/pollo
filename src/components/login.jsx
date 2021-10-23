import { useEffect } from "react";
import { auth } from "../api/firebase";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
const provider = new GoogleAuthProvider(auth);

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                sessionStorage.setItem("user", JSON.stringify(result.user));
                dispatch(setUser(result.user));
                history.push("/");
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
