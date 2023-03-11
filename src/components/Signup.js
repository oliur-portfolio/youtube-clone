import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicReq } from "../apiRequest";
import { userDataState } from "../redux/userSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { MdPhotoCamera } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [file, setFile] = useState("");
    const [avatarData, setAvatarData] = useState(null);
    const [uploadloading, setUploadLoading] = useState(false);
    const user = useSelector(userDataState);
    const navigate = useNavigate();

    const handleRegisterData = (e) => {
        setRegisterData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleAvatarChange = async (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setFile(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            setUploadLoading(true);

            const addUpload = async () => {
                const uploadRes = await publicReq.post("upload", {
                    image: file,
                });

                setAvatarData(uploadRes.data);
                setUploadLoading(false);
            };

            addUpload();
        }
    }, [file]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (
            registerData.username &&
            registerData.email &&
            registerData.password &&
            avatarData
        ) {
            try {
                await publicReq.post("auth/register", {
                    ...registerData,
                    image: avatarData,
                });

                setFile("");
                setRegisterData({
                    username: "",
                    email: "",
                    password: "",
                });
                navigate("/login");
                toast("Added user successfully!");
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            toast.error("Please fill all data");
        }
    };

    return (
        <div className="w-[400px]">
            <div className="bg-white border border-black/10 py-[30px] px-[40px] text-center">
                <h1 className="text-2xl font-semibold mb-1">Register</h1>
                <p className="text-lg">To continue to YouTube</p>

                {user && <Navigate to="/" replace={true} />}

                <div className="my-5">
                    <div
                        className={`relative w-[80px] h-[80px] mx-auto ${
                            uploadloading && "animate-pulse opacity-80"
                        }`}
                    >
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={file ? file : "/images/user.png"}
                            alt=""
                        />

                        <div className="!absolute !-bottom-2 !-right-2 !z-50">
                            <Tooltip title="Upload">
                                <IconButton
                                    className="!bg-[#c6c3bd]"
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleAvatarChange}
                                    />
                                    <MdPhotoCamera className="!text-[#fff] !w-5 !h-5" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            onChange={handleRegisterData}
                            value={registerData.username}
                            className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                        />

                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={handleRegisterData}
                            value={registerData.email}
                            className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                        />

                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleRegisterData}
                            value={registerData.password}
                            className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                        />

                        <Button
                            type="submit"
                            className="!flex !items-center !justify-center !gap-[6px] !w-[150px] !h-[40px] hover:!border-black !text-[#fff] !text-[16px] !leading-[1] !font-medium !p-0 !bg-[#000] hover:!bg-[#fff] hover:!text-[#000] !border-transparent !mx-auto !uppercase !border-2 !rounded-none"
                            variant="outlined"
                        >
                            Register
                        </Button>
                    </div>
                </form>

                <p className="text-base font-normal mt-5 text-[#000]">
                    Already user, Please{" "}
                    <Link className="text-[#065fd4] underline" to="/login">
                        sign
                    </Link>{" "}
                    in here.
                </p>
            </div>
        </div>
    );
};

export default Signup;
