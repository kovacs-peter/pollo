import { useEffect } from "react";
import { auth } from "../api/firebase";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const provider = new GoogleAuthProvider(auth);

const Login = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getRedirectResult(auth)
            .then((result) => {
                dispatch(setUser(result.user));
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
