import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const MyBookingsPage = ({ bookings, loading, onStatusUpdate }) => {

  const activeBookings = bookings.filter(b => b.status === "confirmed");
  const completedBookings = bookings.filter(b => b.status === "completed");
  const canceledBookings = bookings.filter(b => b.status === "canceled"); // New

  const getResourceImage = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      return booking.vehicle.images?.[0]?.filename || null;
    } else if (booking.booking_type === "accommodation" && booking.accommodation) {
      return booking.accommodation.images?.[0]?.filename || null;
    }
    return null;
  };

  const getResourceName = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      return booking.vehicle.name || "Vehicle";
    } else if (booking.booking_type === "accommodation" && booking.accommodation) {
      return booking.accommodation.name || "Accommodation";
    }
    return "Unknown";
  };

  const getResourceAddress = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      const addr = booking.vehicle.address;
      return addr ? `${addr.street}, ${addr.city}` : "Address not available";
    } else if (booking.booking_type === "accommodation" && booking.accommodation) {
      const addr = booking.accommodation.address;
      return addr ? `${addr.street}, ${addr.city}` : "Address not available";
    }
    return "Address not available";
  };

  const getVehicleDetails = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      return `${booking.vehicle.brand} ${booking.vehicle.model} (${booking.vehicle.year})`;
    }
    return null;
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-sm text-slate-500">
          Manage your active stays and transport schedules.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Active Bookings */}
      {!loading && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-lg">event_upcoming</span>
            <h2 className="text-lg font-bold text-slate-900">Active Bookings</h2>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {activeBookings.length}
            </span>
          </div>

          {activeBookings.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">event_busy</span>
              <p className="text-slate-500">No active bookings found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeBookings.map(booking => {
                const imageFilename = getResourceImage(booking);
                const resourceName = getResourceName(booking);
                const imageUrl = buildPhotoUrl(imageFilename, booking.booking_type, resourceName);
                const vehicleDetails = getVehicleDetails(booking);

                return (
                  <div key={booking._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                      {imageUrl ? (
                        <img
                          alt={resourceName}
                          className="h-full w-full object-cover"
                          src={imageUrl}
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200 flex items-center justify-center">
                          <span className="material-symbols-outlined text-4xl text-slate-400">
                            {booking.booking_type === "vehicle" ? "directions_car" : "home"}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        {booking.booking_type === "vehicle" ? "Vehicle" : "Accommodation"}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-base font-bold text-slate-900">{resourceName}</h3>
                            {vehicleDetails && (
                              <p className="text-xs text-slate-500 mt-0.5">{vehicleDetails}</p>
                            )}
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-green-100 text-green-700"}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">
                          {booking.booking_type === "vehicle" ? (
                            <>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Rental: {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                Duration: {booking.duration} days
                              </p>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                Pickup: {getResourceAddress(booking)}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">payments</span>
                                Price: LKR {booking.total_price?.toLocaleString()}
                                {booking.payment?.paid && (
                                  <span className="text-green-600 text-xs ml-2">(Paid)</span>
                                )}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Check-in: {new Date(booking.start_date).toLocaleDateString()}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                Check-out: {new Date(booking.end_date).toLocaleDateString()}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">location_on</span>
                                {getResourceAddress(booking)}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">payments</span>
                                Price: LKR {booking.total_price?.toLocaleString()}
                                {booking.payment?.paid && (
                                  <span className="text-green-600 text-xs ml-2">(Paid)</span>
                                )}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        {booking.status !== "completed" && (
                          <select
                            value={booking.status}
                            onChange={e => onStatusUpdate(booking._id, e.target.value)}
                            className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="">Select Status</option>
                            <option value="canceled">Canceled</option>
                            <option value="completed">Completed</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Completed Bookings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-primary text-lg">history</span>
          <h2 className="text-lg font-bold text-slate-900">Completed Bookings</h2>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {completedBookings.length}
          </span>
        </div>

        {completedBookings.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">history_toggle_off</span>
            <p className="text-slate-500">No completed bookings yet</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location/Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedBookings.map(booking => {
                    const resourceName = getResourceName(booking);
                    const vehicleDetails = getVehicleDetails(booking);

                    return (
                      <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-sm">
                                {booking.booking_type === "vehicle" ? "directions_car" : "home_work"}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{resourceName}</div>
                              {vehicleDetails && (
                                <div className="text-xs text-slate-500">{vehicleDetails}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                          {new Date(booking.start_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                          {getResourceAddress(booking)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                          LKR {booking.total_price?.toLocaleString()}
                          {booking.payment?.paid && (
                            <span className="text-green-600 text-xs ml-2">(Paid)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => onStatusUpdate(booking._id, "confirmed")}
                              className="text-primary hover:text-primary/80 text-xs font-medium"
                            >
                              Rebook
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Canceled Bookings */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-primary text-lg">cancel</span>
          <h2 className="text-lg font-bold text-slate-900">Canceled Bookings</h2>
          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {canceledBookings.length}
          </span>
        </div>

        {canceledBookings.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">cancel_schedule_send</span>
            <p className="text-slate-500">No canceled bookings yet</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location/Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {canceledBookings.map(booking => {
                    const resourceName = getResourceName(booking);
                    const vehicleDetails = getVehicleDetails(booking);

                    return (
                      <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                              <span className="material-symbols-outlined text-sm">
                                {booking.booking_type === "vehicle" ? "directions_car" : "home_work"}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{resourceName}</div>
                              {vehicleDetails && (
                                <div className="text-xs text-slate-500">{vehicleDetails}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                          {new Date(booking.start_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">
                          {getResourceAddress(booking)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                          LKR {booking.total_price?.toLocaleString()}
                          {booking.payment?.paid && (
                            <span className="text-green-600 text-xs ml-2">(Paid)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => onStatusUpdate(booking._id, "confirmed")}
                              className="text-primary hover:text-primary/80 text-xs font-medium"
                            >
                              Rebook
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBookingsPage;