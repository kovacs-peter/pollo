import style from "./style/poll-list.module.scss";
import { useSelector } from "react-redux";
import { usePolls } from "../../hooks/usePolls";
import { Link } from "react-router-dom";
import Loader from "../misc/loader";
const PollList = () => {
    const user = useSelector((state) => state.user.userData);

    const userUid = user?.uid;
    const { data: pollList, isLoading } = usePolls(userUid);
    if (isLoading || !user)
        return (
            <div className="content center">
                <Loader />
            </div>
        );
    return (
        <div className="content">
            <h1 className="header-text">My polls</h1>
            <div className={style.flex}>
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
            <Link className={style.buttonAlign} to="/new">
                <button className="button submit">CREATE A POLL</button>
            </Link>
        </div>
    );
};

export default PollList;
