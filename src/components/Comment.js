import Logout from "@mui/icons-material/Logout";
import {
    Avatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { RxDotsVertical } from "react-icons/rx";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { format } from "timeago.js";
import { publicReq } from "../apiRequest";

export const Comment = ({ createdAt, desc, userId }) => {
    const [user, setUser] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const resUser = await publicReq.get(`users/find/${userId}`);
            setUser(resUser.data);
        };

        fetchUser();
    }, [userId]);

    return (
        <div className="flex items-start gap-[16px]">
            <Avatar
                className="!w-[40px] !h-[40px] cursor-pointer"
                alt="Remy Sharp"
                src={user?.image?.url || user?.googleImage}
            >
                {user?.username}
            </Avatar>

            <div className="flex-1 pr-10">
                <div className="flex items-center gap-[6px]">
                    <h5 className="text-[13px] leading-[18px] font-medium">
                        {user?.username}
                    </h5>

                    <p className="text-[#606060] text-[12px] leading-[18px] font-normal hover:text-[#000] transition-all duration-100 cursor-pointer">
                        {format(createdAt)}
                    </p>
                </div>

                <p className="text-[14px] leading-[20px] font-normal mt-[5px]">
                    {desc}
                </p>
            </div>

            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="!w-[32px] !h-[32px] !ml-4 cursor-pointer !object-cover"
            >
                <RxDotsVertical className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
            </IconButton>
        </div>
    );
};
