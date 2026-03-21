import React, { useContext, useEffect, useState } from "react";
import { AccommodationContext } from "../../context/AccommodationContext";
import { VehicleContext } from "../../context/VehicleContext";
import { BookingContext } from "../../context/BookingContext";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/Loading";
import Heading from "../../containers/owner/common/Heading";
import StatsCards from "../../containers/owner/common/StatsCards";
import RevenueOverview from "../../containers/owner/dashboard/RevenueOverview";
import RecentBookings from "../../containers/owner/dashboard/RecentBookings";

const OwnerDashboard = () => {
  const { ownerAccommodations, fetchMyAccommodations, } = useContext(AccommodationContext);
  const { ownerVehicles, fetchMyVehicles } = useContext(VehicleContext);
  const { bookings, getOwnerBookings } = useContext(BookingContext);
  const { currentUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState([]);
  const [revenueData, setRevenueData] = useState({
    title: "Revenue Overview",
    subtitle: "Earnings from bookings",
    months: [],
    heights: [],
    values: [],
    lastBarHighlight: true,
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchMyAccommodations(),
          fetchMyVehicles(),
          currentUser._id && getOwnerBookings(currentUser._id)
        ]);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [currentUser._id]);

  useEffect(() => {
    if (!loading) {
      calculateStats();
      calculateRevenueData();
      getRecentBookings();
    }
  }, [ownerAccommodations, ownerVehicles, bookings, loading]);

  const calculateStats = () => {
    const totalProperties = ownerAccommodations.length + ownerVehicles.length;

    const availableBookings = bookings.filter(b =>
      b.status === "confirmed" || b.status === "completed"
    ).length;

    const totalRevenue = bookings
      .filter(b => b.status === "completed" || b.payment?.paid)
      .reduce((sum, booking) => sum + booking.total_price, 0);

    const currentMonth = new Date().getMonth();
    const newPropertiesThisMonth = [
      ...ownerAccommodations.filter(a => new Date(a.created_at).getMonth() === currentMonth),
      ...ownerVehicles.filter(v => new Date(v.created_at).getMonth() === currentMonth)
    ].length;

    setStatsData([
      {
        icon: "apartment",
        iconBg: "bg-blue-50",
        iconColor: "text-primary",
        label: "Total Properties",
        value: totalProperties.toString(),
        badgeText: newPropertiesThisMonth > 0 ? `+${newPropertiesThisMonth} this month` : "No new this month",
        badgeColor: newPropertiesThisMonth > 0 ? "text-green-600" : "text-slate-500",
        badgeBg: newPropertiesThisMonth > 0 ? "bg-green-50" : "bg-slate-50",
      },
      {
        icon: "book_online",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
        label: "Available Bookings",
        value: availableBookings.toString(),
        badgeText: bookings.length > 0 ? `${((availableBookings / bookings.length) * 100).toFixed(0)}% of total` : "No bookings",
        badgeColor: "text-orange-600",
        badgeBg: "bg-orange-50",
      },
      {
        icon: "payments",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        label: "Total Revenue (LKR)",
        value: totalRevenue.toLocaleString(),
        badgeText: `From ${bookings.length} bookings`,
        badgeColor: "text-green-600",
        badgeBg: "bg-green-50",
      }
    ]);
  };

  const calculateRevenueData = () => {
    const monthlyRevenue = {};
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const today = new Date();
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      last6Months.push({
        month: months[d.getMonth()],
        year: d.getFullYear(),
        monthIndex: d.getMonth()
      });
    }

    last6Months.forEach(monthData => {
      const monthBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.created_at);
        return bookingDate.getMonth() === monthData.monthIndex &&
          bookingDate.getFullYear() === monthData.year &&
          (booking.status === "completed" || booking.payment?.paid);
      });

      const total = monthBookings.reduce((sum, booking) => sum + booking.total_price, 0);
      monthlyRevenue[monthData.month] = total;
    });

    const maxRevenue = Math.max(...Object.values(monthlyRevenue), 1);

    setRevenueData({
      title: "Revenue Overview",
      subtitle: `Earnings from ${last6Months[0].month} - ${last6Months[5].month} ${last6Months[5].year}`,
      months: last6Months.map(m => m.month),
      heights: last6Months.map(m => {
        const revenue = monthlyRevenue[m.month] || 0;
        return `${Math.max((revenue / maxRevenue) * 100, 5)}%`;
      }),
      values: last6Months.map(m => {
        const revenue = monthlyRevenue[m.month] || 0;
        return revenue > 1000 ? `${(revenue / 1000).toFixed(1)}k` : revenue.toString();
      }),
      lastBarHighlight: true,
    });
  };

  const getRecentBookings = () => {
    const recent = [...bookings]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(booking => {
        let resourceName = "";
        let studentName = "";
        let initials = "";

        if (booking.booking_type === "accommodation" && booking.accommodation) {
          resourceName = booking.accommodation.name;
        } else if (booking.booking_type === "vehicle" && booking.vehicle) {
          resourceName = `${booking.vehicle.brand} ${booking.vehicle.model}`;
        }

        if (booking.user_id) {
          studentName = `Student ${booking.user_id.slice(-4)}`;
          initials = studentName.split(" ").map(n => n[0]).join("").toUpperCase();
        }

        const startDate = new Date(booking.start_date);
        const endDate = new Date(booking.end_date);
        const dateRange = `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

        let status = booking.status;
        let statusColor = "blue";

        if (status === "confirmed") {
          statusColor = "green";
          status = "Ongoing";
        } else if (status === "pending") {
          statusColor = "yellow";
          status = "Pending";
        } else if (status === "canceled") {
          statusColor = "red";
          status = "Canceled";
        } else if (status === "completed") {
          statusColor = "blue";
          status = "Completed";
        }

        return {
          name: studentName || "Unknown Student",
          initials: initials || "US",
          property: resourceName || "Unknown Property",
          range: dateRange,
          status: status,
          statusColor: statusColor,
          amount: booking.total_price
        };
      });

    setRecentBookings(recent);
  };


  if (loading && bookings.length === 0) {
    return <LoadingSpinner />;
  }


  return (
    <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
      <Heading
        title="Welcome to Your Dashboard"
        subtitle="Monitor and manage all your properties and bookings in one place."
      />
      <StatsCards stats={statsData} />
      <RevenueOverview revenueData={revenueData} />
      <RecentBookings bookings={recentBookings} />
    </main>
  );
};

export default OwnerDashboard;