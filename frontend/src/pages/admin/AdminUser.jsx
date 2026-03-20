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
import LoadingSpinner from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination";
import { ADMIN_ITEMS_PER_PAGE } from "../../constants/pagination";
import toast from "react-hot-toast";

const AdminUserManagement = () => {
    const { users, fetchUsers, updateUser, loading } = useContext(UserContext);

    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [availableTab, setAvailableTab] = useState("all");
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
    }, [availableTab]);

    // ------------------- FILTERS -------------------
    const allUsers = users;

    const availableUsers = users.filter(
        (u) => u.status === "available"
    );

    const unavailableUsers = users.filter(
        (u) => u.status === "unavailable"
    );

    const pendingUsers = users.filter(
        (u) => u.status === "pending"
    );

    const rejectedUsers = users.filter(
        (u) => u.status === "rejected"
    );

    const studentUsers = users.filter(
        (u) => u.role === "student"
    );

    const staffUsers = users.filter(
        (u) => u.role === "staff"
    );

    // Get current list based on available tab
    const getCurrentList = () => {
        switch (availableTab) {
            case "available":
                return availableUsers;
            case "unavailable":
                return unavailableUsers;
            case "Pending Approval":
                return pendingUsers;
            case "rejected":
                return rejectedUsers;
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

    // Get item name for pagination based on available tab
    const getItemName = () => {
        switch (availableTab) {
            case "available":
                return "available users";
            case "unavailable":
                return "unavailable users";
            case "Pending Approval":
                return "pending users";
            case "rejected":
                return "rejected users";
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
            id: "available",
            label: "available",
            count: availableUsers.length,
        },
        {
            id: "unavailable",
            label: "unavailable",
            count: unavailableUsers.length,
        },
        {
            id: "Pending Approval",
            label: "Pending Approval",
            count: pendingUsers.length,
        },
        {
            id: "rejected",
            label: "Declined",
            count: rejectedUsers.length,
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
            value: rejectedUsers.length,
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
                status: "available",
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
                status: "rejected",
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

        const newStatus = userToChangeStatus.status === "available" ? "unavailable" : "available";

        try {
            const updatePayload = {
                status: newStatus,
                decline_reason: newStatus === "unavailable" ? reason : null,
            };

            await updateUser(userToChangeStatus._id, updatePayload);
            toast.success(
                `User ${newStatus === "available" ? "activated" : "deactivated"} successfully`
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

    if (loading) {
        return (
            <LoadingSpinner />
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
                availableTab={availableTab}
                onTabChange={setAvailableTab}
            />


            {availableTab == "all" && (
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

            {availableTab == "available" && (
                <>
                    <UserTable
                        length={availableUsers.length}
                        title={"Available Users"}
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

            {availableTab == "unavailable" && (
                <>
                    <UserTable
                        length={unavailableUsers.length}
                        title={"unavailable Users"}
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

            {availableTab === "Pending Approval" && (
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

            {availableTab == "rejected" && (
                <>
                    <UserTable
                        length={rejectedUsers.length}
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

            {availableTab == "students" && (
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

            {availableTab == "staff" && (
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