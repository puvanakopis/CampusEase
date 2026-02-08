import React from "react";
import FiltersSidebar from "../../containers/user/accommodation/FiltersSidebar";
import PageHeader from "../../containers/user/accommodation/PageHeader"
import SortBar from "../../containers/user/accommodation/SortBar"
import AccommodationGrid from "../../containers/user/accommodation/AccommodationGrid"

const accommodations = [
    {
        title: "Green View Bodim - Boys",
        rating: 4.8,
        location: "Pambahinna, SUSL Road",
        tags: ["Shared (3-bed)", "Water Supply", "5 min walk"],
        price: "LKR 4,500",
        priceLabel: "Per Student",
        badge: { text: "Male", color: "bg-primary/90 text-white" },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN30r4lipJnkR2QONwkmDt8jdKnfg_fJ0WfX_cAJBcQvvRIfVT-0sqpq1nLcuVGk_V1DWA6OG5NahfXqZrcmR39_aZZyrhot3LHpvXam8qbBsbz8YKJKucKFAeohrkikOB4HF41foMTfHkSiGppppBmm8-zJ8NjJK3lkk48EaNJWsAcJT194ID4CjTs3V4uUgiXhq7KsbQYkS-UU10YsGqMN1fUVEarwGg36DS8ChACQcgxheC4LEyTF1c0Mcw848nvTlLtdnM2ik",
        favorite: false,
    },
    {
        title: "Hilltop Girls' Hostel",
        rating: 4.5,
        location: "Kumbalgama, Belihuloya",
        tags: ["Safe & Secure", "Kitchen"],
        price: "LKR 6,000",
        priceLabel: "Per Month",
        badge: { text: "Female", color: "bg-primary/90 text-white" },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByJw4Zk26avcj6GVK2Hu4LNKYIdw-8DMRJ_3l9ewxF1JBjDj3lrVjrOc91N_xzapf9XJOHwr0gIHB63ZIu8ZrAXdlbxtY8qJfxqBLEq0JtwtJR3u8WPqTB23tbnPjvARHu22jOZKef6dhL3kgRJn5yeBaaZtzBioxs0Mo9q5fROUvtUTKHobdgYu1D5hi-1LxQUq3lMPY87ZcysOO48FaEaAoGnW8rek3YURu8scFOjo_LXRSvQ0xoOjTgUPkG4qZOuodPDbtrWa0",
        favorite: true,
    },
    {
        title: "Mountain Breeze Annex",
        rating: 4.2,
        location: "Muthuhela Village",
        tags: ["Single Room", "Quiet Area"],
        price: "LKR 3,800",
        priceLabel: "Per Month",
        badge: { text: "Male", color: "bg-primary/90 text-white" },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyAaxIZalhy02wvUSnsgd1xm1ZDNbdsx2hJlFeyljH-xRK6kFRtC8euKTCovarRp5rcSqZOZExLx4C4nCEZsza3Ris5WG1N9PMYrUlisN2XOMIE25ifkfZ0_esybPWpc-mndNztCan1NkUxllnde8B83CU6p9Y8ff-1H__hmvlS4Kx2KE-aztgIUaPlPJAA58G5TcVsef-QUnJGTy9jvgbZHz-coQYSEo0k7WBOo30gB5uuRierScest6BaygNFG_abUWy5ImCNB8",
        favorite: false,
    },
    {
        title: "River Side Student Stay",
        rating: 4.7,
        location: "Belihuloya Junction",
        tags: ["Near Bus Stop", "Dining Area"],
        price: "LKR 5,500",
        priceLabel: "Per Month",
        badge: { text: "Female", color: "bg-primary/90 text-white" },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVmmGSLalUhReybwfdK3zkCpALKnWnUBimNR0eWTBsrvS2XC96U1c8mpQkUaUPwSack57hx7va5O8e8YRvQhhbHRG1L3gdCtJHntw7kwVRk9iFhLmDVw_KRmo7zpKX3zcvFsrzX_SdqcJtkD_qXTF9uzMZ2UDYXM5yTszzkE7rOM2KrG1V5oNCNof6dVXnFKoOIsP16a1vbfh98Xs_OBbWk5GGLd4zLA8VYMU709gYbcFpU-n1WCYZ6xSmOlxt2shQgAJKk8MvD8",
        favorite: false,
    },
    {
        title: "Kumbalgama Shared House",
        rating: 4.6,
        location: "Kumbalgama",
        tags: ["Beds Included", "Study Table"],
        price: "LKR 4,200",
        priceLabel: "Per Person",
        badge: { text: "Male", color: "bg-primary/90 text-white" },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuANUtBMjgPDK3lxu2SfEJGnmLsoy6rlRQUv7NaJgmMULFT1KigFjU6t2n6ffOf9FVUciw-u884fB6Qak544cDvEv4IVL7TbuBH-UkcWA9o17SYs_FieDTp_Z6UKaCHYlzDd0EA8MZAjXeroXBDO_tPVYa5vVrv56vBeyIXRXoxfcfWIDdMR3Ee-qjJltYR9lQNG_r26F9jAZUKfEon80qZZjOoF-FhSrEavZsr_gjO57jfXdag1mSLlrSH4cBbUGJmUEmoG9id-ey4",
        favorite: false,
    },
    {
        title: "Executive Annex for Lecturers",
        rating: 4.9,
        location: "Pambahinna",
        tags: ["Private Entrance", "A/C Available"],
        price: "LKR 18,000",
        priceLabel: "Per Month",
        badge: { text: "Male", color: "bg-primary/90 text-white" },
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnTp62qSsO2cbybBYuQf7DB2iHGHjMCaBIoGkePCJDk2ITQkZ8g4cAm12UNxC4JTlJT-mNhU8cFXo90Ai0wJGVQSAd5V6zfEPgcGzGi4XTGI6z06lDsXcU8GuQ8aU1ERm7Ubxqh1HqYVxZh1OthqEx9uR1f-7b5HRxnBWnQTsfl1i5S69l5kakFa1zx2V24dR-HluNOy5XxyWoVH-A_eF_UbdVbtqcJ1TlZQFNUSRNo2Vq-mRzUxterrTSWgerP3tjXQX6av_DT9A",
        favorite: false,
    },
    {
        title: "Sunset View Hostel",
        rating: 4.4,
        location: "Belihuloya Main Road",
        tags: ["Shared Room", "WiFi"],
        price: "LKR 5,000",
        priceLabel: "Per Month",
        badge: { text: "Female", color: "bg-primary/90 text-white" },
        image: "https://via.placeholder.com/400x300?text=Sunset+View",
        favorite: false,
    },
    {
        title: "Forest Edge Lodge",
        rating: 4.3,
        location: "Kumbalgama",
        tags: ["Private Room", "Quiet Area"],
        price: "LKR 6,200",
        priceLabel: "Per Month",
        badge: { text: "Male", color: "bg-primary/90 text-white" },
        image: "https://via.placeholder.com/400x300?text=Forest+Edge",
        favorite: false,
    },
    {
        title: "Lakefront Residence",
        rating: 4.6,
        location: "Pambahinna",
        tags: ["Single Room", "Balcony View"],
        price: "LKR 7,500",
        priceLabel: "Per Month",
        badge: { text: "Female", color: "bg-primary/90 text-white" },
        image: "https://via.placeholder.com/400x300?text=Lakefront+Residence",
        favorite: false,
    },
    {
        title: "Hillside Dormitory",
        rating: 4.1,
        location: "Muthuhela Village",
        tags: ["Shared Room", "Laundry Facility"],
        price: "LKR 4,000",
        priceLabel: "Per Month",
        badge: { text: "Male", color: "bg-primary/90 text-white" },
        image: "https://via.placeholder.com/400x300?text=Hillside+Dormitory",
        favorite: false,
    },
    {
        title: "Cedar Grove Hostel",
        rating: 4.5,
        location: "Belihuloya Junction",
        tags: ["Kitchen", "Study Area"],
        price: "LKR 5,300",
        priceLabel: "Per Month",
        badge: { text: "Female", color: "bg-primary/90 text-white" },
        image: "https://via.placeholder.com/400x300?text=Cedar+Grove+Hostel",
        favorite: false,
    }
];


const Accommodations = () => {
    return (
        <div className='bg-[#f6f7f8]'>
            <div className="flex flex-1 flex-col lg:flex-row px-4 py-10 md:px-10 max-w-7xl mx-auto mx-auto">
                <FiltersSidebar />
                <main className="flex-1 flex flex-col pl-4 md:pl-6 lg:pl-10 w-full gap-y-4">
                    <PageHeader />
                    <SortBar />
                    <AccommodationGrid accommodations={accommodations} />
                </main>
            </div>
        </div>
    );
};

export default Accommodations;