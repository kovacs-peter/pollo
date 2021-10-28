import { useMutation } from "react-query";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../api/firebase";

const updatePoll = async ({ pollUid, userId, selectedOption }) => {
    const result = updateDoc(
        doc(firestore, "polls", pollUid),
        {
            [`options.${selectedOption}.chosenBy`]: arrayUnion(
                doc(firestore, "users", userId)
            ),
        },
        { merge: true }
    );

    return result;
};

export const useUpdatePoll = () => {
    return useMutation((data) => updatePoll(data), {
        retry: false,
    });
};
