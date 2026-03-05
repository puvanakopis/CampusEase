import React from 'react';

const LocationMap = ({ location, address, time_from_uni }) => {
    const { latitude, longitude } = location || {};

    const googleMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=lk&z=16&output=embed`;

    const nearbyLocations = [
        { name: "SUSL Main Gate", distance: time_from_uni?.susl_main_gate },
        { name: "Pambahinna Junction", distance: time_from_uni?.pambahinna_junction },
    ];

    return (
        <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold mb-2">Location in {address?.city}</h3>
            <p className="text-slate-500 mb-6">Walking distance to Sabaragamuwa University of Sri Lanka</p>

            <div className="w-full h-80 rounded-xl overflow-hidden relative group shadow">
                <iframe
                    src={googleMapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                ></iframe>

                {/* Marker overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-primary text-white p-3 rounded-full shadow-lg border-4 border-white">
                        <span className="material-symbols-outlined text-2xl">home_pin</span>
                    </div>
                </div>

                {/* University distance box */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <span className="material-symbols-outlined text-xl">school</span>
                        <span className="text-sm">SUSL Main Gate</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                        {time_from_uni?.susl_main_gate} walk
                    </div>
                </div>
            </div>

            {/* Nearby Locations */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
                {nearbyLocations.map((item, index) => (
                    <div key={index}>
                        <span className="font-semibold block text-slate-900">{item.name}</span>
                        {item.distance} walk 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationMap;