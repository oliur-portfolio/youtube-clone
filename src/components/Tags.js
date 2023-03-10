import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTagsValue, sidebarState } from "../redux/commonSlice";

const Tags = ({ noborder }) => {
    const [activeTag, setActiveTag] = useState(null);
    const dispatch = useDispatch();

    const tags = [
        { id: 1, title: "All" },
        { id: 2, title: "react" },
        { id: 3, title: "nextjs" },
        { id: 4, title: "firebase" },
        { id: 5, title: "dashbord" },
        { id: 6, title: "redux" },
        { id: 7, title: "typescript" },
        { id: 8, title: "node" },
        { id: 9, title: "Motivation" },
        { id: 10, title: "News" },
        { id: 11, title: "Allamah" },
        { id: 12, title: "Action" },
        { id: 13, title: "Thriller" },
        { id: 14, title: "Romantic" },
        { id: 15, title: "Computer Programming" },
        { id: 16, title: "Recently Uploaded" },
        { id: 17, title: "Bollywood Music" },
        { id: 18, title: "New to you" },
        { id: 19, title: "Motivation" },
        { id: 20, title: "News" },
    ];

    const sidebar = useSelector(sidebarState);

    return (
        <div
            className={`px-[25px] border-y border-black/10 py-[10px] ${
                sidebar ? "ml-[240px]" : "ml-0"
            } ${noborder && "!border-y-0 py-[8px] pl-0"}`}
        >
            <div className="">
                <div className="flex items-center gap-3 pr-10 overflow-y-hidden overflow-x-auto scrollbar-hide">
                    {tags.map((item, i) => (
                        <button
                            onClick={() => {
                                setActiveTag(item.id);
                                dispatch(
                                    setTagsValue(item.title.toLowerCase())
                                );
                            }}
                            key={i}
                            className={`${
                                item.id === activeTag
                                    ? "text-[#fff] bg-black border-transparent hover:!bg-black"
                                    : "text-[#030303] bg-black/5"
                            } min-w-max px-[12px] text-[14px] leading-[20px] transition-all duration-200 rounded-full h-[32px] border border-black/10 hover:bg-black/10 capitalize`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tags;
