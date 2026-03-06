import React from 'react';

const LocationMap = ({ address, location, time_from_uni }) => {
    const { latitude, longitude } = location || {};

    const googleMapUrl = latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}&hl=lk&z=16&output=embed`
        : null;

    const nearbyLocations = [
        { name: "SUSL Main Gate", distance: time_from_uni?.susl_main_gate },
        { name: "Pambahinna Junction", distance: time_from_uni?.pambahinna_junction },
    ].filter(item => item.distance);

    return (
        <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold mb-2">Location in {address?.city || 'Belihuloya'}</h3>
            <p className="text-slate-500 mb-6">Pickup location near Sabaragamuwa University of Sri Lanka</p>

            {googleMapUrl ? (
                <div className="w-full h-80 rounded-xl overflow-hidden relative group shadow">
                    <iframe
                        src={googleMapUrl}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        title="Vehicle location map"
                    ></iframe>

                    {/* Marker overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-primary text-white p-3 rounded-full shadow-lg border-4 border-white">
                            <span className="material-symbols-outlined text-2xl">directions_car</span>
                        </div>
                    </div>

                    {/* University distance box */}
                    {time_from_uni?.susl_main_gate && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-slate-200">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <span className="material-symbols-outlined text-xl">school</span>
                                <span className="text-sm">SUSL Main Gate</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1">
                                {time_from_uni.susl_main_gate} away
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="w-full h-80 rounded-xl bg-slate-200 flex items-center justify-center">
                    <p className="text-slate-500">Map location not available</p>
                </div>
            )}

            {/* Nearby Locations */}
            {nearbyLocations.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
                    {nearbyLocations.map((item, index) => (
                        <div key={index}>
                            <span className="font-semibold block text-slate-900">{item.name}</span>
                            {item.distance} away
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationMap;