import React from 'react';

const PropertyInfo = ({ accommodation_type, no_of_rooms, no_of_beds, no_of_bathrooms, verified, highly_rated, description }) => {
    const title = `${accommodation_type} in Belihuloya`;
    const subtitle = `${no_of_rooms} bedroom${no_of_rooms > 1 ? 's' : ''} • ${no_of_beds} bed${no_of_beds > 1 ? 's' : ''} • ${no_of_bathrooms} private bath${no_of_bathrooms > 1 ? 's' : ''}`;

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
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border bg-blue-50 text-blue-700 border-blue-100`}
                    >
                        <span className="material-symbols-outlined text-lg">verified</span>
                        <span className="text-sm font-medium">Verified</span>
                    </div>
                )}
                {highly_rated &&(
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md border bg-yellow-50 text-yellow-700 border-yellow-100`}
                    >
                        <span className="material-symbols-outlined text-lg">star</span>
                        <span className="text-sm font-medium">Highly Rated</span>
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">About this place</h3>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-4">
                        {description}
                    </p>
                </div>
                <button
                    className="flex items-center gap-1 mt-2 font-semibold decoration-primary text-slate-900 hover:text-primary transition-colors"
                >
                    Show more
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default PropertyInfo;