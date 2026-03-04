import React, { useState } from 'react';

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

    // Helper function to get user display name
    const getUserName = (review) => {
        if (review.user_first_name && review.user_first_name.trim() !== '') {
            return review.user_first_name;
        }
        return 'Anonymous';
    };

    // Helper function to get user role
    const getUserRole = (review) => {
        if (review.user_role && review.user_role.trim() !== '') {
            return review.user_role;
        }
        return 'Student';
    };

    // Helper function to get user photo
    const getUserPhoto = (review) => {
        return review.user_photo?.filename || '';
    };

    return (
        <div className="border-t border-slate-200 pt-10">
            {/* Header with average rating */}
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-2xl text-primary">star</span>
                <h3 className="text-xl font-bold">
                    {averageRating} · {reviews.length} student {reviews.length === 1 ? 'review' : 'reviews'}
                </h3>
            </div>

            {/* Visible reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleReviews.map((review, index) => (
                    <div key={review.id || index} className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="bg-cover rounded-full h-10 w-10 bg-slate-200"
                                style={{ 
                                    backgroundImage: getUserPhoto(review) 
                                        ? `url('${getUserPhoto(review)}')` 
                                        : 'none'
                                }}
                            ></div>
                            <div>
                                <p className="font-semibold text-sm">{getUserName(review)}</p>
                                <p className="text-xs text-slate-500">{getUserRole(review)}</p>
                                <div className="flex">{renderStars(review.rating)}</div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            "{review.message}"
                        </p>
                        {/* Optional: Show review date if available */}
                        {review.created_at && (
                            <p className="text-xs text-slate-400">
                                {new Date(review.created_at).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Show all button */}
            {reviews.length > maxVisible && (
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-6 border border-slate-200 rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                    Show all {reviews.length} student {reviews.length === 1 ? 'review' : 'reviews'}
                </button>
            )}

            {/* Modal for all reviews */}
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
                                <div key={review.id || index} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="bg-cover rounded-full h-10 w-10 bg-slate-200"
                                            style={{ 
                                                backgroundImage: getUserPhoto(review) 
                                                    ? `url('${getUserPhoto(review)}')` 
                                                    : 'none'
                                            }}
                                        ></div>
                                        <div>
                                            <p className="font-semibold text-sm">{getUserName(review)}</p>
                                            <p className="text-xs text-slate-500">{getUserRole(review)}</p>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        "{review.message}"
                                    </p>
                                    {review.created_at && (
                                        <p className="text-xs text-slate-400">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </p>
                                    )}
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