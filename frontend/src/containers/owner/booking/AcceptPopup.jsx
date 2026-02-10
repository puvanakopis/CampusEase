const AcceptPopup = ({ selectedOrder, onClose, onConfirm, getPriorityBadge }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Accept Order</h3>
                        <p className="text-sm text-slate-500">Confirm acceptance of this order</p>
                    </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="font-medium text-slate-900">{selectedOrder?.id}</p>
                            <p className="text-sm text-slate-600">{selectedOrder?.customer.name}</p>
                        </div>
                        {selectedOrder?.priority && getPriorityBadge(selectedOrder.priority)}
                    </div>
                    <p className="text-sm text-slate-500">{selectedOrder?.service.title}</p>
                    <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-xs text-slate-500">Amount</p>
                            <p className="text-sm font-medium text-slate-900">{selectedOrder?.amount}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Period</p>
                            <p className="text-sm font-medium text-slate-900">{selectedOrder?.period.main}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Start Date *</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
                        <textarea
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows="3"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
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
                        Confirm Acceptance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcceptPopup;