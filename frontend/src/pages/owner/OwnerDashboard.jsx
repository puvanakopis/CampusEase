import React from "react";
import Heading from "../../containers/owner/Heading";
import TopStats from "../../containers/owner/dashboard/TopStats";
import RevenueOverview from "../../containers/owner/dashboard/RevenueOverview";
import RecentBookings from "../../containers/owner/dashboard/RecentBookings";

const OwnerDashboard = () => {
  const topStatsData = [
    {
      icon: "apartment",
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      label: "Total Properties",
      value: "08",
      badgeText: "+2 this month",
      badgeColor: "text-green-600",
      badgeBg: "bg-green-50",
    },
    {
      icon: "book_online",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      label: "Active Bookings",
      value: "24",
      badgeText: "High demand",
      badgeColor: "text-orange-600",
      badgeBg: "bg-orange-50",
    },
    {
      icon: "payments",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      label: "Total Revenue (LKR)",
      value: "142,500",
      badgeText: "+12% vs last mo",
      badgeColor: "text-green-600",
      badgeBg: "bg-green-50",
    },
    {
      icon: "grade",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
      label: "Average Rating",
      value: "4.8 / 5.0",
      badgeText: "18 reviews",
      badgeColor: "text-slate-600",
      badgeBg: "bg-slate-50",
    },
  ];

  const revenueData = {
    title: "Revenue Overview",
    subtitle: "Earnings from Jan - Jun 2024",
    months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    heights: ["40%", "55%", "45%", "70%", "85%", "95%"],
    values: ["18k", "22k", "20k", "28k", "32k", "35k"],
    lastBarHighlight: true,
  };

  const bookingsData = [
    { name: "Amara Silva", initials: "AS", property: "Riverview Annex", range: "Jun 10 - Dec 10", status: "Ongoing", statusColor: "green", amount: 8000 },
    { name: "Kasun Perera", initials: "KP", property: "Hilltop Hostel", range: "Jun 12 - Jul 12", status: "Pending", statusColor: "blue", amount: 6000 },
    { name: "Ruwan Madusanka", initials: "RM", property: "Samanala View", range: "Jun 15 - Aug 15", status: "Ongoing", statusColor: "green", amount: 25000 },
    { name: "Nimali Devindi", initials: "ND", property: "Riverview Annex", range: "Jun 18 - Dec 18", status: "Pending", statusColor: "blue", amount: 8000 },
    { name: "Sahan Tharaka", initials: "ST", property: "Campus Edge Single", range: "Jun 20 - Jul 20", status: "Ongoing", statusColor: "green", amount: 5000 },
  ];

  return (
    <div className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
      <Heading
        title="Welcome to Your Dashboard"
        subtitle="Monitor and manage all your properties and bookings in one place."
      />
      <TopStats stats={topStatsData} />
      <RevenueOverview revenueData={revenueData} />
      <RecentBookings bookings={bookingsData} />
    </div>
  );
};

export default OwnerDashboard;