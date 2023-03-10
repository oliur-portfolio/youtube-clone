import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { publicReq } from "../apiRequest";
import {
    fetchVideosError,
    fetchVideosStart,
    fetchVideosSuccess,
} from "../redux/videosSlice";

export const Search = () => {
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useDispatch();

    const handleSearch = async () => {
        dispatch(fetchVideosStart());
        try {
            const searchRes = await publicReq.get(
                `video/search?q=${searchVal}`
            );

            dispatch(fetchVideosSuccess(searchRes.data));
        } catch (error) {
            toast.error(error.message);
            dispatch(fetchVideosError(error.message));
        }
        setSearchVal("");
    };

    return (
        <div className="flex items-center justify-start gap-[10px] fixed top-[10px] left-1/2 -translate-x-1/2 z-50">
            {/* Search */}
            <div className="flex items-center h-[40px]">
                <div className="flex items-center h-full border border-[#ccc] rounded-full rounded-r-none pl-5 focus-within:border-[#1c62b9]">
                    <span className="pr-4">
                        <TfiSearch className="w-[17px] h-[17px] text-[#030303]" />
                    </span>

                    <input
                        type="text"
                        placeholder="Search"
                        className=" w-[518px] h-full border-none focus:outline-none placeholder:text-[#898989]"
                        onChange={(e) => setSearchVal(e.target.value)}
                        value={searchVal}
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className="bg-[#f8f8f8] hover:bg-[#f0f0f0] h-full w-[64px] flex items-center justify-center rounded-r-full border border-l-0 border-[#d3d3d3] hover:border-[#c6c6c6] hover:shadow"
                >
                    <TfiSearch className="w-[19px] h-[19px] text-[#030303]" />
                </button>
            </div>
            {/* Search */}

            <IconButton className="!bg-[#f9f9f9]">
                <img
                    src="/images/microphone.png"
                    alt=""
                    className="!w-[24px] !h-[24px] !text-[#000]"
                />
            </IconButton>
        </div>
    );
};
