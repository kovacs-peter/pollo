import style from "./style/poll-list.module.scss";
import { useSelector } from "react-redux";
import { usePolls } from "../../hooks/usePolls";
import { Link } from "react-router-dom";
import Loader from "../misc/loader";
const PollList = () => {
    const user = useSelector((state) => {
        if (state.user.userData) return JSON.parse(state.user.userData);
    });
    const userUid = user?.uid;
    const { data: pollList, isLoading } = usePolls(userUid);

    if (isLoading)
        return (
            <div className={style.loaderContainer}>
                <Loader />
            </div>
        );
    return (
        <div className={style.pageContainer}>
            {pollList &&
                pollList.map((poll) => (
                    <div key={poll.uid} className={style.listItem}>
                        <div>{poll.question}</div>
                        <div className={style.divider}></div>
                        <Link className={style.link} to={"/" + poll.uid}>
                            {window.location.host}/{poll.uid}
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default PollList;
