import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BookingSuccess = ({ booking }) => {
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
        return `LKR ${amount?.toLocaleString() || "0"}`;
    };

    const handleDownload = async () => {
        try {
            toast.loading("Generating PDF...", { id: "pdf" });

            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();

            const imgWidth = pdfWidth - 80;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 40, 40, imgWidth, imgHeight);
            pdf.save(`receipt-${bookingReference}.pdf`);

            toast.success("Receipt downloaded", { id: "pdf" });
        } catch (err) {
            console.error(err);
            toast.error("PDF generation failed", { id: "pdf" });
        }
    };

    return (
        <div className="flex flex-col items-center text-center">

            <div ref={receiptRef} className="w-full bg-white p-6 rounded-xl">

                {/* HEADER */}
                <div className="mb-4 pb-4 border-b">
                    <h3 className="text-sm font-bold text-primary">
                        Sabaragamuwa University
                    </h3>
                    <p className="text-[10px] text-slate-400">
                        Booking Confirmation Receipt
                    </p>
                </div>

                {/* ICON */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-green-600 text-5xl">
                        check_circle
                    </span>
                </div>

                <h2 className="text-xl font-bold mb-1">
                    Booking Confirmed
                </h2>

                <p className="text-sm text-slate-500 mb-5">
                    Your {bookingType} reservation is successful
                </p>

                {/* DETAILS */}
                <div className="border rounded-xl p-5 text-left space-y-2">

                    <div>
                        <p className="text-[10px] text-slate-400 uppercase">
                            Booking Reference
                        </p>
                        <p className="font-mono font-bold">
                            {bookingReference}
                        </p>
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
                            {booking?.duration}{" "}
                            {bookingType === "vehicle" ? "days" : "months"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Status</span>
                        <span className="capitalize">
                            {booking?.status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Payment Method</span>
                        <span className="capitalize">
                            {booking?.payment?.method?.replace("_", " ")}
                        </span>
                    </div>

                    <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total Price</span>
                        <span className="text-primary">
                            {formatCurrency(booking?.total_price)}
                        </span>
                    </div>

                </div>

                <p className="text-[9px] text-slate-400 mt-4 text-center">
                    This is an electronically generated receipt.
                </p>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 w-full mt-4">

                <button
                    onClick={handleDownload}
                    className="flex-1 border py-2 rounded-lg text-sm"
                >
                    Download Receipt
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
                >
                    Go Dashboard
                </button>

            </div>

        </div>
    );
};

export default BookingSuccess;