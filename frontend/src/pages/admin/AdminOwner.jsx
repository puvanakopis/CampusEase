import React, { useState } from "react";
import Heading from "../../containers/admin/common/Heading";
import StatsCards from "../../containers/admin/common/StatsCards";
import Tabs from "../../containers/admin/common/Tabs";
import OwnerTable from "../../containers/admin/owner/OwnerTable";
import OwnerRequestsTable from "../../containers/admin/owner/OwnerRequestsTable";
import ViewOwnerPopup from "../../containers/admin/owner/ViewOwnerPopup";
import StatusChangePopup from "../../containers/admin/owner/StatusChangePopup";

const AdminOwnerManagement = () => {
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [activeTab, setActiveTab] = useState("current");
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [ownerToChangeStatus, setOwnerToChangeStatus] = useState(null);

    const [allOwners, setAllOwners] = useState([
        {
            id: "OWN-001",
            name: "Mr. Perera",
            email: "perera@gmail.com",
            phone: "+94 77 123 4567",
            nic: "871234567V",
            address: "123 Main Street, Colombo 05",
            status: "Active",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
            registrationDate: "2023-01-15",
            lastActive: "2024-10-20",
            totalProperties: 3,
            activeProperties: 2,
            totalRevenue: 240000,
            bankDetails: {
                bankName: "Commercial Bank",
                accountName: "K.A. Perera",
                accountNumber: "1234567890",
                branch: "Colombo 05"
            },
            documents: {
                nicVerified: true,
                businessRegistration: true,
                taxCertificate: true
            },
            rating: 4.5,
            totalStudents: 18
        },
        {
            id: "OWN-002",
            name: "Ms. Fernando",
            email: "fernando@gmail.com",
            phone: "+94 76 234 5678",
            nic: "901234567V",
            address: "456 Galle Road, Mount Lavinia",
            status: "Active",
            profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
            registrationDate: "2023-02-10",
            lastActive: "2024-10-18",
            totalProperties: 2,
            activeProperties: 2,
            totalRevenue: 156000,
            bankDetails: {
                bankName: "Sampath Bank",
                accountName: "S.M. Fernando",
                accountNumber: "0987654321",
                branch: "Mount Lavinia"
            },
            documents: {
                nicVerified: true,
                businessRegistration: true,
                taxCertificate: false
            },
            rating: 4.2,
            totalStudents: 12
        },
        {
            id: "OWN-003",
            name: "Mr. Silva",
            email: "silva@gmail.com",
            phone: "+94 71 345 6789",
            nic: "881234567V",
            address: "789 Kandy Road, Kadawatha",
            status: "Suspended",
            profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
            registrationDate: "2023-03-05",
            lastActive: "2024-09-15",
            totalProperties: 3,
            activeProperties: 0,
            totalRevenue: 0,
            bankDetails: {
                bankName: "Bank of Ceylon",
                accountName: "J.R. Silva",
                accountNumber: "1122334455",
                branch: "Kadawatha"
            },
            documents: {
                nicVerified: true,
                businessRegistration: false,
                taxCertificate: false
            },
            rating: 3.8,
            totalStudents: 0,
            suspensionReason: "Multiple tenant complaints and violation of rental agreement terms"
        },
        {
            id: "OWN-004",
            name: "University Management",
            email: "hostels@susl.lk",
            phone: "+94 81 238 5000",
            nic: "UNIV-001",
            address: "SUSL Main Campus, Belihuloya",
            status: "Active",
            profileImage: "https://via.placeholder.com/100x100?text=UNIV",
            registrationDate: "2022-08-01",
            lastActive: "2024-10-22",
            totalProperties: 5,
            activeProperties: 4,
            totalRevenue: 320000,
            bankDetails: {
                bankName: "People's Bank",
                accountName: "SUSL Hostel Division",
                accountNumber: "5566778899",
                branch: "Belihuloya"
            },
            documents: {
                nicVerified: true,
                businessRegistration: true,
                taxCertificate: true
            },
            rating: 4.7,
            totalStudents: 45
        }
    ]);

    const [ownerRequests, setOwnerRequests] = useState([
        {
            id: "REQ-OWN-001",
            name: "Mrs. Wijesinghe",
            email: "wijesinghe@gmail.com",
            phone: "+94 72 987 6543",
            nic: "901111222V",
            address: "321 Negombo Road, Kurunegala",
            status: "Pending",
            profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
            requestedDate: "2024-10-22",
            businessType: "Private Hostel Operator",
            experience: "3 years",
            reason: "Wants to list student accommodations in Kurunegala area",
            documents: {
                nic: "verified",
                businessRegistration: "pending",
                taxCertificate: "not_uploaded"
            },
            propertyPlans: [
                { type: "Hostel", rooms: 10, location: "Kurunegala Town" },
                { type: "Annex", rooms: 5, location: "University Road" }
            ]
        },
        {
            id: "REQ-OWN-002",
            name: "Mr. Rajapakse",
            email: "rajapakse@gmail.com",
            phone: "+94 76 888 9999",
            nic: "772233445V",
            address: "555 Matara Road, Galle",
            status: "Pending",
            profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
            requestedDate: "2024-10-21",
            businessType: "Real Estate Developer",
            experience: "5 years",
            reason: "New apartment complex near SUSL branch campus",
            documents: {
                nic: "verified",
                businessRegistration: "verified",
                taxCertificate: "pending"
            },
            propertyPlans: [
                { type: "Apartment", rooms: 20, location: "Galle City" }
            ]
        }
    ]);

    const tabs = [
        { id: "current", label: "Active Owners", count: allOwners.filter(o => o.status === "Active").length },
        { id: "requests", label: "Registration Requests", count: ownerRequests.length },
        { id: "inactive", label: "Inactive Owners", count: allOwners.filter(o => o.status === "Suspended" || o.status === "Inactive").length }
    ];

    const stats = [
        {
            label: "Total Owners",
            icon: "group",
            value: allOwners.length,
            subtext: `${allOwners.filter(o => o.status === "Active").length} active`,
            trendIcon: "trending_up",
            subtextColor: "text-green-500"
        },
        {
            label: "Total Properties",
            icon: "apartment",
            value: allOwners.reduce((sum, owner) => sum + owner.totalProperties, 0),
            subtext: `${allOwners.reduce((sum, owner) => sum + owner.activeProperties, 0)} currently active`,
            trendIcon: "trending_up",
            subtextColor: "text-blue-500"
        },
        {
            label: "Avg. Owner Rating",
            icon: "star",
            value: (allOwners.reduce((sum, owner) => sum + owner.rating, 0) / allOwners.length).toFixed(1),
            subtext: `${allOwners.filter(o => o.rating >= 4).length} owners rated 4+`,
            subtextColor: "text-yellow-600"
        }
    ];

    const handleViewOwner = (owner) => {
        setSelectedOwner(owner);
        setShowViewPopup(true);
    };

    const handleDeleteOwner = (ownerId) => {
        if (window.confirm("Are you sure you want to delete this owner? This will also remove all their properties.")) {
            setAllOwners(allOwners.filter(owner => owner.id !== ownerId));
        }
    };

    const handleApproveRequest = (requestId) => {
        const request = ownerRequests.find(req => req.id === requestId);
        if (!request) return;

        const newOwner = {
            ...request,
            id: `OWN-${String(allOwners.length + 1).padStart(3, '0')}`,
            status: "Active",
            registrationDate: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0],
            totalProperties: 0,
            activeProperties: 0,
            totalRevenue: 0,
            rating: 0,
            totalStudents: 0,
            documents: {
                nicVerified: request.documents.nic === "verified",
                businessRegistration: request.documents.businessRegistration === "verified",
                taxCertificate: request.documents.taxCertificate === "verified"
            }
        };

        setAllOwners([...allOwners, newOwner]);
        setOwnerRequests(ownerRequests.filter(req => req.id !== requestId));

        alert(`Owner "${request.name}" has been approved and registered. Welcome email sent.`);
    };

    const handleRejectRequest = (requestId) => {
        const request = ownerRequests.find(req => req.id === requestId);
        if (window.confirm(`Are you sure you want to reject "${request?.name}"?`)) {
            setOwnerRequests(ownerRequests.filter(req => req.id !== requestId));
            alert(`Registration request for "${request?.name}" has been rejected. Notification sent.`);
        }
    };

    const handleToggleOwnerStatus = (ownerId, currentStatus) => {
        const owner = allOwners.find(o => o.id === ownerId);
        if (!owner) return;

        setOwnerToChangeStatus({ ...owner, currentStatus });
        setShowStatusPopup(true);
    };

    const handleConfirmStatusChange = async (reason) => {
        if (!ownerToChangeStatus) return;

        const newStatus = ownerToChangeStatus.currentStatus === "Active" ? "Suspended" : "Active";

        setAllOwners(allOwners.map(owner =>
            owner.id === ownerToChangeStatus.id ? {
                ...owner,
                status: newStatus,
                lastActive: new Date().toISOString().split('T')[0],
                ...(newStatus === "Suspended" ? { suspensionReason: reason } : { suspensionReason: null })
            } : owner
        ));

        alert(`Owner "${ownerToChangeStatus.name}" has been ${newStatus.toLowerCase()}.`);

        setShowStatusPopup(false);
        setOwnerToChangeStatus(null);
    };

    return (
        <main className="bg-[#f6f7f8] p-8 md:px-24 max-w-8xl mx-auto space-y-8">
            {/* Popups */}
            {showViewPopup && selectedOwner && (
                <ViewOwnerPopup
                    owner={selectedOwner}
                    onClose={() => {
                        setShowViewPopup(false);
                        setSelectedOwner(null);
                    }}
                />
            )}

            {showStatusPopup && ownerToChangeStatus && (
                <StatusChangePopup
                    owner={ownerToChangeStatus}
                    currentStatus={ownerToChangeStatus.currentStatus}
                    onClose={() => {
                        setShowStatusPopup(false);
                        setOwnerToChangeStatus(null);
                    }}
                    onConfirm={handleConfirmStatusChange}
                />
            )}

            <Heading
                title="Admin Owner Management"
                subtitle="Manage property owners, review registration requests, and handle owner accounts."
                showButton={false}
            />

            <StatsCards stats={stats} />

            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {activeTab === "current" && (
                <OwnerTable
                    owners={allOwners.filter(owner => owner.status === "Active")}
                    onView={handleViewOwner}
                    onDelete={handleDeleteOwner}
                    onToggleStatus={handleToggleOwnerStatus}
                />
            )}

            {activeTab === "requests" && (
                <OwnerRequestsTable
                    ownerRequests={ownerRequests}
                    onViewRequest={handleViewOwner}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                />
            )}

            {activeTab === "inactive" && (
                <OwnerTable
                    owners={allOwners.filter(owner => owner.status !== "Active")}
                    onView={handleViewOwner}
                    onDelete={handleDeleteOwner}
                    onToggleStatus={handleToggleOwnerStatus}
                />
            )}
        </main>
    );
};

export default AdminOwnerManagement;