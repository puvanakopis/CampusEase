import React, { useState, useContext, useEffect, useMemo } from "react";
import { UserContext } from "../../context/UserContext";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import UserTable from "../../containers/admin/user/UserTable";
import UserRequestsTable from "../../containers/admin/user/UserRequestsTable";
import ViewUserPopup from "../../containers/admin/user/ViewUserPopup";
import StatusChangePopup from "../../containers/admin/user/StatusChangePopup";
import RejectPopup from "../../containers/admin/user/RejectPopup";
import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";
import toast from "react-hot-toast";

const AdminUserManagement = () => {
    const { users, fetchUsers, updateUser, loading } = useContext(UserContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [userToChangeStatus, setUserToChangeStatus] = useState(null);
    const [showRejectPopup, setShowRejectPopup] = useState(false);
    const [requestToReject, setRequestToReject] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

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

    // Get current list based on active tab
    const getCurrentList = () => {
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

    const currentList = getCurrentList();
    const totalPages = Math.ceil(currentList.length / ADMIN_ITEMS_PER_PAGE);

    const paginatedList = useMemo(() => {
        const startIndex = (currentPage - 1) * ADMIN_ITEMS_PER_PAGE;
        const endIndex = startIndex + ADMIN_ITEMS_PER_PAGE;
        return currentList.slice(startIndex, endIndex);
    }, [currentList, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get item name for pagination based on active tab
    const getItemName = () => {
        switch (activeTab) {
            case "Active":
                return "active users";
            case "Inactive":
                return "inactive users";
            case "Pending Approval":
                return "pending users";
            case "Declined Approval":
                return "declined users";
            case "students":
                return "students";
            case "staff":
                return "staff";
            default:
                return "users";
        }
    };

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
            console.error(error);
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
            console.error(error);
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

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto">
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


            {activeTab == "all" && (
                <>
                    <UserTable
                        length={users.length}
                        title={"All Users"}
                        users={paginatedList}
                        onView={handleViewUser}
                        onToggleStatus={handleToggleUserStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab == "Active" && (
                <>
                    <UserTable
                        length={activeUsers.length}
                        title={"Active Users"}
                        users={paginatedList}
                        onView={handleViewUser}
                        onToggleStatus={handleToggleUserStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab == "Inactive" && (
                <>
                    <UserTable
                        length={inactiveUsers.length}
                        title={"Inactive Users"}
                        users={paginatedList}
                        onView={handleViewUser}
                        onToggleStatus={handleToggleUserStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab === "Pending Approval" && (
                <>
                    <UserRequestsTable
                        length={pendingUsers.length}
                        userRequests={paginatedList}
                        onViewRequest={handleViewUser}
                        onApproveRequest={handleApproveRequest}
                        onRejectRequest={handleRejectRequest}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={pendingUsers.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab == "Declined Approval" && (
                <>
                    <UserTable
                        length={declinedUsers.length}
                        title={"Declined Users"}
                        users={paginatedList}
                        onView={handleViewUser}
                        onToggleStatus={handleToggleUserStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab == "students" && (
                <>
                    <UserTable
                        length={studentUsers.length}
                        title={"Student Users"}
                        users={paginatedList}
                        onView={handleViewUser}
                        onToggleStatus={handleToggleUserStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}

            {activeTab == "staff" && (
                <>
                    <UserTable
                        length={staffUsers.length}
                        title={"Staff Users"}
                        users={paginatedList}
                        onView={handleViewUser}
                        onToggleStatus={handleToggleUserStatus}
                        isAdmin={true}
                    />
                    {currentList.length > ADMIN_ITEMS_PER_PAGE && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={currentList.length}
                            itemsPerPage={ADMIN_ITEMS_PER_PAGE}
                            onPageChange={handlePageChange}
                            itemName={getItemName()}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default AdminUserManagement;