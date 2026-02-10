import React from 'react';

const Heading = ({ handleAddVehicleClick, userPermissions }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Vehicle Management</h1>
                <p className="text-slate-500 mt-1">Manage your transportation rentals around Sabaragamuwa University.</p>
            </div>
            <button
                onClick={handleAddVehicleClick}
                disabled={!userPermissions.canAdd}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all ${!userPermissions.canAdd ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-600'}`}
            >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Add New Vehicle
                {!userPermissions.canAdd && (
                    <span className="material-symbols-outlined text-sm ml-1" title="Vehicle limit reached">
                        warning
                    </span>
                )}
            </button>
        </div>
    );
};

export default Heading;