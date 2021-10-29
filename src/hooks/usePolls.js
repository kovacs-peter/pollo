import { useQuery } from "react-query";
import { query, collection, where, getDocs } from "firebase/firestore";
import { firestore } from "../api/firebase";

const fetchPollsFor = (userUid) => async () => {
    const q = query(collection(firestore, "polls"), where("createdById", "==", userUid));

    const res = await getDocs(q);
    let docs = [];
    res.forEach((doc) => {
        docs.push({ ...doc.data(), uid: doc.id });
    });
    return docs;
};
export const usePolls = (userUid) => {
    return useQuery("polls", fetchPollsFor(userUid), {
        retry: false,
        refetchOnWindowFocus: true,
        enabled: !!userUid,
    });
};
