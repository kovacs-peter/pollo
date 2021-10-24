import { useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../api/firebase";

const submitPoll = async (params) => {
    const result = await addDoc(collection(firestore, "polls"), params);
    return result;
};

export const useCreatePoll = () => {
    return useMutation((data) => submitPoll(data), {
        retry: false,
    });
};
