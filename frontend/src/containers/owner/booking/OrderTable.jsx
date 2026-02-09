const OrderTable = ({ orders, getStatusBadge, getPriorityBadge, getActionButtons }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Service Details
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Booking Period
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                            <td className="px-6 py-4 text-sm font-semibold text-primary">{order.id}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                                        {order.customer.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{order.customer.name}</p>
                                        <p className="text-[10px] text-slate-400">
                                            Student ID: {order.customer.studentId}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        {order.service.icon}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">{order.service.title}</p>
                                        <p className="text-[10px] text-slate-400">{order.service.details}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-sm text-slate-600">{order.period.main}</p>
                                <p className="text-[10px] text-slate-400">{order.period.sub}</p>
                                {order.submitted && (
                                    <p className="text-[10px] text-orange-500 mt-1">Submitted: {order.submitted}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900">{order.amount}</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    {getStatusBadge(order.status)}
                                    {order.priority && getPriorityBadge(order.priority)}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    {getActionButtons(order)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;