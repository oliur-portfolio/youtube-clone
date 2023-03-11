import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    dislikeVideo,
    fetchVideoLoading,
    fetchVideoSuccess,
    likeVideo,
    videoDataState,
    videoLoadingState,
} from "../redux/videoSlice";
import { publicReq } from "../apiRequest";
import { commentSortState, hideSidebar } from "../redux/commonSlice";
import {
    Avatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { RiShareForwardLine, RiDownloadLine } from "react-icons/ri";
import { HiOutlineScissors } from "react-icons/hi";
import { BiListPlus } from "react-icons/bi";
import { RxDotsHorizontal } from "react-icons/rx";
import CustomizedMenus from "../components/CustomizedMenus";
import { Comment } from "../components/Comment";
import { CommentField } from "../components/CommentField";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { subscription, userDataState } from "../redux/userSlice";
import {
    commentsDataState,
    fetchCommentsSuccess,
} from "../redux/commentsSlice";
import Recommendation from "../components/Recommendation";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Details = () => {
    const { id } = useParams();
    const video = useSelector(videoDataState);
    const loading = useSelector(videoLoadingState);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const currentUser = useSelector(userDataState);
    const comments = useSelector(commentsDataState);
    const commentSortVal = useSelector(commentSortState);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(hideSidebar());

        dispatch(fetchVideoLoading());

        const fetchData = async () => {
            const resVideo = await publicReq.get(`video/find/${id}`);
            const resUser = await publicReq.get(
                `users/find/${resVideo.data.userId}`
            );
            setUser(resUser.data);
            dispatch(fetchVideoSuccess(resVideo.data));
        };

        fetchData();
    }, [id, dispatch]);

    const handleDeleteVideo = async (e) => {
        if (currentUser?._id === user?._id) {
            try {
                await publicReq.delete(`video/${id}`);
                toast(`Delete video item ${id}`);
                navigate("/");
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            toast("You can only delete your own video!");
        }
    };

    useEffect(() => {
        const fetchCommment = async () => {
            const resComments = await publicReq.get(`comment/${id}`);
            if (commentSortVal === "desc") {
                const mainComments = [...resComments.data];
                const sortComment = mainComments.sort((a, b) =>
                    b.createdAt.localeCompare(a.createdAt)
                );
                dispatch(fetchCommentsSuccess(sortComment));
            } else {
                const mainComments = [...resComments.data];
                const sortComment = mainComments.sort((a, b) =>
                    a.createdAt.localeCompare(b.createdAt)
                );
                dispatch(fetchCommentsSuccess(sortComment));
            }
        };

        fetchCommment();
    }, [dispatch, commentSortVal, id]);

    const handleLike = async () => {
        await publicReq.put(`video/like/${video?._id}`);
        dispatch(likeVideo(video?._id));
    };

    const handleDislike = async () => {
        await publicReq.put(`video/dislike/${video?._id}`);
        dispatch(dislikeVideo(video?._id));
    };

    const handleSubscribe = async () => {
        try {
            if (currentUser?.subscribedUsers?.includes(user?._id)) {
                const unsubRes = await publicReq.put(
                    `users/unsub/${user?._id}`
                );
                dispatch(subscription(user?._id));
            } else {
                const subRes = await publicReq.put(`users/sub/${user?._id}`);
                dispatch(subscription(user?._id));
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className={`pt-[80px] xl:px-[50px] 2xl:px-[90px] pb-10`}>
            {loading ? (
                <h2 className="text-4xl font-semibold">"Loading..."</h2>
            ) : (
                <div className="flex items-start gap-[25px]">
                    <div className="flex-1">
                        {!loading && video && (
                            <div className="w-full">
                                <video
                                    src={video?.video?.url}
                                    className={`h-auto w-full`}
                                    width="100%"
                                    height="720"
                                    controls
                                ></video>
                            </div>
                        )}

                        <div className="">
                            <div className="pt-[30px] pb-[15px]">
                                <h1 className="md:text-lg">{video?.title}</h1>

                                <div className="flex items-center justify-between">
                                    <p className="text-[#606060] text-[14px] leading-[20px] font-normal">
                                        {video?.views > 0 &&
                                            `${video?.views} views • `}
                                        {format(video?.createdAt)}
                                    </p>

                                    <div className="flex items-center gap-[15px]">
                                        <div
                                            onClick={handleLike}
                                            className="flex items-center cursor-pointer"
                                        >
                                            <IconButton>
                                                <AiOutlineLike className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                            </IconButton>

                                            <p className="text-sm font-medium uppercase">
                                                {video?.likes?.length}
                                            </p>
                                        </div>

                                        <div
                                            onClick={handleDislike}
                                            className="flex items-center cursor-pointer"
                                        >
                                            <IconButton className=" !-scale-x-100">
                                                <AiOutlineDislike className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                            </IconButton>

                                            <p className="text-sm font-medium uppercase">
                                                Dislike
                                            </p>
                                        </div>

                                        <div className="flex items-center cursor-pointer">
                                            <IconButton className=" !-scale-x-100">
                                                <RiShareForwardLine className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                            </IconButton>

                                            <p className="text-sm font-medium uppercase">
                                                Share
                                            </p>
                                        </div>

                                        <div className="flex items-center cursor-pointer">
                                            <IconButton className=" !-scale-x-100">
                                                <RiDownloadLine className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                            </IconButton>

                                            <p className="text-sm font-medium uppercase">
                                                Download
                                            </p>
                                        </div>

                                        <div className="flex items-center cursor-pointer">
                                            <IconButton className=" !-scale-x-100">
                                                <HiOutlineScissors className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                            </IconButton>

                                            <p className="text-sm font-medium uppercase">
                                                Clip
                                            </p>
                                        </div>

                                        <div className="flex items-center cursor-pointer">
                                            <IconButton className=" !-scale-x-100">
                                                <BiListPlus className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                            </IconButton>

                                            <p className="text-sm font-medium uppercase">
                                                Save
                                            </p>
                                        </div>

                                        {currentUser?._id === user?._id && (
                                            <div className="flex items-center cursor-pointer">
                                                <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={
                                                        open
                                                            ? "account-menu"
                                                            : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    aria-expanded={
                                                        open
                                                            ? "true"
                                                            : undefined
                                                    }
                                                    className="!-scale-x-100"
                                                >
                                                    <RxDotsHorizontal className="!w-[23px] !h-[23px] transition-transform duration-200 !text-[#030303]" />
                                                </IconButton>

                                                <Menu
                                                    anchorEl={anchorEl}
                                                    id="account-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}
                                                    PaperProps={{
                                                        elevation: 0,
                                                        sx: {
                                                            overflow: "visible",
                                                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                            mt: 1.5,
                                                            "& .MuiAvatar-root":
                                                                {
                                                                    width: 32,
                                                                    height: 32,
                                                                    ml: -0.5,
                                                                    mr: 1,
                                                                },
                                                            "&:before": {
                                                                content: '""',
                                                                display:
                                                                    "block",
                                                                position:
                                                                    "absolute",
                                                                top: 0,
                                                                right: 14,
                                                                width: 10,
                                                                height: 10,
                                                                bgcolor:
                                                                    "background.paper",
                                                                transform:
                                                                    "translateY(-50%) rotate(45deg)",
                                                                zIndex: 0,
                                                            },
                                                        },
                                                    }}
                                                    transformOrigin={{
                                                        horizontal: "right",
                                                        vertical: "top",
                                                    }}
                                                    anchorOrigin={{
                                                        horizontal: "right",
                                                        vertical: "bottom",
                                                    }}
                                                >
                                                    <MenuItem
                                                        onClick={
                                                            handleDeleteVideo
                                                        }
                                                    >
                                                        <ListItemIcon className="!mr-0">
                                                            <MdOutlineDeleteOutline className="!w-[24px] !h-[24px] " />
                                                        </ListItemIcon>
                                                        Delete
                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="border-y border-[black]/10 py-[16px] my-[8px]">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-[16px]">
                                            <Avatar
                                                className="!w-[48px] !h-[48px] cursor-pointer"
                                                alt="Remy Sharp"
                                                src={
                                                    user?.image?.url ||
                                                    user?.googleImage
                                                }
                                            >
                                                {user?.username}
                                            </Avatar>

                                            <div className="">
                                                <h5 className="text-[#606060] text-[14px] leading-[20px] font-semibold mt-1 uppercase">
                                                    {user?.username}
                                                </h5>

                                                <p className="text-[#606060] text-[12px] leading-[18px] font-normal">
                                                    {user?.subscribers}{" "}
                                                    subscribers
                                                </p>
                                            </div>
                                        </div>

                                        {user?._id !== currentUser?._id && (
                                            <button
                                                onClick={handleSubscribe}
                                                className={` pt-1 w-[120px] h-[37px] text-sm font-medium uppercase tracking-wider flex items-center justify-center ${
                                                    currentUser?.subscribedUsers?.includes(
                                                        user?._id
                                                    )
                                                        ? "bg-[#f2f2f2] text-[#606060]"
                                                        : "bg-[#c00] text-[#fff]"
                                                }`}
                                            >
                                                Subscribe
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-w-[630px] ml-[64px]">
                                        <p className="text-sm">{video.desc}</p>

                                        <button className="mt-[8px] text-xs text-[#606060] uppercase font-medium tracking-wider pt-[3px]">
                                            Show more
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-[200px]">
                                    <div className="flex items-center gap-[30px] py-[10px] mb-[15px]">
                                        <h5>{`${
                                            comments.length > 0
                                                ? comments.length
                                                : "No"
                                        } Comments`}</h5>
                                        <CustomizedMenus />
                                    </div>

                                    <CommentField />

                                    <div className="mt-[25px] flex flex-col gap-[20px]">
                                        {comments?.length > 0 &&
                                            comments
                                                .map((item, i) => (
                                                    <Comment
                                                        key={i}
                                                        {...item}
                                                    />
                                                ))
                                                .sort(
                                                    (a, b) =>
                                                        b?.createdAt -
                                                        a?.createdAt
                                                )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[405px]">
                        <Recommendation tagsData={video?.tags} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
