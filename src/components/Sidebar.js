import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MenuItem from "./MenuItem";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TheatersIcon from "@mui/icons-material/Theaters";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import {
    MdOutlineSubscriptions,
    MdSubscriptions,
    MdVideoLibrary,
    MdOutlineVideoLibrary,
} from "react-icons/md";
import {
    AiOutlineLike,
    AiFillLike,
    AiOutlineFire,
    AiFillFire,
} from "react-icons/ai";
import {
    RiVideoLine,
    RiVideoFill,
    RiMusicLine,
    RiMusicFill,
} from "react-icons/ri";
import { BsTrophy, BsTrophyFill } from "react-icons/bs";

import { HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userDataState } from "../redux/userSlice";
import { hideSidebar } from "../redux/commonSlice";
import UserSidebar from "./UserSidebar";

export const Sidebar = () => {
    const [active, setActive] = useState(null);
    const user = useSelector(userDataState);
    const dispatch = useDispatch();

    const footerLinks1 = [
        {
            title: "about",
            path: "/about",
        },
        {
            title: "press",
            path: "/press",
        },
        {
            title: "copywrite",
            path: "/copywrite",
        },
        {
            title: "contact us",
            path: "/contact",
        },
        {
            title: "creators",
            path: "/creators",
        },
        {
            title: "advertise",
            path: "/advertise",
        },
        {
            title: "developers",
            path: "/developers",
        },
    ];

    const footerLinks2 = [
        {
            title: "terms",
            path: "/terms",
        },
        {
            title: "privacy",
            path: "/privacy",
        },
        {
            title: "policy & safety",
            path: "/policy",
        },
        {
            title: "how youtube works",
            path: "/how",
        },
        {
            title: "test new features",
            path: "/test",
        },
    ];

    const handleHumberger = () => {
        dispatch(hideSidebar());
    };

    return (
        <div className="group">
            <div className="flex items-center gap-[15px] relative px-[12px] pt-[10px] pb-[5px]">
                <IconButton onClick={handleHumberger}>
                    <MenuIcon className="!w-[24px] !h-[24px] !text-[#000]" />
                </IconButton>

                <Link
                    to="/"
                    className="w-fit h-[20px] absolute top-[20px] left-[70px]"
                >
                    <img src="/images/logo.png" alt="logo" />
                </Link>
            </div>

            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-white scrollbar-thumb-rounded group-hover:scrollbar-thumb-[#909090]">
                <div className="pr-[15px] sidebar__height">
                    <MenuItem
                        Icon={HomeOutlinedIcon}
                        IconActive={HomeIcon}
                        title="Home"
                        active={active}
                        setActive={setActive}
                    />

                    <MenuItem
                        Icon={TheatersOutlinedIcon}
                        IconActive={TheatersIcon}
                        title="Trending"
                        active={active}
                        setActive={setActive}
                        path={"/trend"}
                    />

                    {user && (
                        <MenuItem
                            Icon={MdOutlineSubscriptions}
                            IconActive={MdSubscriptions}
                            title="Subscription"
                            active={active}
                            setActive={setActive}
                            path={"/subscibed"}
                        />
                    )}

                    <hr className="my-3 border-[#000]/10" />

                    <MenuItem
                        Icon={MdOutlineVideoLibrary}
                        IconActive={MdVideoLibrary}
                        title="Library"
                        active={active}
                        setActive={setActive}
                    />

                    <MenuItem
                        Icon={RiVideoLine}
                        IconActive={RiVideoFill}
                        title="Your videos"
                        active={active}
                        setActive={setActive}
                    />

                    <MenuItem
                        Icon={AiOutlineLike}
                        IconActive={AiFillLike}
                        title="Liked videos"
                        active={active}
                        setActive={setActive}
                    />

                    {!user && (
                        <>
                            <hr className="my-3 border-[#000]/10" />

                            <div className="px-5 py-1">
                                <p className="text-[#0f0f0f] text-[14px] leading-[20px] font-normal mb-3">
                                    Sign in to like videos, comment, and
                                    subscribe.
                                </p>

                                <Link to="/login">
                                    <Button
                                        className="!flex !items-center !justify-center !gap-[6px] !w-[100px] !h-[34px] border !border-black/10 !text-[#065fd4] !text-[14px] !leading-[1] !font-medium !rounded-full !normal-case !p-0 hover:!bg-[#def1ff] hover:!border-transparent"
                                        variant="outlined"
                                    >
                                        <span>
                                            <HiOutlineUserCircle className="!text-[#065fd4] !w-[24px] !h-[24px]" />
                                        </span>
                                        Sign in
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}

                    <hr className="my-3 border-[#000]/10" />

                    {user && <UserSidebar />}

                    <h3 className="px-5 mb-2 mt-[15px] text-[14px] leading-[20px] font-medium text-[#606060] uppercase">
                        Explore
                    </h3>

                    <MenuItem
                        Icon={AiOutlineFire}
                        IconActive={AiFillFire}
                        title="Movie"
                        active={active}
                        setActive={setActive}
                    />

                    <MenuItem
                        Icon={RiMusicLine}
                        IconActive={RiMusicFill}
                        title="Music"
                        active={active}
                        setActive={setActive}
                    />

                    <MenuItem
                        Icon={BsTrophy}
                        IconActive={BsTrophyFill}
                        title="Sports"
                        active={active}
                        setActive={setActive}
                    />

                    <hr className="my-3 border-[#000]/10" />

                    <footer className="px-5 pb-[20px]">
                        <ul className="flex items-center flex-wrap gap-2 max-w-[190px] pt-2 mb-5">
                            {footerLinks1.map((item, i) => (
                                <li className="leading-[0.8]" key={i}>
                                    <Link
                                        to={item.path}
                                        className="text-[13px] leading-[0px] font-medium text-[#606060] capitalize"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <ul className="flex items-center flex-wrap gap-2 mb-5">
                            {footerLinks2.map((item, i) => (
                                <li className="leading-[0.8]" key={i}>
                                    <Link
                                        to={item.path}
                                        className="text-[13px] leading-[0px] font-medium text-[#606060] capitalize"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <p className="text-[12px] leading-[18px] font-normal text-[#909090]">
                            © 2023 Educational Purpose
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};
