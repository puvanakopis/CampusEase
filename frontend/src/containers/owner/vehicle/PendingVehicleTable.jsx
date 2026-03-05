import React from 'react';

const PendingVehicleTable = ({ vehicles, handleViewVehicle, handleEditClick, handleDeleteVehicle }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Pending Vehicles ({vehicles.length})</h3>
                <div className="flex items-center gap-3">
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
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Submission Info</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Notes</th>
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
                                            <p className="text-[10px] text-slate-500 mt-1">{vehicle.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-600">Type: {vehicle.type}</p>
                                        <p className="text-sm font-bold text-green-600">
                                            LKR {vehicle.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-slate-500">{vehicle.seats} seats • {vehicle.year}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-xs">
                                            <span className="text-slate-500">Submitted:</span>
                                            <span className="text-slate-700 ml-1">{vehicle.submittedDate}</span>
                                        </p>
                                        <p className="text-xs">
                                            <span className="text-slate-500">Expected:</span>
                                            <span className="text-slate-700 ml-1">{vehicle.expectedResponseDate}</span>
                                        </p>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                            Pending Review
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="bg-yellow-50 p-2 rounded-lg">
                                        <p className="text-xs text-yellow-700">
                                            <span className="font-medium">Note: </span>
                                            {vehicle.adminNotes}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2 items-center">
                                        <button
                                            onClick={() => handleViewVehicle(vehicle)}
                                            className="w-full bg-primary hover:bg-primary/80 text-white text-[10px] font-bold py-2 px-3 rounded-md uppercase tracking-wider transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => handleEditClick(vehicle)}
                                                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {vehicles.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">
                                            pending_actions
                                        </span>
                                        <p className="text-sm">No pending vehicles</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            All submissions have been processed
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingVehicleTable;