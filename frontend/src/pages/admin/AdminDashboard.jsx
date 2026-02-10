import React from "react";
import AdminHeading from "../../containers/admin/dashboard/AdminHeading";
import AdminTopStats from "../../containers/admin/dashboard/AdminTopStats";

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

  return (
    <div className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
      <AdminHeading
        title="Admin Dashboard"
        subtitle="Manage users, properties, revenue and platform-wide operations."
      />
      <AdminTopStats stats={topStatsData} />
    </div>
  );
};

export default AdminDashboard;