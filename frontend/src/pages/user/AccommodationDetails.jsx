import React from 'react'
import Breadcrumbs from '../../containers/user/accommodationDetails/Breadcrumbs'
import HeaderInfo from '../../containers/user/accommodationDetails/HeaderInfo'
import PhotoGrid from '../../containers/user/accommodationDetails/PhotoGrid'
import PropertyInfo from '../../containers/user/accommodationDetails/PropertyInfo'
import AmenitiesList from '../../containers/user/accommodationDetails/AmenitiesList'
import LocationMap from '../../containers/user/accommodationDetails/LocationMap'
import ReviewsSection from '../../containers/user/accommodationDetails/ReviewsSection'
import HostInfo from '../../containers/user/accommodationDetails/HostInfo'
import BookingCard from '../../containers/user/accommodationDetails/BookingCard'

const AccommodationDetails = () => {
    return (
        <div className='bg-background-light'>
            <div className='px-4 py-10 md:px-10 max-w-7xl mx-auto'>
                <Breadcrumbs />
                <HeaderInfo />
                <PhotoGrid />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                    <div className="lg:col-span-2 space-y-10">
                        <PropertyInfo />
                        <AmenitiesList />
                        <LocationMap />
                        <ReviewsSection />
                        <HostInfo />
                    </div>
                    <BookingCard />
                </div>

            </div>
        </div>
    )
}

export default AccommodationDetails