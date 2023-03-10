import { Avatar, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { publicReq } from "../apiRequest";
import { userDataState } from "../redux/userSlice";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const CommentField = () => {
    const [commentText, setCommentText] = useState("");
    const [commentFocus, setCommentFocus] = useState(false);
    const [emojiMart, setEmojiMart] = useState(false);
    const { id } = useParams();
    const currentUser = useSelector(userDataState);

    const handleComment = async () => {
        try {
            await publicReq.post("comment", {
                videoId: id,
                desc: commentText.trim(),
            });

            setCommentText("");
            setCommentFocus(false);
            setEmojiMart(false);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const emojiSelect = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setCommentText(commentText + emoji);
    };

    return (
        <div className="flex items-start gap-[15px]">
            <Avatar
                className="!w-[40px] !h-[40px] cursor-pointer !mt-[6px]"
                alt="Remy Sharp"
                src={currentUser?.image?.url || currentUser?.googleImage}
            >
                {currentUser?.username}
            </Avatar>

            <div className="flex-1">
                <input
                    className="w-full bg-transparent border-b border-black outline-none placeholder:text-[#606060] text-sm pb-1"
                    type="text"
                    placeholder="Add a comment"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    onClick={() => setCommentFocus(true)}
                />

                {commentFocus && (
                    <div className="flex items-center justify-between py-2">
                        <div className="relative">
                            {emojiMart && (
                                <div className="absolute top-9 left-0 z-50">
                                    <Picker
                                        data={data}
                                        onEmojiSelect={emojiSelect}
                                    />
                                </div>
                            )}

                            <IconButton
                                onClick={() => setEmojiMart((prev) => !prev)}
                            >
                                <BsEmojiSmile className="!w-[20px] !h-[20px] !text-[#000]" />
                            </IconButton>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => {
                                    setCommentFocus(false);
                                    setCommentText("");
                                    setEmojiMart(false);
                                }}
                                variant="contained"
                                className="!bg-transparent !text-[#606060] !text-sm !uppercase !rounded-none !w-[90px] !h-[37px] !pt-2 !tracking-wider !shadow-none"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleComment}
                                disabled={!commentText.trim()}
                                variant="contained"
                                className="!bg-[#065fd4] !text-[#fff] !text-sm !uppercase !rounded-none !w-[104px] !h-[37px] !pt-2 !tracking-wider disabled:!bg-[#065fd4]/50 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
                            >
                                Comment
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
