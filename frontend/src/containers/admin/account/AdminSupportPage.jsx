import React, { useState } from "react";

const AdminSupportPage = () => {
    const [tickets, setTickets] = useState([
        {
            id: "TKT-001",
            ownerName: "John Smith",
            ownerEmail: "john@example.com",
            category: "Payment / Settlement Issue",
            priority: "high",
            propertyId: "SUSL-2938",
            description: "Payment for last month's rent hasn't been settled yet. Tenant confirmed payment but not reflected in my account.",
            status: "open",
            createdAt: "2024-01-15",
            lastUpdated: "2024-01-15",
            responses: []
        },
        {
            id: "TKT-002",
            ownerName: "Maria Garcia",
            ownerEmail: "maria@example.com",
            category: "Property Listing Issue",
            priority: "medium",
            propertyId: "SUSL-2940",
            description: "My property photos aren't showing correctly on the listing page. Some images appear blurred.",
            status: "in-progress",
            createdAt: "2024-01-14",
            lastUpdated: "2024-01-14",
            responses: [
                {
                    admin: "Support Team",
                    message: "We've identified the issue with image compression. Working on a fix.",
                    timestamp: "2024-01-14 14:30"
                }
            ]
        },
        {
            id: "TKT-003",
            ownerName: "Robert Chen",
            ownerEmail: "robert@example.com",
            category: "Tenant Misconduct",
            priority: "critical",
            propertyId: "SUSL-2935",
            description: "Tenant has caused significant property damage and is refusing to pay for repairs.",
            status: "open",
            createdAt: "2024-01-15",
            lastUpdated: "2024-01-15",
            responses: []
        },
        {
            id: "TKT-004",
            ownerName: "Sarah Johnson",
            ownerEmail: "sarah@example.com",
            category: "Verification / Document Issue",
            priority: "low",
            propertyId: null,
            description: "My driver's license verification is stuck in pending status for over a week.",
            status: "resolved",
            createdAt: "2024-01-10",
            lastUpdated: "2024-01-13",
            responses: [
                {
                    admin: "Verification Team",
                    message: "Documents have been verified. Your account is now fully activated.",
                    timestamp: "2024-01-13 11:15"
                }
            ]
        }
    ]);

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newResponse, setNewResponse] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleStatusChange = (ticketId, newStatus) => {
        setTickets(tickets.map(ticket =>
            ticket.id === ticketId
                ? { ...ticket, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
                : ticket
        ));
    };

    const handleSubmitResponse = () => {
        if (!newResponse.trim() || !selectedTicket) return;

        const updatedTickets = tickets.map(ticket => {
            if (ticket.id === selectedTicket.id) {
                return {
                    ...ticket,
                    responses: [
                        ...ticket.responses,
                        {
                            admin: "Admin User",
                            message: newResponse,
                            timestamp: new Date().toLocaleString()
                        }
                    ],
                    status: ticket.status === "open" ? "in-progress" : ticket.status,
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
            }
            return ticket;
        });

        setTickets(updatedTickets);
        setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
        setNewResponse("");
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesFilter = filter === "all" || ticket.status === filter || ticket.priority === filter;
        const matchesSearch = searchQuery === "" ||
            ticket.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getPriorityBadge = (priority) => {
        const styles = {
            critical: "bg-red-100 text-red-800 border border-red-200",
            high: "bg-orange-100 text-orange-800 border border-orange-200",
            medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
            low: "bg-green-100 text-green-800 border border-green-200"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[priority]}`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const styles = {
            open: "bg-blue-100 text-blue-800 border border-blue-200",
            "in-progress": "bg-purple-100 text-purple-800 border border-purple-200",
            resolved: "bg-emerald-100 text-emerald-800 border border-emerald-200"
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
                {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
            </span>
        );
    };

    return (
        <main className="flex-1 w-full mx-auto flex flex-col gap-8 px-4 ">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-slate-900">Support Center</h1>
                <p className="text-slate-500">
                    Manage support tickets from property and vehicle owners. View, respond, and update ticket status.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-slate-900">{tickets.length}</div>
                    <div className="text-sm text-slate-500">Total Tickets</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">
                        {tickets.filter(t => t.status === 'open').length}
                    </div>
                    <div className="text-sm text-slate-500">Open Tickets</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-red-600">
                        {tickets.filter(t => t.priority === 'critical').length}
                    </div>
                    <div className="text-sm text-slate-500">Critical Priority</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">
                        {tickets.filter(t => t.status === 'resolved').length}
                    </div>
                    <div className="text-sm text-slate-500">Resolved</div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Ticket List */}
                <div className="lg:w-2/5 flex flex-col gap-6">
                    {/* Filters and Search */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-900">Search Tickets</label>
                                <input
                                    type="text"
                                    placeholder="Search by ID, owner name, or category..."
                                    className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-slate-900">Filter By</label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setFilter("all")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all"
                                            ? "bg-primary text-white"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                    >
                                        All Tickets
                                    </button>
                                    <button
                                        onClick={() => setFilter("open")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "open"
                                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                    >
                                        Open
                                    </button>
                                    <button
                                        onClick={() => setFilter("critical")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "critical"
                                            ? "bg-red-100 text-red-700 border border-red-200"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                    >
                                        Critical
                                    </button>
                                    <button
                                        onClick={() => setFilter("resolved")}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "resolved"
                                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                            }`}
                                    >
                                        Resolved
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ticket List */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 bg-slate-50">
                            <h2 className="font-bold text-slate-900">Support Tickets ({filteredTickets.length})</h2>
                        </div>
                        <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                            {filteredTickets.map(ticket => (
                                <div
                                    key={ticket.id}
                                    className={`p-4 cursor-pointer transition-colors hover:bg-slate-50 ${selectedTicket?.id === ticket.id ? "bg-blue-50 border-l-4 border-l-primary" : ""
                                        }`}
                                    onClick={() => setSelectedTicket(ticket)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-slate-900">{ticket.id}</div>
                                        <div className="flex items-center gap-2">
                                            {getPriorityBadge(ticket.priority)}
                                            {getStatusBadge(ticket.status)}
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-slate-900 mb-1">{ticket.ownerName}</div>
                                    <div className="text-sm text-slate-500 mb-2">{ticket.category}</div>
                                    <div className="text-sm text-slate-600 line-clamp-2">{ticket.description}</div>
                                    <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
                                        <span>{ticket.createdAt}</span>
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">chat</span>
                                            {ticket.responses.length}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Ticket Details */}
                <div className="lg:w-3/5">
                    {selectedTicket ? (
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-200 bg-slate-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 mb-1">{selectedTicket.id}</h2>
                                        <div className="flex items-center gap-2 mb-2">
                                            {getPriorityBadge(selectedTicket.priority)}
                                            {getStatusBadge(selectedTicket.status)}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedTicket.status}
                                            onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                                            className="rounded-lg border border-slate-300 p-2 text-sm focus:border-primary focus:ring-primary"
                                        >
                                            <option value="open">Open</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Ticket Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">Owner</div>
                                        <div className="font-medium text-slate-900">{selectedTicket.ownerName}</div>
                                        <div className="text-sm text-slate-600">{selectedTicket.ownerEmail}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">Property/Vehicle ID</div>
                                        <div className="font-medium text-slate-900">
                                            {selectedTicket.propertyId || "Not specified"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">Category</div>
                                        <div className="font-medium text-slate-900">{selectedTicket.category}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">Created</div>
                                        <div className="font-medium text-slate-900">{selectedTicket.createdAt}</div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-slate-900 mb-2">Issue Description</div>
                                    <div className="bg-slate-50 rounded-lg p-4 text-slate-700">
                                        {selectedTicket.description}
                                    </div>
                                </div>

                                {/* Responses */}
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-slate-900 mb-4">
                                        Responses ({selectedTicket.responses.length})
                                    </div>
                                    <div className="space-y-4">
                                        {selectedTicket.responses.map((response, index) => (
                                            <div key={index} className="bg-blue-50 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-medium text-slate-900">{response.admin}</div>
                                                    <div className="text-xs text-slate-500">{response.timestamp}</div>
                                                </div>
                                                <div className="text-slate-700">{response.message}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Add Response */}
                                <div>
                                    <div className="text-sm font-bold text-slate-900 mb-2">Add Response</div>
                                    <textarea
                                        rows={4}
                                        placeholder="Type your response here..."
                                        className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-primary focus:ring-primary resize-none mb-3"
                                        value={newResponse}
                                        onChange={(e) => setNewResponse(e.target.value)}
                                    ></textarea>
                                    <button
                                        onClick={handleSubmitResponse}
                                        className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-lg">send</span>
                                        Send Response
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                            <div className="text-slate-400 mb-4">
                                <span className="material-symbols-outlined text-5xl">support_agent</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-2">No Ticket Selected</h3>
                            <p className="text-slate-500">Select a ticket from the list to view details and respond.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AdminSupportPage;