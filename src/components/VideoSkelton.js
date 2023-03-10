import { Skeleton } from "@mui/material";

const VideoSkelton = () => {
    return (
        <div>
            <Skeleton
                animation="wave"
                className="w-full !h-[200px]"
                variant="rectangular"
            />

            <div className="flex items-start gap-[14px] pt-[10px]">
                <Skeleton
                    animation="wave"
                    className="!w-[36px] !h-[36px] cursor-pointer"
                    variant="circular"
                />

                <div className="flex-1">
                    <div className="flex items-start justify-between gap-0.5">
                        <div className="!w-full">
                            <Skeleton
                                className="!w-full !h-[40px]"
                                animation="wave"
                            />

                            <Skeleton
                                className="!w-[30%] !h-[25px]"
                                animation="wave"
                            />

                            <Skeleton
                                className="!w-[60%] !h-[25px]"
                                animation="wave"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSkelton;
