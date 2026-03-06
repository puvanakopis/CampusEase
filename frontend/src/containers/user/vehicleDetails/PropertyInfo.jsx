import React, { useState, useRef, useEffect } from 'react';

const PropertyInfo = ({
    title,
    subtitle,
    verified,
    highly_rated,
    description,
    vehicle_type,
    no_of_seats,
    fuel_type,
    transmission,
    air_conditioning,
    registration_number
}) => {
    const [showModal, setShowModal] = useState(false);
    const [needsPopup, setNeedsPopup] = useState(false);
    const descRef = useRef(null);

    useEffect(() => {
        if (descRef.current && description) {
            const lineHeight = parseFloat(getComputedStyle(descRef.current).lineHeight);
            const lines = descRef.current.scrollHeight / lineHeight;
            if (lines > 5) setNeedsPopup(true);
        }
    }, [description]);

    return (
        <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-center py-6 border-b border-slate-200">
                <div>
                    <h2 className="text-xl font-semibold mb-1">{title}</h2>
                    <p className="text-slate-500">{subtitle}</p>
                </div>
                <div
                    className="bg-center bg-cover rounded-full h-14 w-14 border border-slate-200"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCll1WbBJ4WI7cUN_WpLkkhIpq6OU3LynAzcTtVe3s769F5dbHZYqqFbgl0P5gGzA2dlUtz1tTJ62rqKPV_F0tQEDBxI1AN1JOaX00jvRR8h4UYttxQXrCaoCbdcY6eUn03HPJ-CZ92OJQpit3aGai0kZnw5EETG6f1EXRdw5OxOHgzjMJ7Y2JghbwtO4RK8TXqpcjVgVWm-my4CZtIaqtnXgr0rw04tHGzRNp5vHxc5K0B0CCWKYTfHTj3M9DPjJ6JLdTXsOp9Bsg")' }}
                ></div>
            </div>

            <div className="flex flex-wrap gap-3">
                {verified && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-blue-50 text-blue-700 border-blue-100">
                        <span className="material-symbols-outlined text-lg">verified</span>
                        <span className="text-sm font-medium">Verified</span>
                    </div>
                )}
                {highly_rated && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-yellow-50 text-yellow-700 border-yellow-100">
                        <span className="material-symbols-outlined text-lg">star</span>
                        <span className="text-sm font-medium">Highly Rated</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                    <span className="text-xs text-slate-500">Type</span>
                    <p className="font-medium capitalize">{vehicle_type}</p>
                </div>
                <div>
                    <span className="text-xs text-slate-500">Seats</span>
                    <p className="font-medium">{no_of_seats}</p>
                </div>
                <div>
                    <span className="text-xs text-slate-500">Fuel</span>
                    <p className="font-medium capitalize">{fuel_type}</p>
                </div>
                <div>
                    <span className="text-xs text-slate-500">Transmission</span>
                    <p className="font-medium capitalize">{transmission}</p>
                </div>
                <div>
                    <span className="text-xs text-slate-500">AC</span>
                    <p className="font-medium">{air_conditioning ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    <span className="text-xs text-slate-500">Reg No.</span>
                    <p className="font-medium text-sm">{registration_number}</p>
                </div>
            </div>

            {description && (
                <div>
                    <h3 className="text-xl font-bold mb-4">About this vehicle</h3>
                    <div
                        ref={descRef}
                        className={`prose prose-slate max-w-none text-slate-600 ${needsPopup ? 'line-clamp-5 overflow-hidden' : ''
                            }`}
                    >
                        <p>{description}</p>
                    </div>

                    {needsPopup && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-1 mt-2 font-semibold text-slate-900 hover:text-primary transition-colors"
                        >
                            Show more
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    )}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 md:items-center">
                    <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-xl">
                        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">About this vehicle</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-full"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 max-h-[400px] overflow-y-auto prose prose-slate text-slate-600">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyInfo;