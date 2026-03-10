import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CURRENCY, PAYMENT } from "../../../constants/constants";

const BookingSuccessPopup = ({ booking }) => {
    const receiptRef = useRef();
    const navigate = useNavigate();

    const bookingReference = booking?._id;
    const bookingType = booking?.booking_type;
    const resource = bookingType === "vehicle" ? booking?.vehicle : booking?.accommodation;

    const resourceName =
        bookingType === "vehicle"
            ? `${resource?.brand || ""} ${resource?.model || ""}`
            : resource?.name || "Accommodation";

    const ownerName = `${booking?.owner?.first_name || ""} ${booking?.owner?.last_name || ""}`;

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const formatCurrency = (amount) => {
        return `${CURRENCY} ${amount?.toLocaleString() || "0"}`;
    };

    const calculateTotalWithFees = () => {
        if (!booking?.total_price) return 0;
        const serviceFee = booking.total_price * PAYMENT.SERVICE_FEE_RATE;
        const securityFee = PAYMENT.SECURITY_FEE;
        return booking.total_price + serviceFee + securityFee;
    };

    const handleDownload = async () => {
        try {
            toast.loading("Generating PDF...", { id: "pdf" });

            const element = receiptRef.current;
            if (!element) return;

            // Use html2canvas to capture the div
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");

            // Get actual div dimensions in pixels
            const divWidth = canvas.width;
            const divHeight = canvas.height;

            // Create a PDF using exact div width and height
            const pdf = new jsPDF({
                orientation: divWidth > divHeight ? "landscape" : "portrait",
                unit: "px",
                format: [divWidth, divHeight], // set PDF size same as div
            });

            pdf.addImage(imgData, "PNG", 0, 0, divWidth, divHeight);
            pdf.save(`receipt-${bookingReference}.pdf`);

            toast.success("Receipt downloaded", { id: "pdf" });
        } catch (err) {
            console.error(err);
            toast.error("PDF generation failed", { id: "pdf" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Booking Successful</h3>
                        <p className="text-xs text-slate-500 mt-1">Your booking has been confirmed</p>
                    </div>
                </div>

                {/* Receipt Content */}
                <div ref={receiptRef} className="px-6 py-4 space-y-4">
                    {/* Icon & Status */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
                            <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
                        </div>
                        <h2 className="text-xl font-bold">Booking Confirmed</h2>
                        <p className="text-sm text-slate-500">
                            Your {bookingType} reservation is successful
                        </p>
                    </div>

                    {/* Details */}
                    <div className="border rounded-xl p-5 text-left space-y-2">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase">Booking Reference</p>
                            <p className="font-mono font-bold">{bookingReference}</p>
                        </div>

                        <div className="flex justify-between">
                            <span>Resource</span>
                            <span className="font-medium">{resourceName}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Owner</span>
                            <span className="font-medium">{ownerName}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Start Date</span>
                            <span>{formatDate(booking?.start_date)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>End Date</span>
                            <span>{formatDate(booking?.end_date)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Duration</span>
                            <span>
                                {booking?.duration} {bookingType === "vehicle" ? "days" : "months"}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span>Status</span>
                            <span className="capitalize">{booking?.status}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Payment Method</span>
                            <span className="capitalize">
                                {booking?.payment?.method?.replace("_", " ")}
                            </span>
                        </div>

                        <div className="flex justify-between font-bold pt-2 border-t">
                            <span>Total Price</span>
                            <span className="text-primary">{formatCurrency(calculateTotalWithFees())}</span>
                        </div>
                    </div>

                    <p className="text-[9px] text-slate-400 mt-2 text-center">
                        This is an electronically generated receipt.
                    </p>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 px-6 py-4 border-t border-slate-200">
                    <button
                        onClick={handleDownload}
                        className="flex-1 border py-2 rounded-lg text-sm"
                    >
                        Download Receipt
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
                    >
                        Go Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccessPopup;