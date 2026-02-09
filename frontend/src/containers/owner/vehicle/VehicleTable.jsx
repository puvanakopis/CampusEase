import React from "react";

const VehicleTable = ({ vehicles }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-12">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            Vehicle
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            Location
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            Type
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            Price (LKR)
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                            Status
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 text-right">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                    {vehicles.map((vehicle) => (
                        <tr
                            key={vehicle.id}
                            className="hover:bg-slate-50 transition-colors"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        alt={vehicle.name}
                                        className="h-10 w-10 rounded-lg object-cover"
                                        src={vehicle.image}
                                    />
                                    <div>
                                        <div className="font-bold text-slate-900">
                                            {vehicle.name}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            ID: {vehicle.id}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-slate-600">
                                {vehicle.location}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded ${vehicle.type === "Car"
                                            ? "bg-blue-50 text-blue-600"
                                            : vehicle.type === "Scooter"
                                                ? "bg-purple-50 text-purple-600"
                                                : "bg-green-50 text-green-600"
                                        }`}
                                >
                                    {vehicle.type}
                                </span>
                            </td>

                            <td className="px-6 py-4 font-semibold text-slate-900">
                                {vehicle.price.toLocaleString()}
                                <span className="text-xs font-normal text-slate-500">
                                    /day
                                </span>
                            </td>

                            <td className="px-6 py-4">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        checked={vehicle.status === "Active"}
                                        type="checkbox"
                                        className="sr-only peer"
                                        readOnly
                                    />
                                    <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                                    <span className="ml-2 text-xs font-medium text-slate-500">
                                        {vehicle.status}
                                    </span>
                                </label>
                            </td>

                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                                        title="Edit"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            edit
                                        </span>
                                    </button>

                                    <button
                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            delete
                                        </span>
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

export default VehicleTable;