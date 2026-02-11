import React from "react";

const ViewBookingPopup = ({ booking, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">{booking.bookingNumber}</h3>
                        <p className="text-slate-500">Booking ID: {booking.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Customer Information</h4>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-16 rounded-full overflow-hidden bg-slate-100">
                                    <img
                                        src={booking.customer.profileImage}
                                        alt={booking.customer.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/100x100?text=User";
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{booking.customer.name}</p>
                                    <p className="text-sm text-slate-500">{booking.customer.studentId}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {booking.customer.faculty}
                                        </span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                            {booking.customer.year}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Email:</span>
                                    <span className="font-medium">{booking.customer.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Phone:</span>
                                    <span className="font-medium">{booking.customer.phone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Owner Information */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Service Provider</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Owner Name:</span>
                                    <span className="font-medium">{booking.owner.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Email:</span>
                                    <span className="font-medium">{booking.owner.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Phone:</span>
                                    <span className="font-medium">{booking.owner.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Rating:</span>
                                    <span className="font-medium text-yellow-600">{booking.owner.rating}/5</span>
                                </div>
                            </div>
                        </div>

                        {/* Booking Timeline */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Booking Timeline</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-blue-600 text-sm">schedule</span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Submitted</p>
                                            <p className="text-sm text-slate-500">{booking.submitted}</p>
                                        </div>
                                    </div>
                                </div>
                                {booking.activatedDate && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-green-600 text-sm">play_arrow</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Activated</p>
                                                <p className="text-sm text-slate-500">{booking.activatedDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {booking.completionDate && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-purple-600 text-sm">check_circle</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Completed</p>
                                                <p className="text-sm text-slate-500">{booking.completionDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Service Details */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Service Details</h4>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">
                                        {booking.service.type === "Accommodation" ? "apartment" : "directions_bus"}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{booking.service.type}</p>
                                    <p className="text-sm text-slate-500">{booking.service.category}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Title:</span>
                                    <span className="font-medium">{booking.service.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Details:</span>
                                    <span className="font-medium text-right">{booking.service.details}</span>
                                </div>
                                <div>
                                    <span className="text-slate-600">Amenities:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {booking.service.amenities.map((amenity, index) => (
                                            <span key={index} className="px-3 py-1 bg-white rounded-full text-xs text-slate-700 border border-slate-200">
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Period */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Booking Period</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Duration:</span>
                                    <span className="font-medium">{booking.period.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Start Date:</span>
                                    <span className="font-medium">{booking.period.startDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">End Date:</span>
                                    <span className="font-medium">{booking.period.endDate}</span>
                                </div>
                                <div className="pt-3 border-t border-slate-200">
                                    <p className="text-lg font-bold text-slate-900 text-center">{booking.period.main}</p>
                                    <p className="text-sm text-slate-500 text-center">{booking.period.sub}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment & Commission */}
                        <div className="bg-slate-50 rounded-lg p-5">
                            <h4 className="font-bold text-slate-900 mb-4">Payment & Commission</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Monthly Amount:</span>
                                    <span className="font-medium">LKR {booking.amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Total Amount:</span>
                                    <span className="font-bold text-slate-900">{booking.totalAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Payment Status:</span>
                                    <span className={`font-medium ${booking.paymentStatus === "Paid" ? "text-green-600" : booking.paymentStatus === "Pending" ? "text-orange-600" : "text-yellow-600"}`}>
                                        {booking.paymentStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Payment Method:</span>
                                    <span className="font-medium">{booking.paymentMethod}</span>
                                </div>
                                <div className="pt-3 border-t border-slate-200">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Platform Commission:</span>
                                        <span className="font-bold text-primary">LKR {booking.commission.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">5% of total amount</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document Verification */}
                <div className="mt-8 bg-slate-50 rounded-lg p-5">
                    <h4 className="font-bold text-slate-900 mb-4">Document Verification</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700">Student ID</span>
                                <span className={`px-2 py-1 rounded text-xs ${booking.studentDocuments.studentIdVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {booking.studentDocuments.studentIdVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700">NIC</span>
                                <span className={`px-2 py-1 rounded text-xs ${booking.studentDocuments.nicVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {booking.studentDocuments.nicVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-700">Address</span>
                                <span className={`px-2 py-1 rounded text-xs ${booking.studentDocuments.addressVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {booking.studentDocuments.addressVerified ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes & Actions */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2">Admin Notes</h4>
                            <p className="text-slate-600">{booking.notes || "No additional notes."}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="border border-slate-200 text-slate-700 py-2.5 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                                Send Message
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBookingPopup;