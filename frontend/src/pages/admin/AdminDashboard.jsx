import React, { useContext, useEffect, useState } from "react";
import AdminHeading from "../../containers/admin/common/Heading";
import AdminTopStats from "../../containers/admin/dashboard/AdminTopStats";
import AdminRevenueOverview from "../../containers/admin/dashboard/AdminRevenueOverview";
import AdminRecentActivities from "../../containers/admin/dashboard/AdminRecentActivities";
import { UserContext } from "../../context/UserContext";
import { OwnerContext } from "../../context/OwnerContext";
import { AccommodationContext } from "../../context/AccommodationContext";
import { VehicleContext } from "../../context/VehicleContext";
import { BookingContext } from "../../context/BookingContext";

const AdminDashboard = () => {
  const { users, fetchUsers } = useContext(UserContext);
  const { owners, fetchOwners } = useContext(OwnerContext);
  const { accommodations, fetchAccommodations } = useContext(AccommodationContext);
  const { vehicles, fetchVehicles } = useContext(VehicleContext);
  const { bookings, getAllBookings } = useContext(BookingContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchUsers(),
          fetchOwners(),
          fetchAccommodations(),
          fetchVehicles(),
          getAllBookings()
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);


  const recentBookings = bookings?.slice(0, 5) || [];

  const topStatsData = [
    {
      icon: "supervisor_account",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      label: "Users",
      value: users.length,
      badgeText: `${users.filter(u => u.status === "pending").length} Pending`,
      badgeColor: "text-blue-600",
      badgeBg: "bg-blue-50",
    },
    {
      icon: "apartment",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      label: "Accommodations",
      value: accommodations.length,
      badgeText: `${accommodations.filter(a => a.status === "pending").length} Pending`,
      badgeColor: "text-orange-600",
      badgeBg: "bg-orange-50",
    },
    {
      icon: "directions_car",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      label: "Vehicles",
      value: vehicles.length,
      badgeText: `${vehicles.filter(v => v.status === "pending").length} Pending`,
      badgeColor: "text-purple-600",
      badgeBg: "bg-purple-50",
    },
    {
      icon: "person",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      label: "Owners",
      value: owners.length,
      badgeText: `${owners.filter(o => o.status === "pending").length} Pending`,
      badgeColor: "text-red-600",
      badgeBg: "bg-red-50",
    },
  ];

  const getMonthlyRevenue = () => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const currentMonth = new Date().getMonth();
    const last6Months = [];
    const monthlyValues = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push(months[monthIndex]);

      const monthBookings = bookings?.filter(booking => {
        const bookingDate = new Date(booking.created_at);
        return bookingDate.getMonth() === monthIndex;
      }) || [];

      const monthRevenue = monthBookings.reduce((sum, booking) => sum + (booking.total_price || 0), 0);
      monthlyValues.push(monthRevenue);
    }

    return { months: last6Months, values: monthlyValues };
  };

  const monthlyData = getMonthlyRevenue();

  const maxRevenue = Math.max(...monthlyData.values, 1);
  const heights = monthlyData.values.map(value =>
    `${Math.max((value / maxRevenue) * 92, 10)}%`
  );

  const formattedValues = monthlyData.values.map(value =>
    value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` :
      value >= 1000 ? `${(value / 1000).toFixed(0)}K` :
        value.toString()
  );

  const revenueData = {
    title: "Platform Revenue Overview",
    subtitle: `Earnings from ${monthlyData.months[0]} - ${monthlyData.months[monthlyData.months.length - 1]} ${new Date().getFullYear()}`,
    months: monthlyData.months,
    heights: heights,
    values: formattedValues,
    lastBarHighlight: true,
  };

  const activitiesData = recentBookings.map(booking => {
    const getUserName = () => {
      if (booking.booking_type === "accommodation" && booking?.owner) {
        return `Owner – ${booking.owner.first_name}`;
      } else if (booking.booking_type === "vehicle" && booking?.owner) {
        return `Owner – ${booking.owner.first_name}`;
      }
      return "System";
    };

    const getAction = () => {
      return `New ${booking.booking_type} booking`;
    };

    const getDetail = () => {
      if (booking.booking_type === "accommodation" && booking.accommodation) {
        return booking.accommodation.name;
      } else if (booking.booking_type === "vehicle" && booking.vehicle) {
        return `${booking.vehicle.brand} ${booking.vehicle.model}`;
      }
      return "Booking";
    };

    const getStatusColor = () => {
      switch (booking.status) {
        case "confirmed": return "green";
        case "pending": return "blue";
        case "canceled": return "red";
        case "completed": return "green";
        default: return "blue";
      }
    };

    return {
      user: getUserName(),
      action: getAction(),
      detail: getDetail(),
      status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
      color: getStatusColor(),
      bookingId: booking.id,
      total_price: booking.total_price,
      start_date: new Date(booking.start_date).toLocaleDateString()
    };
  });

  if (loading) {
    return (
      <div className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
        <AdminHeading
          title="Admin Dashboard"
          subtitle="Loading dashboard data..."
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
      <AdminHeading
        title="Admin Dashboard"
        subtitle="Manage users, properties, revenue and platform-wide operations."
      />
      <AdminTopStats stats={topStatsData} />
      <AdminRevenueOverview revenueData={revenueData} />
      <AdminRecentActivities activities={activitiesData} />
    </div>
  );
};

export default AdminDashboard;