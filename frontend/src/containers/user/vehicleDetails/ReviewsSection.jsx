import React, { useState } from 'react';
import { getPhotoUrl } from '../../../utils/photo';

const ReviewsSection = ({ reviews }) => {
    const [showModal, setShowModal] = useState(false);
    const maxVisible = 2;

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2)
        : 0;

    const visibleReviews = reviews.slice(0, maxVisible);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`material-symbols-outlined text-sm ${i <= rating ? 'text-yellow-500' : 'text-slate-300'}`}
                >
                    star
                </span>
            );
        }
        return stars;
    };

    const getUserPhoto = (photo) => photo ? getPhotoUrl(photo, 'user_photo') : null;

    return (
        <div className="border-t border-slate-200 pt-10">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">star</span>
                <h3 className="text-xl font-bold">
                    {averageRating} · {reviews.length} student {reviews.length === 1 ? 'review' : 'reviews'}
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleReviews.map((review, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center gap-3">
                            {review.user.photo ? (
                                <img
                                    src={getUserPhoto(review.user.photo)}
                                    alt={review.user.first_name}
                                    className="w-10 h-10 rounded-full bg-slate-200 object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white font-bold">
                                    {review.user.first_name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <p className="font-semibold text-sm">{review.user.first_name}</p>
                                <p className="text-xs text-slate-500">{review.user.role}</p>
                                <div className="flex">{renderStars(review.rating)}</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            "{review.message}"
                        </p>
                    </div>
                ))}
            </div>

            {reviews.length > maxVisible && (
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 border border-slate-200 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                    Show all {reviews.length} student {reviews.length === 1 ? 'review' : 'reviews'}
                </button>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 md:items-center">
                    <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-xl">
                        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">All Reviews</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-full"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 max-h-[400px] overflow-y-auto space-y-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {review.user.photo ? (
                                            <img
                                                src={getUserPhoto(review.user.photo)}
                                                alt={review.user.first_name}
                                                className="w-10 h-10 rounded-full bg-slate-200 object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-white font-bold">
                                                {review.user.first_name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold text-sm">{review.user.first_name}</p>
                                            <p className="text-xs text-slate-500">{review.user.role}</p>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        "{review.message}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewsSection;