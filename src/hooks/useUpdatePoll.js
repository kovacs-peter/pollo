import { useMutation } from "react-query";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../api/firebase";

const updatePoll = async ({ pollUid, userId, selectedOption }) => {
    const userDoc = doc(firestore, "users", userId);
    const pollDoc = doc(firestore, "polls", pollUid);
    const params = {
        answeredBy: arrayUnion(userDoc),
    };
    if (selectedOption)
        params[`options.${selectedOption}.chosenBy`] = arrayUnion(userDoc);
    const result = updateDoc(pollDoc, params, { merge: true });

    return result;
};

export const useUpdatePoll = () => {
    return useMutation((data) => updatePoll(data), {
        retry: false,
    });
};
