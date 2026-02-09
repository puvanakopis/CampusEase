import React from 'react'
import BookingReview from '../../containers/user/booking/BookingReview'
import OrderSummary from '../../containers/user/booking/OrderSummary'

const Booking = () => {
    return (
        <div className="bg-[#f6f7f8]">
            <div className='px-4 pt-10 md:px-10 max-w-7xl mx-auto gap-6'>
                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Review your booking
                </h1>            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 px-4 pb-16 md:px-10 max-w-7xl mx-auto gap-6'>
                <BookingReview />
                <OrderSummary />
            </div>
        </div>
    )
}

export default Booking