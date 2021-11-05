import { useMutation, useQueryClient } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../api/firebase";

const submitPoll = async (params) => {
    const apiParams = {
        ...params,
        createdById: params.userId,
        answeredBy: [],
    };
    const result = await addDoc(collection(firestore, "polls"), apiParams);
    return result;
};

export const useCreatePoll = () => {
    const client = useQueryClient();

    return useMutation((data) => submitPoll(data), {
        retry: false,
        onSuccess: () => {
            client.invalidateQueries("polls");
            client.removeQueries("poll");
        },
    });
};
