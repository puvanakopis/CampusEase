import React from "react";

const ViewDetailsPopup = ({ selectedBooking, onClose, onEdit }) => {
    if (!selectedBooking) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return 'N/A';
        return `LKR ${amount.toLocaleString()}`;
    };

    // Get booking ID (using _id as per MongoDB convention)
    const getBookingId = () => {
        return selectedBooking._id || 'N/A';
    };

    // Get user information
    const getUserInfo = () => {
        const user = selectedBooking.user_id || selectedBooking.user || {};
        if (typeof user === 'string') {
            return {
                id: user,
                name: `User ${user.slice(-4)}`,
                initials: user.slice(0, 2).toUpperCase()
            };
        }
        return {
            id: user._id || user.id || 'N/A',
            name: user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : 'N/A',
            initials: user.first_name ? user.first_name.slice(0, 2).toUpperCase() : 'U'
        };
    };

    // Get owner information
    const getOwnerInfo = () => {
        const owner = selectedBooking.owner_id || selectedBooking.owner || {};
        if (typeof owner === 'string') {
            return {
                id: owner,
                name: `Owner ${owner.slice(-4)}`
            };
        }
        return {
            id: owner._id || owner.id || 'N/A',
            name: owner.first_name ? `${owner.first_name} ${owner.last_name || ''}`.trim() : 'N/A'
        };
    };

    // Get resource details based on booking type
    const getResourceDetails = () => {
        if (selectedBooking.booking_type === "vehicle") {
            const vehicle = selectedBooking.vehicle_id || selectedBooking.vehicle || {};

            // If vehicle is just an ID string
            if (typeof vehicle === 'string') {
                return {
                    id: vehicle,
                    title: `Vehicle ${vehicle.slice(-4)}`,
                    type: 'N/A',
                    brand: 'N/A',
                    model: 'N/A'
                };
            }

            // If vehicle is an object with details
            return {
                id: vehicle._id || vehicle.id || 'N/A',
                title: vehicle.name || 'N/A',
                type: vehicle.vehicle_type || 'N/A',
                brand: vehicle.brand || 'N/A',
                model: vehicle.model || 'N/A',
                year: vehicle.year || 'N/A',
                registration: vehicle.registration_number || 'N/A'
            };
        }
        else if (selectedBooking.booking_type === "accommodation") {
            const accommodation = selectedBooking.accommodation_id || selectedBooking.accommodation || {};

            // If accommodation is just an ID string
            if (typeof accommodation === 'string') {
                return {
                    id: accommodation,
                    title: `Accommodation ${accommodation.slice(-4)}`,
                    type: 'N/A',
                    address: 'N/A',
                    city: 'N/A'
                };
            }

            // If accommodation is an object with details
            return {
                id: accommodation._id || accommodation.id || 'N/A',
                title: accommodation.name || 'N/A',
                type: accommodation.accommodation_type || 'N/A',
                address: accommodation.address?.street || 'N/A',
                city: accommodation.address?.city || accommodation.city || 'N/A',
                rooms: accommodation.no_of_rooms || 'N/A',
                beds: accommodation.no_of_beds || 'N/A'
            };
        }
        return {};
    };

    // Get dates (using snake_case as per your models)
    const getStartDate = () => {
        return selectedBooking.start_date || selectedBooking.startDate;
    };

    const getEndDate = () => {
        return selectedBooking.end_date || selectedBooking.endDate;
    };

    const getCreatedAt = () => {
        return selectedBooking.created_at || selectedBooking.createdAt;
    };

    const getUpdatedAt = () => {
        return selectedBooking.last_updated || selectedBooking.updated_at || selectedBooking.updatedAt;
    };

    // Get prices (using snake_case as per your models)
    const getTotalPrice = () => {
        return selectedBooking.total_price || selectedBooking.totalPrice;
    };

    const getUnitPrice = () => {
        return selectedBooking.unit_price || selectedBooking.unitPrice;
    };

    const userInfo = getUserInfo();
    const ownerInfo = getOwnerInfo();
    const resourceDetails = getResourceDetails();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Booking Details</h3>
                        <p className="text-slate-500">Complete information about this booking</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Customer Information */}
                    <div className="bg-slate-50 rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">person</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Customer Information</h4>
                                <p className="text-sm text-slate-500">Student details</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Booking ID:</span>
                                <span className="font-medium text-primary">{getBookingId()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">User ID:</span>
                                <span className="font-medium">{userInfo.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">User Name:</span>
                                <span className="font-medium">{userInfo.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Booking Type:</span>
                                <span className="font-medium capitalize">{selectedBooking.booking_type || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Resource ID:</span>
                                <span className="font-medium">{resourceDetails.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Owner ID:</span>
                                <span className="font-medium">{ownerInfo.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Owner Name:</span>
                                <span className="font-medium">{ownerInfo.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Service Information */}
                    <div className="bg-slate-50 rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">
                                    {selectedBooking.booking_type === "vehicle" ? "directions_car" : "apartment"}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Service Information</h4>
                                <p className="text-sm text-slate-500 capitalize">{selectedBooking.booking_type}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Name/Title:</span>
                                <span className="font-medium">{resourceDetails.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Type:</span>
                                <span className="font-medium capitalize">{resourceDetails.type}</span>
                            </div>

                            {selectedBooking.booking_type === "vehicle" && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Brand:</span>
                                        <span className="font-medium">{resourceDetails.brand}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Model:</span>
                                        <span className="font-medium">{resourceDetails.model}</span>
                                    </div>
                                    {resourceDetails.year !== 'N/A' && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Year:</span>
                                            <span className="font-medium">{resourceDetails.year}</span>
                                        </div>
                                    )}
                                </>
                            )}

                            {selectedBooking.booking_type === "accommodation" && (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Address:</span>
                                        <span className="font-medium">{resourceDetails.address}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">City:</span>
                                        <span className="font-medium">{resourceDetails.city}</span>
                                    </div>
                                    {resourceDetails.rooms !== 'N/A' && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Rooms:</span>
                                            <span className="font-medium">{resourceDetails.rooms}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Booking Timeline */}
                <div className="bg-slate-50 rounded-lg p-5 mb-8">
                    <h4 className="font-bold text-slate-900 mb-4">Booking Timeline</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600 text-sm">check</span>
                                </div>
                                <div>
                                    <p className="font-medium">Booking Submitted</p>
                                    <p className="text-sm text-slate-500">{formatDate(getCreatedAt())}</p>
                                </div>
                            </div>
                        </div>

                        {selectedBooking.status !== "pending" && (
                            <>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-green-600 text-sm">
                                                play_arrow
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Start Date</p>
                                            <p className="text-sm text-slate-500">{formatDate(getStartDate())}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-blue-600 text-sm">
                                                schedule
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">End Date</p>
                                            <p className="text-sm text-slate-500">{formatDate(getEndDate())}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedBooking.status === "completed" && (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600 text-sm">
                                            check_circle
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Last Updated</p>
                                        <p className="text-sm text-slate-500">{formatDate(getUpdatedAt())}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-slate-50 rounded-lg p-5 mb-8">
                    <h4 className="font-bold text-slate-900 mb-4">Payment Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-600">Unit Price</p>
                            <p className="font-medium">{formatCurrency(getUnitPrice())}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Duration</p>
                            <p className="font-medium">{selectedBooking.duration || 0} days</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Total Price</p>
                            <p className="font-bold text-primary">{formatCurrency(getTotalPrice())}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Payment Status</p>
                            <p className={`font-medium ${selectedBooking.payment?.paid ? 'text-green-600' : 'text-orange-600'}`}>
                                {selectedBooking.payment?.paid ? 'Paid' : 'Pending'}
                            </p>
                        </div>

                        {/* Additional payment details if available */}
                        {selectedBooking.payment?.method && (
                            <div className="col-span-2">
                                <p className="text-sm text-slate-600">Payment Method</p>
                                <p className="font-medium capitalize">
                                    {selectedBooking.payment.method.replace(/_/g, ' ')}
                                </p>
                            </div>
                        )}

                        {selectedBooking.payment?.transaction_id && (
                            <div className="col-span-2">
                                <p className="text-sm text-slate-600">Transaction ID</p>
                                <p className="font-medium">{selectedBooking.payment.transaction_id}</p>
                            </div>
                        )}

                        {selectedBooking.payment?.paid_at && (
                            <div className="col-span-2">
                                <p className="text-sm text-slate-600">Paid On</p>
                                <p className="font-medium">{formatDate(selectedBooking.payment.paid_at)}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Notes if available */}
                {selectedBooking.notes && (
                    <div className="bg-slate-50 rounded-lg p-5 mb-8">
                        <h4 className="font-bold text-slate-900 mb-2">Additional Notes</h4>
                        <p className="text-slate-600">{selectedBooking.notes}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={onEdit}
                        className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                    >
                        Edit Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPopup;