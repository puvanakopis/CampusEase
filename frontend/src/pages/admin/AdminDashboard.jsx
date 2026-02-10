import React from "react";
import AdminHeading from "../../containers/admin/dashboard/AdminHeading";
import AdminTopStats from "../../containers/admin/dashboard/AdminTopStats";
import AdminRevenueOverview from "../../containers/admin/dashboard/AdminRevenueOverview";
import AdminRecentActivities from "../../containers/admin/dashboard/AdminRecentActivities";

const AdminDashboard = () => {
  const topStatsData = [
    {
      icon: "supervisor_account",
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      label: "Total Users",
      value: "1,245",
      badgeText: "+45 this month",
      badgeColor: "text-green-600",
      badgeBg: "bg-green-50",
    },
    {
      icon: "apartment",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      label: "Properties Listed",
      value: "342",
      badgeText: "+18 New",
      badgeColor: "text-orange-600",
      badgeBg: "bg-orange-50",
    },
    {
      icon: "payments",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      label: "Total Revenue (LKR)",
      value: "9.2M",
      badgeText: "+8% this month",
      badgeColor: "text-green-600",
      badgeBg: "bg-green-50",
    },
    {
      icon: "report_problem",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      label: "Pending Reports",
      value: "12",
      badgeText: "Resolve ASAP",
      badgeColor: "text-red-600",
      badgeBg: "bg-red-50",
    },
  ];

  const revenueData = {
    title: "Platform Revenue Overview",
    subtitle: "Earnings from Jan - Jun 2024",
    months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    heights: ["35%", "45%", "55%", "70%", "80%", "92%"],
    values: ["1.2M", "1.5M", "1.7M", "2.2M", "2.5M", "2.7M"],
    lastBarHighlight: true,
  };

  const activitiesData = [
    { user: "Owner – Nimal", action: "Created new listing", detail: "Hilltop Hostel", status: "Approved", color: "green" },
    { user: "Student – Dilan", action: "Report submitted", detail: "Noise issue", status: "Pending", color: "blue" },
    { user: "Owner – Priya", action: "Requested edit", detail: "Samanala View", status: "In Review", color: "orange" },
    { user: "System", action: "Auto-payment processed", detail: "Monthly payouts", status: "Success", color: "green" },
    { user: "Owner – Chamath", action: "Property removal", detail: "Campus Edge Single", status: "Completed", color: "green" },
  ];

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