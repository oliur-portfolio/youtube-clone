import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { publicReq } from "../apiRequest";
import {
    loginError,
    loginStart,
    loginSuccess,
    userDataState,
} from "../redux/userSlice";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Signin = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const user = useSelector(userDataState);

    const handleLoginData = (e) => {
        setLoginData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (loginData.email && loginData.password) {
            dispatch(loginStart());
            try {
                const res = await publicReq.post("auth/signin", loginData, {
                    withCredentials: true,
                    crossDomain: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin":
                            "https://oliur-youtube-clone.onrender.com",
                    },
                });
                dispatch(loginSuccess(res.data));

                setLoginData({
                    email: "",
                    password: "",
                });
            } catch (err) {
                dispatch(loginError(err));
                toast.error(err.message);
            }
        } else {
            toast.error("Please fill all data");
        }
    };

    const signWithGoogle = async (e) => {
        try {
            dispatch(loginStart());

            const userResult = await signInWithPopup(auth, provider);
            const userData = await publicReq.post(
                "auth/google",
                {
                    username: userResult.user?.displayName,
                    email: userResult.user?.email,
                    googleImage: userResult.user?.photoURL,
                },
                { withCredentials: true }
            );

            dispatch(loginSuccess(userData.data));
            navigate("/");
        } catch (err) {
            dispatch(loginError(err));
            toast.error(err.message);
        }
    };

    return (
        <div className="w-[400px]">
            <div className="bg-white border border-black/10 py-[30px] px-[40px] text-center">
                <h1 className="text-2xl font-semibold mb-1">Sign in</h1>
                <p className="text-lg">To continue to YouTube</p>

                {user && <Navigate to="/" replace={true} />}

                <form onSubmit={handleLogin}>
                    <div className="mt-5 flex flex-col gap-5">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleLoginData}
                            value={loginData.email}
                            placeholder="Email"
                            className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                        />

                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleLoginData}
                            value={loginData.password}
                            placeholder="Password"
                            className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                        />

                        <Button
                            type="submit"
                            className="!flex !items-center !justify-center !gap-[6px] !w-[150px] !h-[40px] hover:!border-black !text-[#fff] !text-[16px] !leading-[1] !font-medium !p-0 !bg-[#000] hover:!bg-[#fff] hover:!text-[#000] !border-transparent !mx-auto !uppercase !border-2 !rounded-none"
                            variant="outlined"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>

                <p className="text-2xl font-semibold my-5 text-center ">Or</p>

                <Button
                    onClick={signWithGoogle}
                    className="!flex !items-center !justify-center !gap-[6px] !h-[40px]  !text-[#000] !text-[16px] !leading-[1] !font-medium !p-0 !bg-[#f6f6f6]  hover:!text-[#000] !border-transparent !mx-auto !normal-case !rounded-none !w-full"
                    variant="outlined"
                >
                    <span>
                        <FcGoogle />
                    </span>
                    Sign in with Google
                </Button>

                <p className="text-base font-normal mt-5 text-[#000]">
                    Do you want to join, please{" "}
                    <Link className="text-[#065fd4] underline" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;
