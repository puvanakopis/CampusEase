import React from 'react'
import BookingReview from '../../containers/user/booking/BookingReview'
import OrderSummary from '../../containers/user/booking/OrderSummary'

const Booking = () => {
    return (
        <div className="bg-[#f6f7f8] min-h-screen max-w-8xl px-4 py-10 md:px-24 max-w-8xl mx-auto gap-6">
            <div >
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        Review your booking
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <BookingReview />
                    </div>
                    <div className="lg:col-span-1">
                        <OrderSummary />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking