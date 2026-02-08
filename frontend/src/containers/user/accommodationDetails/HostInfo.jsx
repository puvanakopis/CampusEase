import React from 'react';

const HostInfo = () => {
    return (
        <div className="border-t border-slate-200 pt-10 pb-10">
            <h3 className="text-xl font-bold mb-6">Hosted by Mrs. Priyani</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <div
                        className="bg-center bg-cover rounded-xl h-32 w-32 mb-2"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD3M3mC_UxCwJLXqKkced1WNJD1I4jNvXIriInvwWLxVuPWctEGW4olEC4UqUAAkT3DIrgFvWBb5e0N32uzyfPDVmKU-U78B6NndkIuiVDp8IEfsxxg-00hCiBaeg3I2ztV3OTZ8fsmHhB-v778CIdiFjmCq5UwfnTtV7ALeCozMKeGGzpVsEeZF62CDyvtGFl9Ze7qinUrKDa03zzbQwoCG-FbBxVHnp4-0k2lLluhVwLenVsWudlkxe6ZQYBttZWoOjVJsNvfrGk")' }}
                    ></div>
                    <h4 className="font-semibold text-lg">Priyani Silva</h4>
                    <p className="text-slate-500 text-sm">Joined Feb 2019</p>
                    <div className="flex gap-2 mt-2 text-slate-600 text-sm font-medium">
                        <span className="material-symbols-outlined text-lg text-green-500">verified_user</span> SUSL
                        Recommended
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    <p className="text-slate-600">
                        "Hello! I have been hosting SUSL students for nearly 10 years. My family and I live
                        nearby and are always available if you need help with anything. We provide a safe,
                        home-like environment for students moving away from home for the first time."
                    </p>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-slate-900">Response rate: 100%</p>
                        <p className="text-sm font-medium text-slate-900">Response time: within an
                            hour</p>
                    </div>
                    <button
                        className="bg-slate-900 text-white rounded-lg px-6 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity w-max"
                    >
                        Contact Host
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HostInfo;