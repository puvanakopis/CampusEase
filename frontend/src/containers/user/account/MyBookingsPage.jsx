import React, { useState } from "react";
import { buildPhotoUrl } from "../../../utils/photoUtils";

const MyBookingsPage = ({ bookings, loading, onStatusUpdate, onReviewSubmit }) => {

  const [selectedBookingForAction, setSelectedBookingForAction] = useState(null);
  const [actionType, setActionType] = useState(null); // 'cancel' or 'complete'

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const availableBookings = bookings.filter(b => b.status === "confirmed");
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

  const handleActionClick = (bookingId, action) => {
    const booking = bookings.find(b => b._id === bookingId);
    if (!booking) return;
    setSelectedBookingForAction(booking);
    setActionType(action);
    if (action === "complete") {
      setReviewRating(5);
      setReviewComment("");
    }
  };

  const closeModals = () => {
    setSelectedBookingForAction(null);
    setActionType(null);
    setReviewRating(5);
    setReviewComment("");
    setIsSubmitting(false);
  };

  const handleConfirmAction = async () => {
    if (!selectedBookingForAction) return;

    setIsSubmitting(true);
    try {
      if (actionType === "cancel") {
        await onStatusUpdate(selectedBookingForAction._id, "canceled");
      } else if (actionType === "complete") {
        const reviewData = {
          rating: reviewRating,
          message: reviewComment
        };
        await onReviewSubmit(selectedBookingForAction, reviewData);
      }
      closeModals();
    } catch (err) {
      console.error("Action failed:", err);
      setIsSubmitting(false);
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
                    onChange={(e) => {
                      if (e.target.value === "canceled") {
                        handleActionClick(booking._id, "cancel");
                      }
                    }}
                    className="border border-slate-200 rounded-lg px-2 py-1 text-sm bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="canceled">Cancel</option>
                  </select>
                )}

                {booking.status === "confirmed" && (
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value === "completed") {
                        handleActionClick(booking._id, "complete");
                      } else if (e.target.value === "canceled") {
                        handleActionClick(booking._id, "cancel");
                      }
                    }}
                    className="border border-slate-200 rounded-lg px-2 py-1 text-sm bg-white"
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
    <section className="pt-8">

      <div className="flex items-center gap-2 px-1">
        <span className="material-symbols-outlined text-primary text-lg">
          {icon}
        </span>

        <h2 className="text-lg font-bold text-slate-900 pb-4">{title}</h2>

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
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10">

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
        <div >
          {renderSection("Pending Bookings", "pending_actions", pendingBookings)}
          {renderSection("Available Bookings", "event_upcoming", availableBookings)}
          {renderSection("Completed Bookings", "history", completedBookings)}
          {renderSection("Canceled Bookings", "cancel", canceledBookings)}
        </div>
      )}

      {/* Action Modals */}
      {selectedBookingForAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">

            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">
                {actionType === "cancel" ? "Cancel Booking" : "Complete & Review"}
              </h3>
              <button onClick={closeModals} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              {actionType === "cancel" && (
                <p className="text-slate-600">
                  Are you sure you want to cancel the booking for <span className="font-semibold">{getResourceName(selectedBookingForAction)}</span>?
                  This action cannot be undone.
                </p>
              )}

              {actionType === "complete" && (
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    How was your experience with <span className="font-semibold">{getResourceName(selectedBookingForAction)}</span>? Please leave a review to complete this booking.
                  </p>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <span className={`material-symbols-outlined text-2xl ${star <= reviewRating ? "text-yellow-400 fill-current" : "text-slate-300"
                            }`}
                            style={{ fontVariationSettings: star <= reviewRating ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            star
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                    <textarea
                      id="review-comment"
                      rows={4}
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Share details of your experience..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={closeModals}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={isSubmitting || (actionType === "complete" && !reviewComment.trim())}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${actionType === "cancel"
                  ? "bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-600/20"
                  : "bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary/20"
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {actionType === "cancel" ? "Confirm Cancel" : "Submit & Complete"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookingsPage;