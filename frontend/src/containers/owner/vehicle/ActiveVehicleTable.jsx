import React from 'react';

const ActiveVehicleTable = ({ vehicles, handleViewVehicle, handleEditClick, handleDeleteVehicle }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Active Vehicles ({vehicles.length})</h3>
                <div className="flex items-center gap-3">
                    {/* Search Input */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* Type Filter */}
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out">
                        <option>Type: All</option>
                        <option>Car</option>
                        <option>Scooter</option>
                        <option>Motorcycle</option>
                        <option>Van</option>
                    </select>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type & Location</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rental Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/100x100?text=Vehicle";
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{vehicle.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {vehicle.id}</p>
                                            <p className="text-[10px] text-slate-400">{vehicle.year} • {vehicle.mileage}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600">{vehicle.type}</p>
                                    <p className="text-[10px] text-slate-400">{vehicle.location}</p>
                                    <p className="text-[10px] text-slate-400">{vehicle.seats} seats • {vehicle.transmission}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-green-600">LKR {vehicle.price.toLocaleString()}</p>
                                    <p className="text-[10px] text-slate-400">per month</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                        Active
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {vehicle.currentlyRented ? (
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-blue-600">Rented</span>
                                            <span className="text-[10px] text-slate-500">
                                                Until {vehicle.rentedUntil}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                To: {vehicle.rentedTo}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-xs font-medium text-green-600">Available</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleViewVehicle(vehicle)}
                                            className="bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="View Details"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleEditClick(vehicle)}
                                            className="bg-yellow-600 hover:bg-yellow-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Edit Vehicle"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteVehicle(vehicle.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Delete Vehicle"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {vehicles.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            directions_car
                                        </span>
                                        <p className="text-sm">No active vehicles found</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Add a new vehicle to get started
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
                <div>Showing {vehicles.length} of {vehicles.length} vehicles</div>
                <div className="flex items-center gap-2">
                    <button className="p-1 rounded border border-slate-200 hover:bg-slate-50">
                        <span className="material-symbols-outlined text-sm">chevron_left</span>
                    </button>
                    <button className="size-8 rounded bg-primary text-white">1</button>
                    <button className="p-1 rounded border border-slate-200 hover:bg-slate-50">
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActiveVehicleTable;