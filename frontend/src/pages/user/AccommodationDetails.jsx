import React from 'react'
import Breadcrumbs from '../../containers/user/accommodationDetails/Breadcrumbs'
import HeaderInfo from '../../containers/user/accommodationDetails/HeaderInfo'
import PhotoGrid from '../../containers/user/accommodationDetails/PhotoGrid'

const AccommodationDetails = () => {
    return (
        <div className='bg-background-light'>
            <div className='px-4 py-10 md:px-10 max-w-7xl mx-auto'>
                <Breadcrumbs />
                <HeaderInfo />
                <PhotoGrid />
            </div>
        </div>
    )
}

export default AccommodationDetails