import React from "react";

const ReviewCard = ({ review }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 relative">
        <div className="flex items-center gap-3 mb-4">
            <img
                alt={review.user.first_name}
                className="h-10 w-10 rounded-full bg-slate-100 object-cover"
                src={review.user.photo?.filename ? `/uploads/${review.user.photo.filename}` : "https://via.placeholder.com/40"}
            />
            <div>
                <h5 className="font-bold text-sm">{review.user.first_name}</h5>
                <p className="text-[10px] text-slate-500 font-medium">{review.user.role}</p>
            </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{review.message}</p>
        <div className="mt-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className={`material-symbols-outlined text-sm ${
                        i < Math.round(review.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                    }`}
                >
                    star
                </span>
            ))}
        </div>
    </div>
);

const ReviewsSection = ({ title, reviews }) => {
    const rating =
        reviews.length > 0 ? reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length : 5;

    return (
        <div className="pt-10 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-400 fill-current">star</span>
                    <span className="font-bold">{rating.toFixed(1)}</span>
                    <span className="text-slate-400 text-sm">({reviews.length} Reviews)</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review, idx) => (
                    <ReviewCard key={idx} review={review} />
                ))}
            </div>

            <button className="mt-8 w-full py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Read all {reviews.length} reviews
            </button>
        </div>
    );
};

export default ReviewsSection;