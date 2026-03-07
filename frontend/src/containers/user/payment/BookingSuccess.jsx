import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
    const receiptRef = useRef();
    const navigate = useNavigate();

    const bookingReference = "SUSL-7829-XQ";

    const handleDownload = async () => {
        const element = receiptRef.current;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4"
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth - 80; // 40px margin on each side
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Center vertically
            const yOffset = (pdfHeight - imgHeight) / 2;

            pdf.addImage(imgData, "PNG", 40, yOffset, imgWidth, imgHeight);
            pdf.save(`receipt-${bookingReference}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    const goDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex flex-col items-center text-center">

            {/* RECEIPT AREA (PDF captures this) */}
            <div ref={receiptRef} className="w-full bg-white p-6 rounded-xl">

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-green-600 text-5xl">
                        check_circle
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                    Booking Confirmed!
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-slate-500 mb-5">
                    Your reservation at Sabaragamuwa University is all set.
                </p>

                {/* Booking Details */}
                <div className="w-full bg-white border border-slate-200 rounded-xl p-5 mb-5">
                    <p className="text-[10px] uppercase tracking-wider font-medium text-slate-400 mb-1">
                        Booking Reference
                    </p>
                    <p className="text-base font-bold text-slate-900 font-mono">
                        {bookingReference}
                    </p>

                    {/* Additional booking details can be added here */}
                    <div className="mt-4 text-left">
                        <p className="text-xs text-slate-600">Check-in: May 15, 2024</p>
                        <p className="text-xs text-slate-600">Check-out: May 17, 2024</p>
                        <p className="text-xs text-slate-600">Guests: 2 Adults</p>
                        <p className="text-xs text-slate-600 font-medium mt-2">Total: $299.00</p>
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">

                <button
                    onClick={handleDownload}
                    className="flex-1 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs flex items-center justify-center gap-1.5"
                >
                    <span className="material-symbols-outlined text-sm">
                        download
                    </span>
                    Download Receipt
                </button>

                <button
                    onClick={goDashboard}
                    className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors text-xs flex items-center justify-center gap-1.5"
                >
                    Go to Dashboard
                    <span className="material-symbols-outlined text-sm">
                        arrow_forward
                    </span>
                </button>

            </div>
        </div>
    );
};

export default BookingSuccess;