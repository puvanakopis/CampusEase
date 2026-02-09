import React from 'react';
import Breadcrumbs from '../../containers/user/itemDetails/Breadcrumbs';
import HeaderInfo from '../../containers/user/itemDetails/HeaderInfo';
import PhotoGrid from '../../containers/user/itemDetails/PhotoGrid';
import PropertyInfo from '../../containers/user/itemDetails/PropertyInfo';
import AmenitiesList from '../../containers/user/itemDetails/AmenitiesList';
import LocationMap from '../../containers/user/itemDetails/LocationMap';
import ReviewsSection from '../../containers/user/itemDetails/ReviewsSection';
import HostInfo from '../../containers/user/itemDetails/HostInfo';
import BookingCard from '../../containers/user/itemDetails/BookingCard';

const VehicleDetails = () => {
    const vehicleData = {
        title: "Toyota Prius 2021 - Eco Friendly Ride",
        location: "Colombo, Sri Lanka",
        walkDistance: "Available for pickup within Colombo city",
        rating: 4.92,
        reviewsCount: 58,
        price: 8000,
        currency: "LKR",
        period: "day",
        tags: [
            { icon: 'bolt', text: 'Electric Vehicle', bg: 'bg-green-50', textColor: 'text-green-700', border: 'border-green-100' },
            { icon: 'verified', text: 'Owner Verified', bg: 'bg-blue-50', textColor: 'text-blue-700', border: 'border-blue-100' },
            { icon: 'star', text: 'Highly Rated', bg: 'bg-yellow-50', textColor: 'text-yellow-700', border: 'border-yellow-100' }
        ],
        description: {
            paragraphs: [
                "Perfect for city commutes and weekend trips. The Prius 2021 offers an eco-friendly driving experience with great fuel efficiency and a smooth ride.",
                "Equipped with modern features including GPS, Bluetooth connectivity, and a rear camera. Ideal for both short and long trips in comfort."
            ]
        },
        amenities: [
            { icon: 'ac_unit', text: 'Air Conditioning' },
            { icon: 'gps_fixed', text: 'GPS Navigation' },
            { icon: 'battery_charging_full', text: 'Hybrid Battery System' },
            { icon: 'luggage', text: 'Spacious Boot' },
            { icon: 'security', text: '24/7 Roadside Assistance' }
        ],
        paymentDetails: {
            rentalRate: 8000,
            rentalType: 'Day Rent',
            keyMoney: 20000,
            initialPayment: 28000
        },
        host: {
            name: "Mr. Nimal",
            fullName: "Nimal Fernando",
            joinDate: "Jan 2018",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
            bio: "I provide well-maintained vehicles for city and leisure trips. Always available to assist with any vehicle queries or roadside help.",
            responseRate: "100%",
            responseTime: "within 30 mins",
            isRecommended: true
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop',
                alt: 'Side view of Toyota Prius 2021',
                colSpan: 'md:col-span-2',
                rowSpan: 'md:row-span-2'
            },
            {
                url: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800&auto=format&fit=crop',
                alt: 'Interior view with leather seats',
                colSpan: ''
            },
            {
                url: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=800&auto=format&fit=crop',
                alt: 'Dashboard with navigation screen',
                colSpan: ''
            },
            {
                url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
                alt: 'Rear view with spacious boot',
                colSpan: ''
            },
            {
                url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
                alt: 'On-road view of Prius',
                colSpan: '',
                showButton: true
            }
        ],
        locationDetails: {
            mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBr0WTSK4jeNlSatbcZnAFAWeTILWxXsvYC5G-UYAscN1vNPf94bdopuzVTyRmMHCaAy7W75JRF3kI7wbuoYZKVpvvJ-9DUOampwFL08TSpwoSHHSrEipMtQ0SMTEbzoVLCa84dH-dZ_2zXyC_PuxVGmUmwhS7l5QNDKoDy7lbnk5MOIza0AEX_VSzPnzALhTNTvDgTsunQRszsoe_HUxjwJQEPupXk7kg6vAppCls_YqAZl6k-_fHzrgRPIW3d_O5jKLBCCMzQThU',
            nearbyLocations: [
                { name: 'SUSL Main Gate', distance: '10 min walk (800m)' },
                { name: 'Belihuloya Town', distance: '5 min by bus/tuk-tuk' },
                { name: 'Pambahinna Junction', distance: '15 min walk' }
            ]

        },
        reviews: [
            {
                avatar: 'https://i.pravatar.cc/150?u=saman',
                name: 'Saman P.',
                role: 'Engineer • 3rd Year',
                comment: '"Smooth drive and very fuel efficient. Perfect for city commutes."'
            },
            {
                avatar: 'https://i.pravatar.cc/150?u=kamal',
                name: 'Kamal R.',
                role: 'Lecturer • 1 Year Rental',
                comment: '"Clean car, great service. Owner responds quickly to messages."'
            }
        ],
        breadcrumbs: [
            { label: 'Home', href: '#' },
            { label: 'Colombo', href: '#' },
            { label: 'Toyota Prius 2021', href: null }
        ]
    };

    return (
        <div className='bg-background-light'>
            <div className='px-4 py-10 md:px-24 max-w-8xl mx-auto'>
                <Breadcrumbs items={vehicleData.breadcrumbs} />
                <HeaderInfo
                    title={vehicleData.title}
                    location={vehicleData.location}
                    walkDistance={vehicleData.walkDistance}
                    rating={vehicleData.rating}
                    reviewsCount={vehicleData.reviewsCount}
                />
                <PhotoGrid images={vehicleData.images} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    <div className="lg:col-span-2 space-y-10">
                        <PropertyInfo
                            title="Toyota Prius 2021"
                            subtitle="Hybrid • 5 Seats • AC • GPS"
                            tags={vehicleData.tags}
                            description={vehicleData.description}
                        />
                        <AmenitiesList amenities={vehicleData.amenities} />
                        <LocationMap
                            mapImage={vehicleData.locationDetails.mapImage}
                            nearbyLocations={vehicleData.locationDetails.nearbyLocations}
                        />
                        <ReviewsSection
                            rating={vehicleData.rating}
                            reviewsCount={vehicleData.reviewsCount}
                            reviews={vehicleData.reviews}
                        />
                        <HostInfo host={vehicleData.host} />
                    </div>
                    <BookingCard
                        price={vehicleData.price}
                        currency={vehicleData.currency}
                        period={vehicleData.period}
                        rating={vehicleData.rating}
                        paymentDetails={vehicleData.paymentDetails}
                        hostName={vehicleData.host.name}
                    />
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;