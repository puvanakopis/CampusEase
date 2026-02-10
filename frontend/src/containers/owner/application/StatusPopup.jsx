import React from 'react';

const StatusPopup = ({ submittedApplications, setShowStatusPopup }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-slate-900">Your Owner Applications</h3>
                    <button
                        onClick={() => setShowStatusPopup(false)}
                        className="size-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-500">close</span>
                    </button>
                </div>

                {submittedApplications.length === 0 ? (
                    <p className="text-slate-500 text-center py-8">You haven't submitted any owner applications yet.</p>
                ) : (
                    <div className="space-y-4">
                        {submittedApplications.map(app => (
                            <div key={app.id} className="border border-slate-200 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <p className="text-sm text-slate-500">Application ID:</p>
                                        <p className="font-medium text-slate-900">{app.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Status:</p>
                                        <p className={`font-medium ${app.status === "Approved" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                                            {app.status}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Submitted:</p>
                                        <p className="font-medium text-slate-900">{app.submittedDate}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-500">Vehicles:</span>
                                        <span className="font-medium ml-2">{app.vehicleCount}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">Types:</span>
                                        <span className="font-medium ml-2">{app.vehicleTypes?.join(", ") || "N/A"}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-500">License:</span>
                                        <span className="font-medium ml-2">{app.driverLicenseNumber}</span>
                                    </div>
                                    <div>
                                        <button
                                            className="text-primary text-sm hover:underline"
                                            onClick={() => alert(`Notes: ${app.reviewNotes}`)}
                                        >
                                            View Notes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusPopup;