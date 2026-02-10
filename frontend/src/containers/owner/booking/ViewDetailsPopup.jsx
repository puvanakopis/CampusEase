const ViewDetailsPopup = ({ selectedOrder, onClose, onEdit }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Order Details</h3>
                        <p className="text-slate-500">Complete information about this order</p>
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
                                <span className="text-slate-600">Name:</span>
                                <span className="font-medium">{selectedOrder?.customer.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Student ID:</span>
                                <span className="font-medium">{selectedOrder?.customer.studentId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Email:</span>
                                <span className="font-medium">{selectedOrder?.customer.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Phone:</span>
                                <span className="font-medium">{selectedOrder?.customer.phone}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Faculty:</span>
                                <span className="font-medium">{selectedOrder?.customer.faculty}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Year:</span>
                                <span className="font-medium">{selectedOrder?.customer.year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Service Information */}
                    <div className="bg-slate-50 rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">
                                    {selectedOrder?.service.icon}
                                </span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Service Information</h4>
                                <p className="text-sm text-slate-500">{selectedOrder?.service.type}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Service:</span>
                                <span className="font-medium">{selectedOrder?.service.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Details:</span>
                                <span className="font-medium text-right">{selectedOrder?.service.details}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Provider:</span>
                                <span className="font-medium">{selectedOrder?.service.provider}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Contact:</span>
                                <span className="font-medium">{selectedOrder?.service.providerContact}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-600">Amenities:</span>
                                <div className="flex flex-wrap gap-1">
                                    {selectedOrder?.service.amenities?.map((amenity, index) => (
                                        <span key={index} className="bg-white px-2 py-1 rounded text-xs">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="bg-slate-50 rounded-lg p-5 mb-8">
                    <h4 className="font-bold text-slate-900 mb-4">Order Timeline</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600 text-sm">check</span>
                                </div>
                                <div>
                                    <p className="font-medium">Order Submitted</p>
                                    <p className="text-sm text-slate-500">{selectedOrder?.submitted || "2 days ago"}</p>
                                </div>
                            </div>
                        </div>
                        {selectedOrder?.status === "active" && (
                            <>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-green-600 text-sm">
                                                play_arrow
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium">Activated</p>
                                            <p className="text-sm text-slate-500">{selectedOrder?.activatedDate}</p>
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
                                            <p className="font-medium">Next Payment</p>
                                            <p className="text-sm text-slate-500">{selectedOrder?.nextPayment}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedOrder?.status === "completed" && (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600 text-sm">
                                            check_circle
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-medium">Completed</p>
                                        <p className="text-sm text-slate-500">{selectedOrder?.completionDate}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

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
                        Edit Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDetailsPopup;