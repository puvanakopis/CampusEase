import React from 'react';

const AmenitiesList = () => {
    const amenities = [
        { icon: 'wifi', text: 'High-speed Wifi (LMS Ready)' },
        { icon: 'desk', text: 'Ergonomic Study Desk & Chair' },
        { icon: 'water_drop', text: '24/7 Water Supply' },
        { icon: 'local_laundry_service', text: 'Laundry Facilities' },
        { icon: 'kitchen', text: 'Small Pantry Area' },
        { icon: 'security', text: 'Safe Student Neighborhood' }
    ];

    return (
        <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold mb-6">What this place offers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-slate-700">
                        <span className="material-symbols-outlined text-2xl text-slate-400">{amenity.icon}</span>
                        <span>{amenity.text}</span>
                    </div>
                ))}
            </div>
            <button className="mt-8 border border-slate-900 rounded-lg px-6 py-3 font-medium hover:bg-slate-50 transition-colors">
                Show all 12 amenities
            </button>
        </div>
    );
};

export default AmenitiesList;