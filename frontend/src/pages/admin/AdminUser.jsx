import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import UserTable from "../../containers/admin/user/UserTable";
import UserRequestsTable from "../../containers/admin/user/UserRequestsTable";
import ViewUserPopup from "../../containers/admin/user/ViewUserPopup";
import StatusChangePopup from "../../containers/admin/user/StatusChangePopup";
import RejectPopup from "../../containers/admin/user/RejectPopup";
import toast from "react-hot-toast";

const AdminUserManagement = () => {
    const { users, fetchUsers, updateUser, loading } = useContext(UserContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [userToChangeStatus, setUserToChangeStatus] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    // ------------------- FILTERS -------------------

    const allUsers = users;

    const activeUsers = users.filter(
        (u) => u.status === "Active"
    );

    const inactiveUsers = users.filter(
        (u) => u.status === "Inactive"
    );

    const pendingUsers = users.filter(
        (u) => u.status === "Pending Approval"
    );

    const declinedUsers = users.filter(
        (u) => u.status === "Declined Approval"
    );

    const studentUsers = users.filter(
        (u) => u.role === "student"
    );

    const staffUsers = users.filter(
        (u) => u.role === "staff"
    );

    // ------------------- TABS -------------------

    const tabs = [
        {
            id: "all",
            label: "All",
            count: users.length,
        },
        {
            id: "Active",
            label: "Active",
            count: activeUsers.length,
        },
        {
            id: "Inactive",
            label: "Inactive",
            count: inactiveUsers.length,
        },
        {
            id: "Pending Approval",
            label: "Pending Approval",
            count: pendingUsers.length,
        },
        {
            id: "Declined Approval",
            label: "Declined",
            count: declinedUsers.length,
        },
        {
            id: "students",
            label: "Students",
            count: studentUsers.length,
        },
        {
            id: "staff",
            label: "Staff",
            count: staffUsers.length,
        },
    ];

    // ------------------- STATS -------------------

    const stats = [
        {
            label: "Total Users",
            icon: "group",
            value: users.length,
            subtext: "Registered in system",
        },
        {
            label: "Pending Approvals",
            icon: "pending_actions",
            value: pendingUsers.length,
            subtext: "Awaiting review",
            subtextColor: "text-yellow-500",
        },
        {
            label: "Declined Users",
            icon: "cancel",
            value: declinedUsers.length,
            subtext: "Not approved",
            subtextColor: "text-red-500",
        }
    ];

    // ------------------- ACTION HANDLERS -------------------

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewPopup(true);
    };

    const handleApproveRequest = async (request) => {
        try {
            const updatePayload = {
                status: "Active",
                verified: true,
                decline_reason: null,
            };

            await updateUser(request._id, updatePayload);
            toast.success("User approved successfully");
            await fetchUsers();
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Approval failed");
        }
    };

    const handleRejectRequest = (request) => {
        setRequestToReject(request);
        setShowRejectPopup(true);
    };

    const handleConfirmReject = async (reason) => {
        if (!requestToReject) return;

        try {
            const updatePayload = {
                status: "Declined Approval",
                decline_reason: reason,
                verified: false,
            };

            await updateUser(requestToReject._id, updatePayload);
            toast.success("User request rejected");
            setShowRejectPopup(false);
            setRequestToReject(null);
            await fetchUsers();
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Reject failed");
        }
    };

    const handleToggleUserStatus = (user) => {
        setUserToChangeStatus(user);
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!userToChangeStatus) return;

        const newStatus = userToChangeStatus.status === "Active" ? "Inactive" : "Active";

        try {
            const updatePayload = {
                status: newStatus,
                decline_reason: newStatus === "Inactive" ? reason : null,
            };

            await updateUser(userToChangeStatus._id, updatePayload);
            toast.success(
                `User ${newStatus === "Active" ? "activated" : "deactivated"} successfully`
            );
            await fetchUsers();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Status update failed");
        } finally {
            setShowStatusPopup(false);
            setUserToChangeStatus(null);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading && users.length === 0) {
        return (
            <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-slate-600">
                            Loading users...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    const getDisplayUsers = () => {
        switch (activeTab) {
            case "Active":
                return activeUsers;
            case "Inactive":
                return inactiveUsers;
            case "Pending Approval":
                return pendingUsers;
            case "Declined Approval":
                return declinedUsers;
            case "students":
                return studentUsers;
            case "staff":
                return staffUsers;
            default:
                return allUsers;
        }
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">

            {showViewPopup && selectedUser && (
                <ViewUserPopup
                    user={selectedUser}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedUser(null);
                    }}
                    isAdmin={true}
                />
            )}

            {showStatusPopup && userToChangeStatus && (
                <StatusChangePopup
                    user={userToChangeStatus}
                    currentStatus={userToChangeStatus.status}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setUserToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            {showRejectPopup && requestToReject && (
                <RejectPopup
                    request={requestToReject}
                    onClose={() => {
                        setShowRejectPopup(false);
                        setRequestToReject(null);
                    }}
                    onConfirm={handleConfirmReject}
                />
            )}

            <Heading
                title="Admin User Management"
                subtitle="Manage system users and review new registration requests."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "Pending Approval" ? (
                <UserRequestsTable
                    userRequests={pendingUsers}
                    onViewRequest={handleViewUser}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            ) : (
                <UserTable
                    title={tabs.find(t => t.id === activeTab)?.label + " Users" || "All Users"}
                    users={getDisplayUsers()}
                    onView={handleViewUser}
                    onToggleStatus={handleToggleUserStatus}
                    isAdmin={true}
                />
            )}

        </main>
    );
};

export default AdminUserManagement;