import React from "react";

const BookingsPage = () => {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-8 px-4 md:px-10">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-slate-500">
          Manage your active stays and transport schedules.
        </p>
      </div>

      {/* Active Bookings */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">event_upcoming</span>
          <h2 className="text-xl font-bold text-slate-900">Active Bookings</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accommodation Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
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
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Riverview Annex</h3>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                    Confirmed
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-slate-500 text-sm mb-4">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    Check-in: Oct 15, 2023
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    Pambahinna Junction, Belihuloya
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end gap-3">
                <button className="px-4 border border-slate-200 text-slate-600 text-sm font-bold h-10 rounded-lg hover:bg-slate-50 transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>

          {/* Vehicle Card */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm">
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
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900">Toyota Hiace Van</h3>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-lg">
                    Confirmed
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-slate-500 text-sm mb-4">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    Rental Date: Feb 15, 2026
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    Pickup: Belihuloya Town
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">attach_money</span>
                    Price: LKR 12,000
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end gap-3">
                <button className="px-4 border border-slate-200 text-slate-600 text-sm font-bold h-10 rounded-lg hover:bg-slate-50 transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Completed Bookings */}
      <section className="flex flex-col gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">history</span>
          <h2 className="text-xl font-bold text-slate-900">Completed Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-slate-200 rounded-xl bg-white">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Location/Route</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-lg">home_work</span>
                        </div>
                        <div className="text-sm font-bold text-slate-900">Hilltop Girls' Hostel</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Sep 2023</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Belihuloya Town</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">LKR 6,000</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button className="text-primary hover:underline">Rebook</button>
                        <button className="text-slate-600 hover:text-primary">Rate Service</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingsPage;