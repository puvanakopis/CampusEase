import jsPDF from "jspdf";

const generateReceipt = (booking) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Booking Receipt", 20, 20);

    doc.setFontSize(12);

    doc.text(`Booking Reference: ${booking.reference}`, 20, 40);
    doc.text(`Customer Name: ${booking.customer}`, 20, 50);
    doc.text(`Location: ${booking.location}`, 20, 60);
    doc.text(`Amount Paid: $${booking.amount}`, 20, 70);
    doc.text(`Payment Date: ${booking.date}`, 20, 80);

    doc.text("Thank you for your booking!", 20, 110);

    doc.save(`receipt-${booking.reference}.pdf`);
};

export default generateReceipt;