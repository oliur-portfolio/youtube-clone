import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({
    title,
    moreBtn,
    Icon,
    IconActive,
    active,
    setActive,
    channelImage,
    more,
    setMore,
    path,
}) => {
    const handleClick = () => {
        setActive(title);
    };

    const handleMore = () => {
        console.log("Handle More!");
        setActive(title);
        setMore((prev) => {
            return !prev;
        });
    };

    return (
        <Link to={path ? path : "/"}>
            <button
                onClick={moreBtn ? handleMore : handleClick}
                className="flex items-center gap-6 px-5 py-2 hover:bg-[#f2f2f2] focus:bg-[#e5e5e5] w-full"
            >
                {Icon &&
                    IconActive &&
                    (active === title ? (
                        <IconActive
                            className={`!w-[24px] !h-[24px] transition-transform duration-200 ${
                                more && "-rotate-180"
                            }`}
                        />
                    ) : (
                        <Icon
                            className={`!w-[24px] !h-[24px] transition-transform duration-200 ${
                                more && "-rotate-180"
                            }`}
                        />
                    ))}

                {channelImage && (
                    <img
                        className="w-[24px] h-[24px] rounded-full"
                        src={channelImage}
                        alt="channel image"
                    />
                )}

                <p
                    className={`text-[14px] leading-5 text-[#030303] capitalize ${
                        active === title && more ? "font-bold" : ""
                    }`}
                >
                    {title}
                </p>
            </button>
        </Link>
    );
};

export default MenuItem;
