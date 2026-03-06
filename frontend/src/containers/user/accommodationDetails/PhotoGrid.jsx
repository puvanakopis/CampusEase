import React, { useState } from 'react';
import { buildPhotoUrl } from '../../../utils/photoUtils';

const PhotoGrid = ({ images = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const maxVisible = 8;

    if (!images.length) return null;

    const visibleImages = images.slice(0, maxVisible);

    return (
        <div className="mb-10 relative">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
                {visibleImages.map((image, index) => {
                    const imageUrl = buildPhotoUrl(image.filename, 'accommodation');

                    return (
                        <div key={index} className="relative group cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url('${imageUrl}')` }}
                                alt={image.alt || `Photo ${index + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                    );
                })}

                {/* Show all button */}
                {images.length > maxVisible && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-white transition-colors z-10"
                    >
                        Show all photos
                    </button>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[80vh]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-900">All Photos</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-full"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                            {images.map((image, index) => {
                                const imageUrl = buildPhotoUrl(image.filename, 'accommodation');
                                return (
                                    <div
                                        key={index}
                                        className="relative h-48 md:h-60 w-full rounded-xl overflow-hidden"
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                                            style={{ backgroundImage: `url('${imageUrl}')` }}
                                            alt={image.alt || `Photo ${index + 1}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoGrid;