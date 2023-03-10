import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { publicReq } from "../apiRequest";
import { format } from "timeago.js";

export const Video = ({
    _id,
    title,
    image,
    views,
    userId,
    createdAt,
    userLoading,
    setUserLoading,
}) => {
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
                setUserLoading(true);
                const res = await publicReq.get(`users/find/${userId}`);
                setUser(res.data);
                setUserLoading(false);
            } catch (err) {
                toast.error(err.message);
                setUserLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const addView = async () => {
        try {
            const res = await publicReq.put(`video/view/${_id}`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <div className="w-full h-[200px]" onClick={addView}>
                <Link to={`/video/${_id}`}>
                    <img
                        className="object-cover"
                        src={image?.url}
                        alt={title}
                    />
                </Link>
            </div>

            {!userLoading && (
                <div className="flex items-start gap-[14px] pt-[10px]">
                    <Avatar
                        className="!w-[36px] !h-[36px] cursor-pointer"
                        alt={user?.username}
                        src={user?.image?.url || user?.googleImage}
                    >
                        {user?.username}
                    </Avatar>

                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-1">
                            <div className="">
                                <Link to={`/video/${_id}`} onClick={addView}>
                                    <h3 className="text-[16px] leading-[22px] font-medium text-[#030303]  max-w-[270px]">
                                        {truncateString(title, 50)}
                                    </h3>
                                </Link>

                                <h5 className="text-[#606060] text-[14px] leading-[20px] font-normal mt-1 uppercase">
                                    {user?.username}
                                </h5>

                                <p className="text-[#606060] text-[14px] leading-[20px] font-normal">
                                    {views > 0 && `${views} views •`}{" "}
                                    {format(createdAt)}
                                </p>
                            </div>

                            <IconButton>
                                <RxDotsVertical className="!w-[24px] !h-[24px] !text-[#000]" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
