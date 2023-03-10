import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { publicReq } from "../apiRequest";

const SideVideo = ({ _id, title, image, video, userId, googleImage }) => {
    const [user, setUser] = useState(null);

    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await publicReq.get(`users/find/${userId}`);
                setUser(res.data);
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchUserData();
    }, [userId]);

    console.log(googleImage);

    return (
        <div className="flex items-start gap-2">
            <div className="min-w-[170px] h-[95px]">
                <Link to={`/video/${_id}`}>
                    <img
                        className="object-cover"
                        src={image?.url || googleImage}
                        alt={title}
                    />
                </Link>
            </div>

            <div className="">
                <h5 className="text-sm font-medium">
                    {truncateString(title, 50)}
                </h5>

                <p className="text-[#606060] text-[12px] leading-[18px] font-normal mt-1">
                    {user?.username}
                </p>

                <p className="text-[#606060] text-[12px] leading-[18px] font-normal">
                    {video?.views > 0 && `${video?.views} views • `}
                    {format(video?.createdAt)}
                </p>
            </div>
        </div>
    );
};

export default SideVideo;
