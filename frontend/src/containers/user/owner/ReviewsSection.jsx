import React from "react";

const reviews = [
    {
        name: "Tharindu S.",
        course: "Applied Sciences • 3rd Year",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAm7lkysdTuv3I_kq8ciERHGGL7JVa-FVApEdgzrPe6jRpVMojrflO2N4b-UH0AfhGIKjp7ha5WWa8p8t8pfcKKh81NqdBSMpmnkUtC0_a-_08rJ3-sKydInfqZHV9WXy7-vbYWupPGvmrpKqZjM9RcDaaPQ2bl_f7O2UMuYoM0qrLpRVrBm5n1H-hciyucGOCxy1DAvk_KqYcSFgFHvLzrYX8kj1SpoVrzw90eL1otSU4CYAnYE4Np_tubeK1Ngw5STRB6i3vSYYY",
        comment:
            "Mrs. Priyani is like a second mother. The rooms are always clean and the environment is perfect for late-night studying. Best place to stay near SUSL.",
    },
    {
        name: "Kasun S.",
        course: "Management Faculty • Alumnus",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA_nBbP2HtGqTL6ZAZVhEObv5yC-hnDuA-o7EGwsXz0YZHJcyHGycbkVmOH1DkdLJ2T0Vu8t1RK-2TXNooeO4JepJ2m1H6Q9gBBrFvkhEdl_5-GV9h2tq0Hnmsourm2__FE7lurL6yEJncptXX8Ga6UoUdJbnzDOxzYmobQe6BQIey0KufszpUq5kbX00WAH-DurYz3ZP26RFoWAbQOnn51cs7P268qOMNG1Tm1ypckmHcgzudEQcy22JY-_P8LVuZzIOt1SgR-Gnw",
        comment:
            "Stayed here for 4 years. Never had issues with water or electricity. The transport service she offers is also very reliable for holiday travels.",
    },
];

const ReviewCard = ({ review }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 relative">
        <div className="flex items-center gap-3 mb-4">
            <img alt="Student" className="h-10 w-10 rounded-full bg-slate-100 object-cover" src={review.image} />
            <div>
                <h5 className="font-bold text-sm">{review.name}</h5>
                <p className="text-[10px] text-slate-500 font-medium">{review.course}</p>
            </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
        <div className="mt-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-sm text-yellow-400 fill-current">
                    star
                </span>
            ))}
        </div>
    </div>
);

const ReviewsSection = () => (
    <div className="pt-10 border-t border-slate-200">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black">Reviews from Students</h3>
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400 fill-current">star</span>
                <span className="font-bold">4.9</span>
                <span className="text-slate-400 text-sm">(120 Reviews)</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, idx) => (
                <ReviewCard key={idx} review={review} />
            ))}
        </div>

        <button className="mt-8 w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Read all 120 reviews
        </button>
    </div>
);

export default ReviewsSection;