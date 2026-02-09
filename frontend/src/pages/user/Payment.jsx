import React from 'react'
import SecureCheckout from '../../containers/user/payment/SecureCheckout'
import OrderSummary from '../../containers/user/payment/OrderSummary'

const Payment = () => {
    return (
        <div className="bg-[#f6f7f8] pb-16">
            <div className='px-4 pt-10 md:px-10 max-w-7xl mx-auto gap-6'>
                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Secure Checkout
                </h1>
                <div className='grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto gap-6'>
                    <SecureCheckout />
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}

export default Payment