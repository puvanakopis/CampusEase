import React, { useState } from 'react';
import { buildPhotoUrl } from '../../../utils/photoUtils'

const PendingVehicleTable = ({ vehicles, handleViewVehicle, handleEditClick, handleDeleteVehicle, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredVehicles = vehicles.filter(vehicle => {
        return vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.id?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const paginatedVehicles = filteredVehicles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">Pending Vehicles ({filteredVehicles.length})</h3>
                <div className="relative w-full md:w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search vehicles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Vehicle</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Submission Info</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="flex justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedVehicles.map((vehicle) => (
                            <tr key={vehicle._id || vehicle.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                            <img
                                                src={buildPhotoUrl(vehicle.images[0].filename, "vehicle")}
                                                alt={vehicle.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{vehicle.name}</p>
                                            <p className="text-[10px] text-slate-400">ID: {vehicle._id || vehicle.id}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{vehicle.address?.city || vehicle.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-600">Type: {vehicle.vehicle_type || vehicle.type}</p>
                                        <p className="text-sm font-bold text-green-600">
                                            LKR {(vehicle.day_rent || vehicle.price || 0).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-slate-500">{vehicle.no_of_seats || vehicle.seats} seats • {vehicle.year}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-xs">
                                            <span className="text-slate-500">Submitted:</span>
                                            <span className="text-slate-700 ml-1">{formatDate(vehicle.created_at || vehicle.submittedDate)}</span>
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                        Pending Review
                                    </span>
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
                                                onClick={() => handleDeleteVehicle(vehicle._id || vehicle.id)}
                                                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 px-2 rounded-md uppercase tracking-wider transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!loading && filteredVehicles.length === 0 && (
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

            {filteredVehicles.length > 0 && (
                <div className="px-6 py-4 border-t border-slate-200 flex justify-between items-center text-sm text-slate-500">
                    <div>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} vehicles
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="size-8 rounded bg-primary text-white">1</button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingVehicleTable;