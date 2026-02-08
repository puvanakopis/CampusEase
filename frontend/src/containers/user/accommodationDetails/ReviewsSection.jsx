import React from 'react';

const ReviewsSection = () => {
    const reviews = [
        {
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm7lkysdTuv3I_kq8ciERHGGL7JVa-FVApEdgzrPe6jRpVMojrflO2N4b-UH0AfhGIKjp7ha5WWa8p8t8pfcKKh81NqdBSMpmnkUtC0_a-_08rJ3-sKydInfqZHV9WXy7-vbYWupPGvmrpKqZjM9RcDaaPQ2bl_f7O2UMuYoM0qrLpRVrBm5n1H-hciyucGOCxy1DAvk_KqYcSFgFHvLzrYX8kj1SpoVrzw90eL1otSU4CYAnYE4Np_tubeK1Ngw5STRB6i3vSYYY',
            name: 'Tharindu S.',
            role: 'Applied Sciences Faculty • 2nd Year',
            comment: '"Perfect for me as a science student. The walk to the labs is very quick, and the area is super quiet for studying. The host understands our exam schedules and keeps the place peaceful."'
        },
        {
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_nBbP2HtGqTL6ZAZVhEObv5yC-hnDuA-o7EGwsXz0YZHJcyHGycbkVmOH1DkdLJ2T0Vu8t1RK-2TXNooeO4JepJ2m1H6Q9gBBrFvkhEdl_5-GV9h2tq0Hnmsourm2__FE7lurL6yEJncptXX8Ga6UoUdJbnzDOxzYmobQe6BQIey0KufszpUq5kbX00WAH-DurYz3ZP26RFoWAbQOnn51cs7P268qOMNG1Tm1ypckmHcgzudEQcy22JY-_P8LVuZzIOt1SgR-Gnw',
            name: 'Kasun S.',
            role: 'Management Faculty • Graduated 2023',
            comment: '"Stayed here for two years. Best part is being so close to the main gate. I could literally wake up at 7:30 for an 8 AM lecture. Highly recommended for any SUSL student."'
        }
    ];

    return (
        <div className="border-t border-slate-200 pt-10">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">star</span>
                <h3 className="text-xl font-bold">4.88 · 32 student reviews</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="bg-cover rounded-full h-10 w-10 bg-slate-200"
                                style={{ backgroundImage: `url('${review.avatar}')` }}
                            ></div>
                            <div>
                                <p className="font-semibold text-sm">{review.name}</p>
                                <p className="text-xs text-slate-500">{review.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>
            <button className="mt-6 border border-slate-200 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors">
                Show all 32 student reviews
            </button>
        </div>
    );
};

export default ReviewsSection;