import React from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const MyBookingsPage = ({ bookings, loading, onStatusUpdate }) => {

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const activeBookings = bookings.filter(b => b.status === "confirmed");
  const completedBookings = bookings.filter(b => b.status === "completed");
  const canceledBookings = bookings.filter(b => b.status === "canceled");

  const getResourceImage = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      return booking.vehicle.images?.[0]?.filename || null;
    }
    if (booking.booking_type === "accommodation" && booking.accommodation) {
      return booking.accommodation.images?.[0]?.filename || null;
    }
    return null;
  };

  const getResourceName = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      return booking.vehicle.name || "Vehicle";
    }
    if (booking.booking_type === "accommodation" && booking.accommodation) {
      return booking.accommodation.name || "Accommodation";
    }
    return "Unknown";
  };

  const getResourceAddress = (booking) => {
    if (booking.booking_type === "vehicle" && booking.vehicle) {
      const addr = booking.vehicle.address;
      return addr ? `${addr.street}, ${addr.city}` : "Address not available";
    }
    if (booking.booking_type === "accommodation" && booking.accommodation) {
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const renderBookingCards = (list) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {list.map((booking) => {

        const imageFilename = getResourceImage(booking);
        const resourceName = getResourceName(booking);
        const imageUrl = buildPhotoUrl(
          imageFilename,
          booking.booking_type,
          resourceName
        );
        const vehicleDetails = getVehicleDetails(booking);

        return (
          <div
            key={booking._id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row"
          >

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
                    {booking.booking_type === "vehicle"
                      ? "directions_car"
                      : "home"}
                  </span>
                </div>
              )}

              <div
                className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getStatusBadge(
                  booking.status
                )}`}
              >
                {booking.status}
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">

              <div>

                <div className="flex justify-between items-start mb-2">

                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {resourceName}
                    </h3>

                    {vehicleDetails && (
                      <p className="text-xs text-slate-500 mt-0.5">
                        {vehicleDetails}
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-lg ${getStatusBadge(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">

                  <p className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">
                      calendar_today
                    </span>
                    {new Date(booking.start_date).toLocaleDateString()} -{" "}
                    {new Date(booking.end_date).toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    {getResourceAddress(booking)}
                  </p>

                  <p className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">
                      payments
                    </span>
                    LKR {booking.total_price?.toLocaleString()}
                    {booking.payment?.paid && (
                      <span className="text-green-600 text-xs ml-2">
                        (Paid)
                      </span>
                    )}
                  </p>

                </div>
              </div>

              <div className="flex justify-end gap-2">

                {booking.status === "pending" && (
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      onStatusUpdate(booking._id, e.target.value)
                    }
                    className="border border-slate-200 rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="canceled">Cancel</option>
                  </select>
                )}

                {booking.status === "confirmed" && (
                  <select
                    value=""
                    onChange={(e) =>
                      onStatusUpdate(booking._id, e.target.value)
                    }
                    className="border border-slate-200 rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="">Select Status</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Cancel</option>
                  </select>
                )}

                {(booking.status === "completed" ||
                  booking.status === "canceled") && (
                    <button
                      onClick={() =>
                        onStatusUpdate(booking._id, "confirmed")
                      }
                      className="text-primary text-sm font-medium"
                    >
                      Rebook
                    </button>
                  )}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSection = (title, icon, list) => (
    <section className="space-y-4">

      <div className="flex items-center gap-2 px-1">
        <span className="material-symbols-outlined text-primary text-lg">
          {icon}
        </span>

        <h2 className="text-lg font-bold text-slate-900">{title}</h2>

        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
          {list.length}
        </span>
      </div>

      {list.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">
            event_busy
          </span>
          <p className="text-slate-500">No bookings found</p>
        </div>
      ) : (
        renderBookingCards(list)
      )}
    </section>
  );

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 space-y-8">

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">
          My Bookings
        </h1>
        <p className="text-sm text-slate-500">
          Manage your stays and transport bookings.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {!loading && (
        <>
          {renderSection("Pending Bookings", "pending_actions", pendingBookings)}
          {renderSection("Active Bookings", "event_upcoming", activeBookings)}
          {renderSection("Completed Bookings", "history", completedBookings)}
          {renderSection("Canceled Bookings", "cancel", canceledBookings)}
        </>
      )}

    </div>
  );
};

export default MyBookingsPage;