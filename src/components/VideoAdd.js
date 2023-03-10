import { Button, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { publicReq } from "../apiRequest";
import { showVideo, videoModalState } from "../redux/commonSlice";

export const VideoAdd = () => {
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const [videofile, setVideofile] = useState("");
    const [videofileName, setVideofileName] = useState("");
    const [videoFileData, setVideoFileData] = useState("");
    const [videoLoading, setVideoLoading] = useState(false);

    const [imagefile, setImagefile] = useState("");
    const [imagefileName, setImagefileName] = useState("");
    const [imageFileData, setImageFileData] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const [tags, setTags] = useState([]);

    const [videoData, setVideoData] = useState({
        title: "",
        desc: "",
    });

    const videoModal = useSelector(videoModalState);

    const dispatch = useDispatch();

    const handleVideotags = (e) => {
        const tagsValue = e.target.value;
        const tagsOriginalArray = tagsValue.split(",");
        const tagsData = tagsOriginalArray.map((item) => {
            return item.trim();
        });
        setTags(tagsData);
    };

    const handleVideoData = (e) => {
        setVideoData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleVideo = async (e) => {
        setVideofileName(e.target.files[0].name);

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setVideofile(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleThumbnail = async (e) => {
        setImagefileName(e.target.files[0].name);

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagefile(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (videofile) {
            setVideoLoading(true);

            const addVideoUpload = async () => {
                const uploadVideoRes = await axios.post(
                    "http://localhost:8800/api/upload",
                    {
                        video: videofile,
                    }
                );

                setVideoFileData(uploadVideoRes.data);
                setVideoLoading(false);
            };

            addVideoUpload();
        }

        if (imagefile) {
            setImageLoading(true);

            const addImageUpload = async () => {
                const uploadImageRes = await axios.post(
                    "http://localhost:8800/api/upload",
                    {
                        image: imagefile,
                    }
                );

                setImageFileData(uploadImageRes.data);
                setImageLoading(false);
            };

            addImageUpload();
        }
    }, [videofile, imagefile]);

    const handleVideoUpload = async () => {
        if (
            imageFileData &&
            videoFileData &&
            tags.length != 0 &&
            videoData.title &&
            videoData.desc
        ) {
            await publicReq.post("video", {
                ...videoData,
                tags,
                image: imageFileData,
                video: videoFileData,
            });

            dispatch(showVideo());
            toast("Upload video successfully!");
            window.location.reload();
        } else {
            toast("Please add all fields!");
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 z-[999] w-full h-screen bg-black/50 justify-center items-center transition-all duration-500 delay-300 hidden ${
                videoModal && "!flex"
            }`}
        >
            <div className={`w-[30%] bg-[#fff] p-[40px] relative`}>
                <div className="absolute top-5 right-5">
                    <IconButton onClick={(e) => dispatch(showVideo())}>
                        <GrClose className="!w-[24px] !h-[24px] !text-[#000]" />
                    </IconButton>
                </div>

                <h1 className="text-4xl font-semibold mb-1 text-center">
                    Upload a new video
                </h1>

                <div className="mt-10 flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => videoRef.current.click()}
                            className={`!flex !items-center !justify-center !gap-[6px] !w-[170px] !h-[40px] hover:!border-black !text-[#fff] !text-[16px] !leading-[1] !font-medium !p-0 !bg-[#ff0000] hover:!bg-[#000] hover:!text-[#fff] !border-transparent !border-2 !rounded-none !normal-case ${
                                videoLoading &&
                                "!opacity-50 !cursor-not-allowed"
                            }`}
                            variant="outlined"
                        >
                            <span>
                                <BsCameraFill />
                                <input
                                    ref={videoRef}
                                    hidden
                                    type="file"
                                    name="video"
                                    id="video"
                                    onChange={handleVideo}
                                />
                            </span>
                            {videoLoading ? "Uploading..." : "Upload video"}
                        </Button>

                        {videofileName && <p>{videofileName}</p>}
                    </div>

                    <input
                        type="text"
                        name="title"
                        id="Title"
                        placeholder="Title"
                        onChange={handleVideoData}
                        className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                    />

                    <textarea
                        name="desc"
                        id="Description"
                        placeholder="Description"
                        onChange={handleVideoData}
                        className="w-full h-[150px] border border-[#d3d3d3] py-2 px-5 text-base"
                    ></textarea>

                    <input
                        type="text"
                        name="tags"
                        id="tags"
                        placeholder="Separate the tags with commas."
                        onChange={handleVideotags}
                        className="w-full h-[40px] border border-[#d3d3d3] py-1 px-5 text-base"
                    />

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => imageRef.current.click()}
                            className={`!flex !items-center !justify-center !gap-[6px] !w-[170px] !h-[40px] hover:!border-black !text-[#fff] !text-[16px] !leading-[1] !font-medium !p-0 !bg-[#ff0000] hover:!bg-[#000] hover:!text-[#fff] !border-transparent !border-2 !rounded-none !normal-case ${
                                imageLoading &&
                                "!cursor-not-allowed !opacity-50"
                            }`}
                            variant="outlined"
                        >
                            <span>
                                <BsCameraFill />
                                <input
                                    ref={imageRef}
                                    hidden
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={handleThumbnail}
                                />
                            </span>
                            {imageLoading ? "Uploading..." : "Image Upload"}
                        </Button>

                        {imagefileName && <p>{imagefileName}</p>}
                    </div>

                    <Button
                        onClick={handleVideoUpload}
                        className="!flex !items-center !justify-center !gap-[6px] !w-full !h-[40px] hover:!border-black !text-[#fff] !text-[16px] !leading-[1] !font-medium !p-0 !bg-[#000] hover:!bg-[#fff] hover:!text-[#000] !border-transparent !mx-auto !uppercase !border-2 !rounded-none"
                        variant="outlined"
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
};
