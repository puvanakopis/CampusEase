import React from 'react';

const ReviewsSection = ({ rating, reviewsCount, reviews }) => {
    return (
        <div className="border-t border-slate-200 pt-10">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">star</span>
                <h3 className="text-xl font-bold">{rating} · {reviewsCount} student reviews</h3>
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
                Show all {reviewsCount} student reviews
            </button>
        </div>
    );
};

export default ReviewsSection;