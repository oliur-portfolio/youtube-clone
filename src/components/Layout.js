import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import { Search } from "./Search";
import { Sidebar } from "./Sidebar";
import Tags from "./Tags";
import { VideoAdd } from "./VideoAdd";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { sidebarState } from "../redux/commonSlice";

const Layout = ({ showTag }) => {
    const sidebar = useSelector(sidebarState);

    return (
        <div>
            <div className="flex relative">
                <div
                    className={`fixed top-0 w-[240px] min-h-screen z-50 bg-white border-b-4 border-black transition-all duration-150 ${
                        sidebar ? "left-0" : "-left-[250px]"
                    }`}
                >
                    <Sidebar />
                </div>

                <Search />
                <VideoAdd />
                <ToastContainer position="top-center" />

                <div className="flex-1">
                    <div className="fixed top-0 left-0 w-full bg-white z-20">
                        <Header />
                        {showTag && <Tags />}
                    </div>
                    <main className="bg-[#f9f9f9] min-h-screen">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
