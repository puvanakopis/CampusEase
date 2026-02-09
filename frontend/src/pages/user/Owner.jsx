import React from 'react'
import ProfileHeader from '../../containers/user/owner/ProfileHeader'
import OwnerSidebar from '../../containers/user/owner/OwnerSidebar'
import TabsSection from '../../containers/user/owner/TabsSection'
import ReviewsSection from '../../containers/user/owner/ReviewsSection'

const Owner = () => {
    return (
        <div className="bg-[#f6f7f8]">
            <div className=" px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6">
                <ProfileHeader />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
                    <div className='lg:col-span-3 space-y-8'>
                        <OwnerSidebar />
                    </div>
                    <div className='lg:col-span-9 space-y-10'>
                        <TabsSection />
                        <ReviewsSection />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Owner