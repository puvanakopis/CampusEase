import React from 'react';

const PhotoGrid = ({ images }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${image.colSpan} ${image.rowSpan} relative group cursor-pointer ${index > 0 ? 'hidden md:block' : ''}`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url('${image.url}')` }}
                        alt={image.alt}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    {image.showButton && (
                        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-white transition-colors">
                            Show all photos
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;