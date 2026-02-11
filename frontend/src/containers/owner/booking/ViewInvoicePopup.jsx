const ViewInvoicePopup = ({ selectedBooking, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900">Invoice Details</h3>
                        <p className="text-slate-500">
                            Invoice #{selectedBooking?.invoiceNumber || "INV-" + selectedBooking?.id.replace("#", "")}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="border border-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">download</span>
                            Download PDF
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>

                {/* Invoice Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Bill From</h4>
                        <p className="text-slate-900 font-medium">University Services Department</p>
                        <p className="text-slate-600">University of Peradeniya</p>
                        <p className="text-slate-600">Peradeniya, Sri Lanka</p>
                        <p className="text-slate-600">+94 81 123 4567</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-2">Bill To</h4>
                        <p className="text-slate-900 font-medium">{selectedBooking?.customer.name}</p>
                        <p className="text-slate-600">{selectedBooking?.customer.studentId}</p>
                        <p className="text-slate-600">{selectedBooking?.customer.faculty}</p>
                        <p className="text-slate-600">{selectedBooking?.customer.email}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-600">Invoice #:</span>
                            <span className="font-medium">
                                {selectedBooking?.invoiceNumber || "INV-" + selectedBooking?.id.replace("#", "")}
                            </span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-600">Invoice Date:</span>
                            <span className="font-medium">
                                {selectedBooking?.invoiceDate || new Date().toISOString().split('T')[0]}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600">Status:</span>
                            <span className="font-medium text-green-600">Paid</span>
                        </div>
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="border border-slate-200 rounded-lg overflow-hidden mb-8">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-slate-700">Description</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-700">Period</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-700">Quantity</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-700">Unit Price</th>
                                <th className="px-4 py-3 text-left font-medium text-slate-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-slate-100">
                                <td className="px-4 py-4">
                                    <div>
                                        <p className="font-medium text-slate-900">{selectedBooking?.service.title}</p>
                                        <p className="text-sm text-slate-500">{selectedBooking?.service.details}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-slate-700">{selectedBooking?.period.main}</td>
                                <td className="px-4 py-4 text-slate-700">1</td>
                                <td className="px-4 py-4 text-slate-700">{selectedBooking?.amount}</td>
                                <td className="px-4 py-4 font-medium text-slate-900">{selectedBooking?.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Total Section */}
                <div className="flex justify-end mb-8">
                    <div className="w-64">
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-600">Subtotal:</span>
                            <span className="font-medium">{selectedBooking?.amount}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-600">Tax (0%):</span>
                            <span className="font-medium">LKR 0</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-slate-600">Discount:</span>
                            <span className="font-medium text-green-600">LKR 0</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-slate-200">
                            <span className="text-lg font-bold text-slate-900">Total:</span>
                            <span className="text-lg font-bold text-primary">{selectedBooking?.amount}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div className="bg-slate-50 rounded-lg p-5 mb-8">
                    <h4 className="font-bold text-slate-900 mb-4">Payment Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Payment Method</p>
                            <p className="font-medium">{selectedBooking?.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Payment Status</p>
                            <p className={`font-medium ${selectedBooking?.paymentStatus === "Paid" ? "text-green-600" : "text-orange-600"}`}>
                                {selectedBooking?.paymentStatus}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Transaction ID</p>
                            <p className="font-medium">TXN-{selectedBooking?.id.replace("#", "")}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 mb-1">Payment Date</p>
                            <p className="font-medium">{selectedBooking?.invoiceDate || "2024-06-10"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="border border-slate-200 text-slate-700 py-2.5 px-6 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                        Close
                    </button>
                    <button className="bg-primary text-white py-2.5 px-6 rounded-lg font-medium hover:bg-primary/80 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined">print</span>
                        Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewInvoicePopup;