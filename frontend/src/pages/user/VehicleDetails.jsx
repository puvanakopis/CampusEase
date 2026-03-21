import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { VehicleContext } from "../../context/VehicleContext";
import { SaveItemContext } from "../../context/SaveItemContext";
import { TempBookingContext } from "../../context/TempBookingContext";
import { AuthContext } from "../../context/AuthContext";

import Breadcrumbs from "../../containers/user/vehicleDetails/Breadcrumbs";
import HeaderInfo from "../../containers/user/vehicleDetails/HeaderInfo";
import PhotoGrid from "../../containers/user/vehicleDetails/PhotoGrid";
import PropertyInfo from "../../containers/user/vehicleDetails/PropertyInfo";
import AmenitiesList from "../../containers/user/vehicleDetails/AmenitiesList";
import LocationMap from "../../containers/user/vehicleDetails/LocationMap";
import ReviewsSection from "../../containers/user/vehicleDetails/ReviewsSection";
import HostInfo from "../../containers/user/vehicleDetails/HostInfo";
import VehicleBookingCard from "../../containers/user/vehicleDetails/VehicleBookingCard";
import Loading from "../../components/user/Loading";

const VehicleDetails = () => {
    const { id } = useParams();

    const { getVehicleById } = useContext(VehicleContext);
    const { savedTransports, saveTransport, unsaveTransport } = useContext(SaveItemContext);
    const { tempBooking, saveTempBooking } = useContext(TempBookingContext);
    const { currentUser } = useContext(AuthContext);

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

    const generateBreadcrumbs = (data) => [
        { label: "Home", link: "/" },
        { label: "Vehicles", link: "/vehicles" },
        { label: data?.brand || "Details", link: `/vehicles/${data?._id || data?.id}` }
    ];

    const breadcrumbs = generateBreadcrumbs(vehicleData);

    if (loading)
        return <Loading mainText="Loading vehicle details..." subText="Please wait" />;

    if (notFound || !vehicleData)
        return (
            <div className="py-20 text-center">
                <h2 className="text-3xl font-semibold text-gray-700">Vehicle Not Found</h2>
                <p className="text-gray-500 mt-2">
                    The vehicle listing you are looking for does not exist.
                </p>
            </div>
        );

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

    const vehicleSubtitle = `${vehicleData.fuel_type} • ${vehicleData.no_of_seats} Seats • ${vehicleData.transmission} • ${vehicleData.air_conditioning ? "AC" : "Non-AC"
        }`;

    const isSaved = savedTransports.some(
        (item) => item._id === vehicleData._id
    );

    return (
        <div className="bg-background-light">
            <div className="px-4 py-10 md:px-24 max-w-8xl mx-auto">
                {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

                <HeaderInfo
                    title={vehicleTitle}
                    location={vehicleData.address?.city || "Belihuloya"}
                    walkDistance={
                        vehicleData.time_from_uni?.susl_main_gate ||
                        "Available for pickup"
                    }
                    rating={averageRating}
                    reviewsCount={vehicleData.reviews?.length || 0}
                    isSaved={isSaved}
                    onSaveToggle={() =>
                        isSaved
                            ? unsaveTransport(vehicleData._id)
                            : saveTransport(vehicleData._id)
                    }
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

                        <HostInfo
                            currentUser={currentUser}
                            owner={vehicleData.owner}
                        />
                    </div>

                    <VehicleBookingCard
                        currentUser={currentUser}
                        vehicle={vehicleData}
                        rating={averageRating}
                        tempBooking={tempBooking}
                        saveTempBooking={saveTempBooking}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;