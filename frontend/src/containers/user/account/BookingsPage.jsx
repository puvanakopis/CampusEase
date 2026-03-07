import React from "react";

const MyBookingsPage = () => {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 ">
      <div className="space-y-6">
        {/* Header */}
        <div className="">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
            <p className="text-sm text-slate-500">
              Manage your active stays and transport schedules.
            </p>
          </div>
        </div>

        {/* Active Bookings Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-lg">event_upcoming</span>
            <h2 className="text-lg font-bold text-slate-900">Active Bookings</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Accommodation Card - Matching popup card style */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                <img
                  alt="Pambahinna room"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI5BnAKspEOg_BzW-S6Bd0vthfJXCjNSmdAVzbeMnGiInqD4TBHKDoOIHCmS6Wl_-j8cyilhjlemCGKvQ-n1wgYe3NuA5MtA0thgik4PnK2zwWjlnCbBZ78oO7XVGNhOz1W-LTZM9dUrEmHJdqLrWTK0vkuLsWIRRToS00v0JSqQOamGhp7nchxCb_OwNQdbrecjCejjwZb_mCzQrFoeONrze74vZ6eI97C-ewlMUlmKffkx1wty73DzxgB2LgNXqzWmGTURPZbsw"
                />
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Accommodation
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-slate-900">Riverview Annex</h3>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-lg">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">
                    <p className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      Check-in: Oct 15, 2023
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      Pambahinna Junction, Belihuloya
                    </p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button className="border border-slate-200 text-slate-700 py-1.5 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs">
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicle Card - Matching popup card style */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                <img
                  alt="Toyota Hiace Van"
                  className="h-full w-full object-cover"
                  src="https://your-vehicle-image-link.com/hiace.jpg"
                />
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Vehicle
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-slate-900">Toyota Hiace Van</h3>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-lg">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-slate-500 text-sm mb-3">
                    <p className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      Rental Date: Feb 15, 2026
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      Pickup: Belihuloya Town
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">attach_money</span>
                      Price: LKR 12,000
                    </p>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <button className="border border-slate-200 text-slate-700 py-1.5 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors text-xs">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Completed Bookings Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary text-lg">history</span>
            <h2 className="text-lg font-bold text-slate-900">Completed Bookings</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location/Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-sm">home_work</span>
                        </div>
                        <div className="text-sm font-medium text-slate-900">Hilltop Girls' Hostel</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">Sep 2023</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">Belihuloya Town</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">LKR 6,000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button className="text-primary hover:text-primary/80 text-xs font-medium">Rebook</button>
                        <button className="text-slate-600 hover:text-primary text-xs font-medium">Rate Service</button>
                      </div>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyBookingsPage;