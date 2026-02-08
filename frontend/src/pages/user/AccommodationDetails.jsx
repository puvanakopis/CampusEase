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

const AccommodationDetails = () => {
    const accommodationData = {
        title: "Modern Student Annex near Sabaragamuwa University",
        location: "Belihuloya, Sabaragamuwa Province",
        walkDistance: "10 min walk to SUSL Main Gate",
        rating: 4.88,
        reviewsCount: 32,
        price: 18000,
        currency: "LKR",
        period: "month",
        tags: [
            { icon: 'school', text: 'Near SUSL Main Gate', bg: 'bg-blue-50', textColor: 'text-blue-700', border: 'border-blue-100' },
            { icon: 'verified', text: 'CampusEase Verified', bg: 'bg-green-50', textColor: 'text-green-700', border: 'border-green-100' },
            { icon: 'bolt', text: 'Electricity Included', bg: 'bg-purple-50', textColor: 'text-purple-700', border: 'border-purple-100' }
        ],
        description: {
            paragraphs: [
                "Perfectly located for Sabaragamuwa University students and staff. This modern annex is situated in the peaceful environment of Belihuloya, exactly a 10-minute walk from the SUSL main gate. Avoid the morning rush and live within walking distance of your lectures.",
                "The room features a dedicated study area with a large desk, ideal for late-night exam prep. Surrounded by greenery, it offers a quiet atmosphere essential for focused study. High-speed internet is available to access SUSL's LMS and online resources without interruption."
            ]
        },
        amenities: [
            { icon: 'wifi', text: 'High-speed Wifi (LMS Ready)' },
            { icon: 'desk', text: 'Ergonomic Study Desk & Chair' },
            { icon: 'water_drop', text: '24/7 Water Supply' },
            { icon: 'local_laundry_service', text: 'Laundry Facilities' },
            { icon: 'kitchen', text: 'Small Pantry Area' },
            { icon: 'security', text: 'Safe Student Neighborhood' }
        ],
        paymentDetails: {
            rentalRate: 18000,
            rentalType: 'Monthly Rent',
            keyMoney: 36000,
            initialPayment: 54000
        },
        host: {
            name: "Mrs. Priyani",
            fullName: "Priyani Silva",
            joinDate: "Feb 2019",
            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3M3mC_UxCwJLXqKkced1WNJD1I4jNvXIriInvwWLxVuPWctEGW4olEC4UqUAAkT3DIrgFvWBb5e0N32uzyfPDVmKU-U78B6NndkIuiVDp8IEfsxxg-00hCiBaeg3I2ztV3OTZ8fsmHhB-v778CIdiFjmCq5UwfnTtV7ALeCozMKeGGzpVsEeZF62CDyvtGFl9Ze7qinUrKDa03zzbQwoCG-FbBxVHnp4-0k2lLluhVwLenVsWudlkxe6ZQYBttZWoOjVJsNvfrGk",
            bio: "Hello! I have been hosting SUSL students for nearly 10 years. My family and I live nearby and are always available if you need help with anything. We provide a safe, home-like environment for students moving away from home for the first time.",
            responseRate: "100%",
            responseTime: "within an hour",
            isRecommended: true
        },
        images: [
            {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Y1oFNQkG1We2L0MNF7Kt1-7KiMRzBb3t9JnjoNr3aWMa9dMbmCuFpLtHKOJFVMG5ez9Egv45yDa_K3aMKhzr_NAYiDgp0GVfDlTc_3BYnD36XT5gZrrAnpdJIMCSubQ43rnHSNjSgDGSpB9rKAA06iFl7ODaXHqcRJmZBIR2Mhf0GhndjcxGi9JUcPh4CY_tYYQCUyP03JuU9ybDvGtFLL2Ux7_NEwQljcYtm6XNbfeBx_7FIX4Okf85f4-L9scD8D-A1HwOZDQ',
                alt: 'Spacious modern bedroom with study desk overlooking the Belihuloya hills',
                colSpan: 'md:col-span-2',
                rowSpan: 'md:row-span-2'
            },
            {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3g6sKBMEggo7p0QDDlg4ULBq84CKdxu5uCRDVg2tY-VjNQYQLv3C0wEXqhjhMGq6p6yWMs_6ogZgtafNjyR-TeRD8gEc3-CsnOf--GLAiQRLymUX0GprXRPXgSDozleXaJ4rsWeraUAulmZJzWLl2Up_8XlmBj6k5lgXGxkzflfZh6EYA0qxRtSAmzmtt49fdrjpjf4_TMlHQ-OYYOjx1tXVHXz9wm9Ji8K_VcK-Cy_87e_q5f7TbTsCHc7aiM5o7nbBPBJtUVHY',
                alt: 'Clean tiled bathroom',
                colSpan: ''
            },
            {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCsA04Rw25lyomrpZ5y3d6TVjuP_85_gu75HhL6boGsnqDsYBENScpjg5UC-lO1Z6K8M1Qs31FqeOyF1sbq3Q-CIDnLs1AHM-mJrpI1b7shDgC1MZdmnsTEkTAhrtPCYLsP6AYbHUXwB-QkJX-8VDsvbS-kped1X-Pw-0dbpi29pJf7JUJeGyvuUiyj22x9on4KEhaYPH4xziXrY3kl8ypqgNqM97XgCLiSAZsZONozQq45Ihy1XMS7Z7w7qKtMvk_xf8t5Bqo64I',
                alt: 'Study area with bookshelf',
                colSpan: ''
            },
            {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArlNJU6LGLyxibxFnnZ8UcarI08kqAaqAJp5m7oCAwWF5nbwtMdpIuAzeh7b4H6JGRNSbnSXD1_4M7mYozgCnognzTRxef9ZRKqYnYFu0AL2WPgQ8DFrabqG33U3Joh3__Hgs_h8f-TfFQsJsiPwlra1m_6ewn0h002t21DjJeGqzc7NS1cYEKMJ6rCksa72eRhhmai4x8zLAKsN04XSlZ-2uYL30xdMOZ_g30IbTd6Yn8631yCOj11nkzGwevhyqGCpRo9eHZwyo',
                alt: 'Shared kitchen area',
                colSpan: ''
            },
            {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQuqeZKgYUk0ZP6SGi1rxx8_LK6v1PuYzKuW_J4SkJBTpBCuyEQ3Mb9WgM0C2dcbz8aeSTudvmwgj7IAur60gTITLZWT9quwur44KFv4E0JflCkyEGvVQ8pYO9VkOjn8C-2wyY9HJ-oRL0BJjzlcSTkNJxjC3_FUHKQAqnLEl63qWU2tUlSaR2mXTYBvsn3991Q1p8AkFlHGgreH8y96xSvnh5qFY3KjL-HVqnNBttrHz7uQb4ct3sVlullpd0A1eNwFpeJ0uo1nk',
                alt: 'View of the Belihuloya landscape from the balcony',
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
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm7lkysdTuv3I_kq8ciERHGGL7JVa-FVApEdgzrPe6jRpVMojrflO2N4b-UH0AfhGIKjp7ha5WWa8p8t8pfcKKh81NqdBSMpmnkUtC0_a-_08rJ3-sKydInfqZHV9WXy7-vbYWupPGvmrpKqZjM9RcDaaPQ2bl_f7O2UMuYoM0qrLpRVrBm5n1H-hciyucGOCxy1DAvk_KqYcSFgFHvLzrYX8kj1SpoVrzw90eL1otSU4CYAnYE4Np_tubeK1Ngw5STRB6i3vSYYY',
                name: 'Tharindu S.',
                role: 'Applied Sciences Faculty • 2nd Year',
                comment: '"Perfect for me as a science student. The walk to the labs is very quick, and the area is super quiet for studying. The host understands our exam schedules and keeps the place peaceful."'
            },
            {
                avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nBbP2HtGqTL6ZAZVhEObv5yC-hnDuA-o7EGwsXz0YZHJcyHGycbkVmOH1DkdLJ2T0Vu8t1RK-2TXNooeO4JepJ2m1H6Q9gBBrFvkhEdl_5-GV9h2tq0Hnmsourm2__FE7lurL6yEJncptXX8Ga6UoUdJxnC3_FUHKQAqnLEl63qWU2tUlSaR2mXTYBvsn3991Q1p8AkFlHGgreH8y96xSvnh5qFY3KjL-HVqnNBttrHz7uQb4ct3sVlullpd0A1eNwFpeJ0uo1nk',
                name: 'Kasun S.',
                role: 'Management Faculty • Graduated 2023',
                comment: '"Stayed here for two years. Best part is being so close to the main gate. I could literally wake up at 7:30 for an 8 AM lecture. Highly recommended for any SUSL student."'
            }
        ],
        breadcrumbs: [
            { label: 'Home', href: '#' },
            { label: 'Belihuloya', href: '#' },
            { label: 'Student Annex near SUSL Main Gate', href: null }
        ]
    };

    return (
        <div className='bg-background-light'>
            <div className='px-4 py-10 md:px-10 max-w-7xl mx-auto'>
                <Breadcrumbs items={accommodationData.breadcrumbs} />
                <HeaderInfo
                    title={accommodationData.title}
                    location={accommodationData.location}
                    walkDistance={accommodationData.walkDistance}
                    rating={accommodationData.rating}
                    reviewsCount={accommodationData.reviewsCount}
                />
                <PhotoGrid images={accommodationData.images} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    <div className="lg:col-span-2 space-y-10">
                        <PropertyInfo
                            title="Private Room in Belihuloya"
                            subtitle="Ideal for SUSL Students • 1 bedroom • 2 beds • 1 private bath"
                            tags={accommodationData.tags}
                            description={accommodationData.description}
                        />
                        <AmenitiesList amenities={accommodationData.amenities} />
                        <LocationMap
                            mapImage={accommodationData.locationDetails.mapImage}
                            nearbyLocations={accommodationData.locationDetails.nearbyLocations}
                        />
                        <ReviewsSection
                            rating={accommodationData.rating}
                            reviewsCount={accommodationData.reviewsCount}
                            reviews={accommodationData.reviews}
                        />
                        <HostInfo host={accommodationData.host} />
                    </div>
                    <BookingCard
                        price={accommodationData.price}
                        currency={accommodationData.currency}
                        period={accommodationData.period}
                        rating={accommodationData.rating}
                        paymentDetails={accommodationData.paymentDetails}
                        hostName={accommodationData.host.name}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccommodationDetails;