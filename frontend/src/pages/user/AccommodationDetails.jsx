import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccommodationContext } from "../../context/AccommodationContext";
import Breadcrumbs from "../../containers/user/accommodationDetails/Breadcrumbs";
import HeaderInfo from "../../containers/user/accommodationDetails/HeaderInfo";
import PhotoGrid from "../../containers/user/accommodationDetails/PhotoGrid";
import PropertyInfo from "../../containers/user/accommodationDetails/PropertyInfo";
import AmenitiesList from "../../containers/user/accommodationDetails/AmenitiesList";
import LocationMap from "../../containers/user/accommodationDetails/LocationMap";
import ReviewsSection from "../../containers/user/accommodationDetails/ReviewsSection";
import HostInfo from "../../containers/user/accommodationDetails/HostInfo";
import BookingCard from "../../containers/user/accommodationDetails/BookingCard";
import Loading from "../../components/user/Loading";

const AccommodationDetails = () => {
    const { id } = useParams();
    const { getAccommodationById } = useContext(AccommodationContext);

    const [accommodationData, setAccommodationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // Fetch accommodation using URL ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAccommodationById(id);

                if (!data) {
                    setNotFound(true);
                    return;
                }

                setAccommodationData(data);
                console.log(data)
            } catch (err) {
                console.error(err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, getAccommodationById]);


    console.log(accommodationData);
    const generateBreadcrumbs = (data) => {
        return [
            {
                label: "Home",
                link: "/"
            },
            {
                label: "Accommodations",
                link: "/accommodations"
            },
            {
                label: data?.name || "Details",
                link: `/accommodations/${data?._id || data?.id}`
            }
        ];
    };

    const breadcrumbs = generateBreadcrumbs(accommodationData);

    // Loading State
    if (loading) {
        return (
            <Loading
                mainText="Loading accommodation details..."
                subText="Please wait"
            />
        );
    }

    // Not found fallback
    if (notFound || !accommodationData) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Accommodation Not Found
                </h2>
                <p className="text-gray-500 mt-2">
                    The listing you are looking for does not exist.
                </p>
            </div>
        );
    }

    const averageRating =
        accommodationData.reviews?.length > 0
            ? (
                accommodationData.reviews.reduce(
                    (acc, r) => acc + Number(r.rating || 0),
                    0
                ) / accommodationData.reviews.length
            ).toFixed(2)
            : 0;

    return (
        <div className="bg-background-light">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto">

                {breadcrumbs && (
                    <Breadcrumbs items={breadcrumbs} />
                )}

                <HeaderInfo
                    name={accommodationData.name}
                    address={accommodationData.address}
                    time_from_uni={accommodationData.time_from_uni}
                    rating={averageRating}
                    reviews={accommodationData.reviews}
                />

                <PhotoGrid images={accommodationData.images || []} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    {/* LEFT SIDE CONTENT */}
                    <div className="lg:col-span-2 space-y-10">

                        <PropertyInfo
                            accommodation_type={accommodationData.accommodation_type}
                            no_of_rooms={accommodationData.no_of_rooms}
                            no_of_beds={accommodationData.no_of_beds}
                            no_of_bathrooms={accommodationData.no_of_bathrooms}
                            verified={accommodationData.verified}
                            highly_rated={accommodationData.highly_rated}
                            description={accommodationData.description}
                        />

                        <AmenitiesList amenities={accommodationData.amenities || []} />

                        <LocationMap
                            address={accommodationData.address}
                            location={accommodationData.location}
                            time_from_uni={accommodationData.time_from_uni}
                        />

                        <ReviewsSection reviews={accommodationData.reviews || []} />

                        <HostInfo
                            owner={accommodationData.owner}
                        />

                    </div>

                    {/* RIGHT SIDE BOOKING CARD */}
                    <BookingCard
                        month_rent={accommodationData.month_rent}
                        rating={averageRating}
                        paymentDetails={accommodationData.paymentDetails}
                        owner={accommodationData.owner}
                        available_users={accommodationData.available_users}
                        total_users={accommodationData.total_users}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetails;