import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { publicReq } from "../apiRequest";
import SideVideo from "./SideVideo";
import SideVideoSkelton from "./SideVideoSkelton";

const Recommendation = ({ tagsData }) => {
    const { id } = useParams();

    const [recommendationVideo, setRecommendationVideo] = useState([]);
    const [recommendLoading, setRecommendLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setRecommendLoading(true);
            try {
                const resVideo = await publicReq.get(
                    `video/tags?tags=${tagsData}`
                );
                setRecommendationVideo(resVideo.data);
                setRecommendLoading(false);
            } catch (err) {
                toast.error(err.message);
                setRecommendLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-[12px] mt-[10px]">
            {recommendLoading
                ? Array(20).fill(<SideVideoSkelton />)
                : recommendationVideo
                      .filter((val) => val._id != id)
                      .map((item) => <SideVideo key={item?._id} {...item} />)}
        </div>
    );
};

export default Recommendation;
