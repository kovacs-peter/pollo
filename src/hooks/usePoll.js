import { useQuery } from "react-query";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../api/firebase";

const fetchPoll = (uid) => async () => {
    const result = await getDoc(doc(firestore, "polls", uid));
    return result.data();
};
export const usePoll = (uid) => {
    return useQuery("poll", fetchPoll(uid), {
        retry: false,
        refetchOnWindowFocus: false,
    });
};
