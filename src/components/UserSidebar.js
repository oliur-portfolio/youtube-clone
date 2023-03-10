import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import { publicReq } from "../apiRequest";

const UserSidebar = () => {
    const [allUser, setAllUser] = useState([]);
    const [moreNum, setMoreNum] = useState(null);
    const [more, setMore] = useState(false);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const usersRes = await publicReq.get(`users/find`);
                setMoreNum(usersRes.data?.length);
                setAllUser(
                    usersRes.data.splice(0, more ? usersRes.data?.length : 5)
                );
            } catch (error) {
                toast(error.message);
            }
        };

        fetchUsersData();
    }, [more]);

    const showMore = () => {
        setMore((prev) => !prev);
    };

    return (
        <>
            <div className="">
                <h3 className="px-5 mb-2 mt-[15px] text-[14px] leading-[20px] font-medium text-[#606060] uppercase">
                    SUBSCRIPTIONS
                </h3>

                {allUser.length > 0 &&
                    allUser.map((item) => (
                        <button
                            key={item._id}
                            className="flex items-center gap-6 px-5 py-2 hover:bg-[#f2f2f2] focus:bg-[#e5e5e5] w-full"
                        >
                            <img
                                className="w-[24px] h-[24px] rounded-full"
                                src={item.image?.url || item.googleImage}
                                alt="channel image"
                            />

                            <p
                                className={`text-[14px] leading-5 text-[#030303] capitalize`}
                            >
                                {item.username}
                            </p>
                        </button>
                    ))}

                {allUser.length > 5 && (
                    <button
                        onClick={showMore}
                        className="flex items-center gap-6 px-5 py-2 hover:bg-[#f2f2f2] focus:bg-[#e5e5e5] w-full"
                    >
                        <IoIosArrowDown
                            className={`!w-[24px] !h-[24px] transition-transform duration-200 ${
                                more && "-rotate-180"
                            }`}
                        />

                        <p
                            className={`text-[14px] leading-5 text-[#030303] capitalize ${
                                more && "font-bold"
                            }`}
                        >
                            {`Show ${moreNum - 5} More`}
                        </p>
                    </button>
                )}
            </div>

            <hr className="my-3 border-[#000]/10" />
        </>
    );
};

export default UserSidebar;
