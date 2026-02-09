import React from "react";

const PropertyTable = ({ properties, onView, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location & Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/100x100?text=Property";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{property.name}</p>
                                        <p className="text-[10px] text-slate-400">ID: {property.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-slate-600">{property.location}</p>
                                <p className="text-[10px] text-slate-400">{property.type}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm font-bold text-green-600">LKR {property.price.toLocaleString()}</p>
                                <p className="text-[10px] text-slate-400">per month</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${property.status === "Active" ? "bg-green-100 text-green-800" : property.status === "Inactive" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                                    {property.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => onView(property)}
                                        className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors"
                                        title="View Details"
                                    >
                                        <span className="material-symbols-outlined text-sm">visibility</span>
                                    </button>
                                    <button
                                        onClick={() => onEdit(property)}
                                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200 transition-colors"
                                        title="Edit Property"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button
                                        onClick={() => onDelete(property.id)}
                                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors"
                                        title="Delete Property"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PropertyTable;