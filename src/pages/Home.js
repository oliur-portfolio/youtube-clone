import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Videos from "../components/Videos";
import { showSidebar, sidebarState } from "../redux/commonSlice";

const Home = () => {
    const sidebar = useSelector(sidebarState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showSidebar());
    }, []);

    return (
        <div
            className={`pt-[136px] pb-[100px] ${
                sidebar ? "px-[90px] ml-[240px]" : "pl-[95px] pr-[25px]"
            }`}
        >
            <Videos />
        </div>
    );
};

export default Home;
