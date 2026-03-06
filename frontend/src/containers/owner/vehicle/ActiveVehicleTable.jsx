import React, { useState } from 'react';
import { buildPhotoUrl } from '../../../utils/photoUtils'

const ActiveVehicleTable = ({ vehicles, handleViewVehicle, handleEditClick, handleDeleteVehicle, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const vehicleTypes = ['All', ...new Set(vehicles.map(v => v.vehicle_type || v.type))];

    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = (vehicle.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.id?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'All' || (vehicle.vehicle_type || vehicle.type) === typeFilter;
        return matchesSearch && matchesType;
    });

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const paginatedVehicles = filteredVehicles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount).replace('LKR', 'LKR');
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg font-bold text-slate-900">Active Vehicles ({filteredVehicles.length})</h3>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
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

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full md:w-auto bg-white border border-slate-200 rounded-lg text-sm py-2 px-4 text-slate-900 focus:ring-primary focus:border-primary focus:outline-none transition duration-200 ease-in-out"
                    >
                        {vehicleTypes.map(type => (
                            <option key={type} value={type}>Type: {type}</option>
                        ))}
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
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center">
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
                                            <p className="text-[10px] text-slate-400">{vehicle.year} • {vehicle.mileage || 'N/A'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-slate-600">{vehicle.vehicle_type || vehicle.type}</p>
                                    <p className="text-[10px] text-slate-400">{vehicle.address?.city || vehicle.location}</p>
                                    <p className="text-[10px] text-slate-400">{vehicle.no_of_seats || vehicle.seats} seats • {vehicle.transmission}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-green-600">{formatCurrency(vehicle.day_rent || vehicle.price)}</p>
                                    <p className="text-[10px] text-slate-400">per month</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                        {vehicle.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {vehicle.status === "booked" ? (
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium text-blue-600">Rented</span>
                                            {vehicle.reviews?.length > 0 && (
                                                <span className="text-[10px] text-slate-400">
                                                    Rating: {vehicle.reviews[0]?.rating}/5
                                                </span>
                                            )}
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
                                            onClick={() => handleDeleteVehicle(vehicle._id || vehicle.id)}
                                            className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-1.5 px-3 rounded-md uppercase tracking-wider transition-colors"
                                            title="Delete Vehicle"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!loading && filteredVehicles.length === 0 && (
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

            {filteredVehicles.length > 0 && (
                <div className="px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <div>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} vehicles
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`size-8 rounded ${currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-slate-50'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveVehicleTable;