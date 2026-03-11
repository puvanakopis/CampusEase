import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../containers/user/owner/ProfileHeader";
import OwnerSidebar from "../../containers/user/owner/OwnerSidebar";
import TabsSection from "../../containers/user/owner/TabsSection";
import ReviewsSection from "../../containers/user/owner/ReviewsSection";
import { OwnerContext } from "../../context/OwnerContext";

const Owner = () => {
    const { id } = useParams();
    const { getOwnerById } = useContext(OwnerContext);
    const [ownerData, setOwnerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getOwnerById(id)
                .then((data) => setOwnerData(data))
                .finally(() => setLoading(false));
        }
    }, [id, getOwnerById]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!ownerData) return <div className="p-10 text-center">Owner not found</div>;

    const vehicleReviews = ownerData.vehicles?.flatMap((v) => v.reviews || []) || [];
    const accommodationReviews = ownerData.accommodations?.flatMap((a) => a.reviews || []) || [];

    return (
        <div className="bg-[#f6f7f8]">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6">
                <ProfileHeader owner={ownerData} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
                    <div className="lg:col-span-3 space-y-8">
                        <OwnerSidebar owner={ownerData} />
                    </div>
                    <div className="lg:col-span-9 space-y-10">
                        <TabsSection owner={ownerData} />
                        {vehicleReviews.length > 0 && (
                            <ReviewsSection title="Vehicle Reviews" reviews={vehicleReviews} />
                        )}
                        {accommodationReviews.length > 0 && (
                            <ReviewsSection title="Accommodation Reviews" reviews={accommodationReviews} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Owner;