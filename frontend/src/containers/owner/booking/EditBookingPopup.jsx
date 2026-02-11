const EditBookingPopup = ({ editedBooking, onEditedBookingChange, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Edit Booking</h3>
                        <p className="text-slate-500">Update booking details</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Booking Amount</label>
                            <input
                                type="text"
                                value={editedBooking?.amount}
                                onChange={(e) => onEditedBookingChange({ ...editedBooking, amount: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                            <select
                                value={editedBooking?.priority}
                                onChange={(e) => onEditedBookingChange({ ...editedBooking, priority: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={editedBooking?.period?.startDate}
                                onChange={(e) => onEditedBookingChange({
                                    ...editedBooking,
                                    period: { ...editedBooking.period, startDate: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={editedBooking?.period?.endDate}
                                onChange={(e) => onEditedBookingChange({
                                    ...editedBooking,
                                    period: { ...editedBooking.period, endDate: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Customer Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    value={editedBooking?.customer.name}
                                    onChange={(e) => onEditedBookingChange({
                                        ...editedBooking,
                                        customer: { ...editedBooking.customer, name: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editedBooking?.customer.email}
                                    onChange={(e) => onEditedBookingChange({
                                        ...editedBooking,
                                        customer: { ...editedBooking.customer, email: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={editedBooking?.customer.phone}
                                    onChange={(e) => onEditedBookingChange({
                                        ...editedBooking,
                                        customer: { ...editedBooking.customer, phone: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                                <input
                                    type="text"
                                    value={editedBooking?.customer.studentId}
                                    onChange={(e) => onEditedBookingChange({
                                        ...editedBooking,
                                        customer: { ...editedBooking.customer, studentId: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Service Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Service Title</label>
                                <input
                                    type="text"
                                    value={editedBooking?.service.title}
                                    onChange={(e) => onEditedBookingChange({
                                        ...editedBooking,
                                        service: { ...editedBooking.service, title: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Service Details</label>
                                <input
                                    type="text"
                                    value={editedBooking?.service.details}
                                    onChange={(e) => onEditedBookingChange({
                                        ...editedBooking,
                                        service: { ...editedBooking.service, details: e.target.value }
                                    })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="border-t pt-6">
                        <h4 className="font-bold text-slate-900 mb-4">Admin Notes</h4>
                        <textarea
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                            rows="4"
                            placeholder="Add any admin notes or updates..."
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 border border-slate-200 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary/80 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBookingPopup;