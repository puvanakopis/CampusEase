import React, { useState } from "react";
import Heading from "../../containers/admin/Heading";
import StatsCards from "../../containers/admin/StatsCards";
import Tabs from "../../containers/admin/user/Tabs";
import UserTable from "../../containers/admin/user/UserTable";
import ViewUserPopup from "../../containers/admin/user/ViewUserPopup";
import StatusChangePopup from "../../containers/admin/user/StatusChangePopup";
import EditUserPopup from "../../containers/admin/user/EditUserPopup";

const AdminUser = () => {
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [userToChangeStatus, setUserToChangeStatus] = useState(null);
    const [showEditUser, setShowEditUser] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const [allUsers, setAllUsers] = useState([
        {
            id: "USR-001",
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "+94 77 123 4567",
            role: "Student",
            status: "Active",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
            registrationDate: "2023-01-15",
            lastLogin: "2024-10-20 14:30",
            totalBookings: 3,
            activeBookings: 2,
            totalSpent: 240000,
            studentId: "STU2023001",
            university: "University of Colombo",
            faculty: "Faculty of Science",
            year: "3rd Year",
            documents: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            preferences: {
                notifications: true,
                emailUpdates: true,
                smsAlerts: false
            },
            rating: 4.5,
            reviews: 12
        },
        {
            id: "USR-002",
            name: "Emma Johnson",
            email: "emma.j@example.com",
            phone: "+94 76 234 5678",
            role: "Student",
            status: "Active",
            profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
            registrationDate: "2023-02-10",
            lastLogin: "2024-10-18 09:15",
            totalBookings: 5,
            activeBookings: 1,
            totalSpent: 156000,
            studentId: "STU2023002",
            university: "University of Peradeniya",
            faculty: "Faculty of Arts",
            year: "2nd Year",
            documents: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            preferences: {
                notifications: true,
                emailUpdates: true,
                smsAlerts: true
            },
            rating: 4.2,
            reviews: 8
        },
        {
            id: "USR-003",
            name: "Michael Chen",
            email: "michael.chen@example.com",
            phone: "+94 71 345 6789",
            role: "Professional",
            status: "Inactive",
            profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
            registrationDate: "2023-03-05",
            lastLogin: "2024-09-15 11:45",
            totalBookings: 0,
            activeBookings: 0,
            totalSpent: 0,
            company: "Tech Solutions Ltd",
            designation: "Software Engineer",
            documents: {
                studentIdVerified: false,
                nicVerified: true,
                addressVerified: true
            },
            preferences: {
                notifications: false,
                emailUpdates: true,
                smsAlerts: false
            },
            rating: 0,
            reviews: 0
        },
        {
            id: "USR-004",
            name: "Sarah Williams",
            email: "sarah.w@example.com",
            phone: "+94 81 238 5000",
            role: "Student",
            status: "Suspended",
            profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
            registrationDate: "2022-08-01",
            lastLogin: "2024-08-22 16:20",
            totalBookings: 2,
            activeBookings: 0,
            totalSpent: 32000,
            studentId: "STU2022001",
            university: "University of Moratuwa",
            faculty: "Faculty of Engineering",
            year: "4th Year",
            documents: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: true
            },
            preferences: {
                notifications: true,
                emailUpdates: false,
                smsAlerts: true
            },
            rating: 3.8,
            reviews: 5,
            suspensionReason: "Multiple late payments and violation of booking policies"
        },
        {
            id: "USR-005",
            name: "David Brown",
            email: "david.b@example.com",
            phone: "+94 72 987 6543",
            role: "Student",
            status: "Active",
            profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
            registrationDate: "2023-05-20",
            lastLogin: "2024-10-22 08:10",
            totalBookings: 7,
            activeBookings: 3,
            totalSpent: 450000,
            studentId: "STU2023005",
            university: "University of Kelaniya",
            faculty: "Faculty of Commerce",
            year: "1st Year",
            documents: {
                studentIdVerified: true,
                nicVerified: true,
                addressVerified: false
            },
            preferences: {
                notifications: true,
                emailUpdates: true,
                smsAlerts: true
            },
            rating: 4.7,
            reviews: 15
        },
        {
            id: "USR-006",
            name: "Lisa Taylor",
            email: "lisa.t@example.com",
            phone: "+94 76 888 9999",
            role: "Professional",
            status: "Active",
            profileImage: "https://randomuser.me/api/portraits/women/28.jpg",
            registrationDate: "2023-07-12",
            lastLogin: "2024-10-21 19:30",
            totalBookings: 4,
            activeBookings: 1,
            totalSpent: 180000,
            company: "Finance Corp",
            designation: "Accountant",
            documents: {
                studentIdVerified: false,
                nicVerified: true,
                addressVerified: true
            },
            preferences: {
                notifications: true,
                emailUpdates: true,
                smsAlerts: false
            },
            rating: 4.3,
            reviews: 6
        }
    ]);

    const tabs = [
        { id: "all", label: "All Users", count: allUsers.length },
        { id: "students", label: "Students", count: allUsers.filter(u => u.role === "Student").length },
        { id: "professionals", label: "Professionals", count: allUsers.filter(u => u.role === "Professional").length },
        { id: "inactive", label: "Inactive/Suspended", count: allUsers.filter(u => u.status !== "Active").length }
    ];

    const stats = [
        {
            label: "Total Users",
            icon: "group",
            value: allUsers.length,
            subtext: `${allUsers.filter(u => u.status === "Active").length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Students",
            icon: "school",
            value: allUsers.filter(u => u.role === "Student").length,
            subtext: `${allUsers.filter(u => u.role === "Student" && u.status === "Active").length} active`,
            subtextColor: "text-blue-500"
        },
        {
            label: "Avg. User Rating",
            icon: "star",
            value: (allUsers.reduce((sum, user) => sum + user.rating, 0) / allUsers.filter(u => u.rating > 0).length || 0).toFixed(1),
            subtext: `${allUsers.filter(u => u.rating >= 4).length} users rated 4+`,
            subtextColor: "text-yellow-600"
        }
    ];

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewPopup(true);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user? This will also remove all their bookings and reviews.")) {
            setAllUsers(allUsers.filter(user => user.id !== userId));
        }
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setShowEditUser(true);
    };

    const handleUpdateUser = (updatedUser) => {
        setAllUsers(allUsers.map(user =>
            user.id === updatedUser.id ? updatedUser : user
        ));
        setShowEditUser(false);
        setUserToEdit(null);
        alert("User updated successfully!");
    };

    const handleToggleUserStatus = (userId, currentStatus) => {
        const user = allUsers.find(u => u.id === userId);
        if (!user) return;

        setUserToChangeStatus({ ...user, currentStatus });
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!userToChangeStatus) return;

        const newStatus = userToChangeStatus.currentStatus === "Active" ? "Suspended" : "Active";

        setAllUsers(allUsers.map(user =>
            user.id === userToChangeStatus.id ? {
                ...user,
                status: newStatus,
                lastLogin: new Date().toISOString().split('T')[0] + " " + new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                ...(newStatus === "Suspended" ? { suspensionReason: reason } : { suspensionReason: null })
            } : user
        ));

        alert(`User "${userToChangeStatus.name}" has been ${newStatus.toLowerCase()}.`);

        setShowStatusPopup(false);
        setUserToChangeStatus(null);
    };

    const getFilteredUsers = () => {
        switch (activeTab) {
            case "students":
                return allUsers.filter(user => user.role === "Student");
            case "professionals":
                return allUsers.filter(user => user.role === "Professional");
            case "inactive":
                return allUsers.filter(user => user.status !== "Active");
            default:
                return allUsers;
        }
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showViewPopup && selectedUser && (
                <ViewUserPopup
                    user={selectedUser}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedUser(null);
                    }}
                />
            )}

            {showStatusPopup && userToChangeStatus && (
                <StatusChangePopup
                    user={userToChangeStatus}
                    currentStatus={userToChangeStatus.currentStatus}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setUserToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            {showEditUser && userToEdit && (
                <EditUserPopup
                    user={userToEdit}
                    onClose={() => {
                        setShowEditUser(false);
                        setUserToEdit(null);
                    }}
                    onUpdate={handleUpdateUser}
                />
            )}

            <Heading
                title="User Management"
                subtitle="Manage system users, review accounts, and handle user profiles."
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <UserTable
                users={getFilteredUsers()}
                onView={handleViewUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleUserStatus}
            />
        </main>
    );
};

export default AdminUser;