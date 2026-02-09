import React from 'react';

const VehicleTable = ({ vehicles, handleViewVehicle, handleEditClick, handleDeleteVehicle }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">All Vehicles ({vehicles.length})</h3>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                        <input 
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                            placeholder="Search vehicles..." 
                            type="text" 
                        />
                    </div>
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <select className="bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                        <option>Type: All</option>
                        <option>Car</option>
                        <option>Scooter</option>
                        <option>Motorcycle</option>
                        <option>Van</option>
                    </select>
                </div>
            </div>
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
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${vehicle.status === "Active" ? "bg-green-100 text-green-800" : vehicle.status === "Inactive" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                                    {vehicle.status}
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
                                        className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors"
                                        title="View Details"
                                    >
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(vehicle)}
                                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                                        title="Edit Vehicle"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteVehicle(vehicle.id)}
                                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                                        title="Delete Vehicle"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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

export default VehicleTable;