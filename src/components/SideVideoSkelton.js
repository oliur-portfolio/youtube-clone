import { Skeleton } from "@mui/material";

const SideVideoSkelton = () => {
    return (
        <div className="flex items-start gap-2">
            <div className="min-w-[170px] h-[95px]">
                <Skeleton
                    animation="wave"
                    className="!w-full !h-full"
                    variant="rectangular"
                />
            </div>

            <div className="w-full">
                <Skeleton className="!w-full !h-[35px]" animation="wave" />

                <Skeleton className="!w-[30%] !h-[25px]" animation="wave" />

                <Skeleton className="!w-[60%] !h-[25px]" animation="wave" />
            </div>
        </div>
    );
};

export default SideVideoSkelton;
