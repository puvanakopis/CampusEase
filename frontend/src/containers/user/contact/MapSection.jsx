import React from 'react'

const MapSection = () => (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border border-[#e7edf3] mb-20">
        <div
            className="absolute inset-0 bg-[#dde1e4] bg-center bg-cover flex items-center justify-center"
            style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEFcdYVJl8CSQNLBu_7yQB85Jd2HuOzAkwNEs4Xi7cdQnfZYuHkTVsinFc1mOcqYtdc1D8Yd_jYsFr3wlt2UMeyTjP4gnQ0SMnGcbT8AXyoLP1CIXTcXlNnXBTnxAS_FqHpcWpVA8aU2q2hESfsn21NyhLA7QvWEEvKHCm5nwJ90JpL7b8E72P8xmGCMsZNY1CQrAPsUtdOczq-xRibGt76guIbNQlKGKYhOOMLUjAnPGTc6zPVscY4SsGGmptE-emRMHSe2asM-I')`,
            }}
        >
            <div className="absolute bottom-6 left-6 md:left-10 md:bottom-10 max-w-[340px] bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
                <h4 className="text-primary font-bold text-lg mb-2">Visit Our Office</h4>
                <p className="text-sm font-medium mb-4 leading-relaxed">
                    Faculty of Computing,
                    <br />
                    Sabaragamuwa University of Sri Lanka,
                    <br />
                    Pambahinna, Belihuloya, 70140.
                </p>
                <a className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline" href="#">
                    <span className="material-symbols-outlined text-[20px]">directions</span>
                    Get Directions
                </a>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg ring-4 ring-primary/20 animate-pulse">
                    <span className="material-symbols-outlined text-2xl">school</span>
                </div>
                <div className="w-1 h-4 bg-primary rounded-full -mt-1 shadow-md"></div>
                <div className="bg-primary/20 w-8 h-2 rounded-full blur-[2px] mt-1"></div>
            </div>
        </div>
    </div>
);

export default MapSection