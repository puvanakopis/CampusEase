import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { VehicleContext } from "../../context/VehicleContext";
import Breadcrumbs from "../../containers/user/vehicleDetails/Breadcrumbs";
import HeaderInfo from "../../containers/user/vehicleDetails/HeaderInfo";
import PhotoGrid from "../../containers/user/vehicleDetails/PhotoGrid";
import PropertyInfo from "../../containers/user/vehicleDetails/PropertyInfo";
import AmenitiesList from "../../containers/user/vehicleDetails/AmenitiesList";
import LocationMap from "../../containers/user/vehicleDetails/LocationMap";
import ReviewsSection from "../../containers/user/vehicleDetails/ReviewsSection";
import HostInfo from "../../containers/user/vehicleDetails/HostInfo";
import BookingCard from "../../containers/user/vehicleDetails/BookingCard";
import Loading from "../../components/user/Loading";

const VehicleDetails = () => {
    const { id } = useParams();
    const { getVehicleById } = useContext(VehicleContext);

    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getVehicleById(id);

                if (!data) {
                    setNotFound(true);
                    return;
                }

                setVehicleData(data);
            } catch (err) {
                console.error(err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, getVehicleById]);

    const generateBreadcrumbs = (data) => {
        return [
            {
                label: "Home",
                link: "/"
            },
            {
                label: "Vehicles",
                link: "/vehicles"
            },
            {
                label: data?.name || "Details",
                link: `/vehicles/${data?._id || data?.id}`
            }
        ];
    };

    const breadcrumbs = generateBreadcrumbs(vehicleData);

    // Loading State
    if (loading) {
        return (
            <Loading
                mainText="Loading vehicle details..."
                subText="Please wait"
            />
        );
    }

    // Not found fallback
    if (notFound || !vehicleData) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-700">
                    Vehicle Not Found
                </h2>
                <p className="text-gray-500 mt-2">
                    The vehicle listing you are looking for does not exist.
                </p>
            </div>
        );
    }

    const averageRating =
        vehicleData.reviews?.length > 0
            ? (
                vehicleData.reviews.reduce(
                    (acc, r) => acc + Number(r.rating || 0),
                    0
                ) / vehicleData.reviews.length
            ).toFixed(2)
            : 0;

    const vehicleTitle = `${vehicleData.brand} ${vehicleData.model} ${vehicleData.year}`;
    const vehicleSubtitle = `${vehicleData.fuel_type} • ${vehicleData.no_of_seats} Seats • ${vehicleData.transmission} • ${vehicleData.air_conditioning ? 'AC' : 'Non-AC'}`;

    return (
        <div className="bg-background-light">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto">
                <Breadcrumbs items={breadcrumbs} />

                <HeaderInfo
                    title={vehicleTitle}
                    location={vehicleData.address?.city || "Belihuloya"}
                    walkDistance={vehicleData.time_from_uni?.susl_main_gate || "Available for pickup"}
                    rating={averageRating}
                    reviewsCount={vehicleData.reviews?.length || 0}
                />

                <PhotoGrid images={vehicleData.images || []} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    <div className="lg:col-span-2 space-y-10">
                        <PropertyInfo
                            title={vehicleTitle}
                            subtitle={vehicleSubtitle}
                            verified={vehicleData.verified}
                            highly_rated={vehicleData.highly_rated}
                            description={vehicleData.description}
                            vehicle_type={vehicleData.vehicle_type}
                            brand={vehicleData.brand}
                            model={vehicleData.model}
                            year={vehicleData.year}
                            no_of_seats={vehicleData.no_of_seats}
                            fuel_type={vehicleData.fuel_type}
                            transmission={vehicleData.transmission}
                            air_conditioning={vehicleData.air_conditioning}
                            registration_number={vehicleData.registration_number}
                        />

                        <AmenitiesList amenities={vehicleData.amenities || []} />

                        <LocationMap
                            address={vehicleData.address}
                            location={vehicleData.location}
                            time_from_uni={vehicleData.time_from_uni}
                        />

                        <ReviewsSection reviews={vehicleData.reviews || []} />

                        <HostInfo owner={vehicleData.owner} />
                    </div>

                    <BookingCard
                        day_rent={vehicleData.day_rent}
                        rating={averageRating}
                        owner={vehicleData.owner}
                        vehicle_name={vehicleTitle}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;