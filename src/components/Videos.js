import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicReq } from "../apiRequest";
import { Video } from "./Video";
import {
    videosDataState,
    videosLoadingState,
    fetchVideosStart,
    fetchVideosSuccess,
    fetchVideosError,
} from "../redux/videosSlice";
import { toast } from "react-toastify";
import { sidebarState, tagsValueState } from "../redux/commonSlice";
import VideoSkelton from "./VideoSkelton";
import { userDataState } from "../redux/userSlice";

const Videos = () => {
    const user = useSelector(userDataState);
    const navigate = useNavigate();

    const { type } = useParams();
    const dispatch = useDispatch();

    const loading = useSelector(videosLoadingState);
    const videos = useSelector(videosDataState);
    const tagsType = useSelector(tagsValueState);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        const fetchVideoData = async () => {
            dispatch(fetchVideosStart());
            try {
                if (type === "subscibed") {
                    if (!user) {
                        navigate("/");
                        return;
                    }

                    const res = await publicReq.get(`video/${type}`);
                    dispatch(fetchVideosSuccess(res.data));
                } else if (type) {
                    const res = await publicReq.get(`video/${type}`);
                    dispatch(fetchVideosSuccess(res.data));
                } else {
                    const res = await publicReq.get("video/random");
                    dispatch(fetchVideosSuccess(res.data));
                }
            } catch (err) {
                toast.error(err.message);
                dispatch(fetchVideosError(err.message));
            }
        };

        fetchVideoData();
    }, [type, dispatch]);

    const sidebar = useSelector(sidebarState);

    return (
        <div className="">
            {loading ? (
                <div
                    className={`grid gap-x-[15px] gap-y-[45px] ${
                        sidebar ? "grid-cols-4" : "grid-cols-5"
                    } `}
                >
                    {Array(8).fill(<VideoSkelton />)}
                </div>
            ) : !loading &&
              videos.filter((item) => item.tags.includes(tagsType)).length ===
                  0 &&
              tagsType != "all" ? (
                <h1 className="text-3xl font-semibold">No video found now.</h1>
            ) : !loading && videos?.length === 0 ? (
                <h1 className="text-3xl font-semibold">No video found now.</h1>
            ) : !loading && tagsType === "all" ? (
                <div
                    className={`grid gap-x-[15px] gap-y-[45px] ${
                        sidebar ? "grid-cols-4" : "grid-cols-5"
                    } `}
                >
                    {videos.map((video, i) => (
                        <Video
                            key={i}
                            {...video}
                            userLoading={userLoading}
                            setUserLoading={setUserLoading}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className={`grid gap-x-[15px] gap-y-[45px] ${
                        sidebar ? "grid-cols-4" : "grid-cols-5"
                    } `}
                >
                    {videos
                        .filter((item) => item.tags.includes(tagsType))
                        .map((video, i) => (
                            <Video
                                key={i}
                                {...video}
                                userLoading={userLoading}
                                setUserLoading={setUserLoading}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default Videos;
