import { useMutation } from "react-query";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../api/firebase";

const submitPoll = async (params) => {
    const apiParams = { ...params, createdBy: doc(firestore, "users", params.userId) };
    const result = await addDoc(collection(firestore, "polls"), apiParams);
    return result;
};

export const useCreatePoll = () => {
    return useMutation((data) => submitPoll(data), {
        retry: false,
    });
};
