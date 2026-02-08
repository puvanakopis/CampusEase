import React from 'react';

const LocationMap = () => {
    const locations = [
        { name: 'SUSL Main Gate', distance: '10 min walk (800m)' },
        { name: 'Belihuloya Town', distance: '5 min by bus/tuk-tuk' },
        { name: 'Pambahinna Junction', distance: '15 min walk' }
    ];

    return (
        <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xl font-bold mb-2">Location in Belihuloya</h3>
            <p className="text-slate-500 mb-6">Walking distance to Sabaragamuwa University of Sri Lanka</p>

            <div className="w-full h-80 rounded-xl bg-slate-200 overflow-hidden relative group">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBr0WTSK4jeNlSatbcZnAFAWeTILWxXsvYC5G-UYAscN1vNPf94bdopuzVTyRmMHCaAy7W75JRF3kI7wbuoYZKVpvvJ-9DUOampwFL08TSpwoSHHSrEipMtQ0SMTEbzoVLCa84dH-dZ_2zXyC_PuxVGmUmwhS7l5QNDKoDy7lbnk5MOIza0AEX_VSzPnzALhTNTvDgTsunQRszsoe_HUxjwJQEPupXk7kg6vAppCls_YqAZl6k-_fHzrgRPIW3d_O5jKLBCCMzQThU")',
                        filter: 'contrast(1.1) saturate(0.8)'
                    }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary text-white p-3 rounded-full shadow-lg border-4 border-white">
                        <span className="material-symbols-outlined text-2xl">home_pin</span>
                    </div>
                </div>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <span className="material-symbols-outlined text-xl font-bold">school</span>
                        <span className="text-sm">SUSL Main Gate</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">800m • 10 min walk</div>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
                {locations.map((location, index) => (
                    <div key={index}>
                        <span className="font-semibold block text-slate-900">{location.name}</span>
                        {location.distance}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationMap;