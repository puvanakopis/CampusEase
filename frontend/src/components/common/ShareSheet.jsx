import React from "react";

const ShareSheet = ({ title, currentUrl, onClose }) => {
    const shareOptions = [
        {
            name: "WhatsApp",
            icon: "chat",
            color: "bg-green-500",
            shareUrl: `https://wa.me/?text=${encodeURIComponent(`${title} - ${currentUrl}`)}`,
        },
        {
            name: "Facebook",
            icon: "thumb_up",
            color: "bg-blue-600",
            shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        },
        {
            name: "Twitter",
            icon: "flutter_dash",
            color: "bg-sky-500",
            shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`,
        },
        {
            name: "Email",
            icon: "mail",
            color: "bg-slate-600",
            shareUrl: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${currentUrl}`)}`,
        },
    ];

    const handleShare = (shareUrl) => {
        window.open(shareUrl, "_blank", "noopener,noreferrer");
        onClose();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                onClose();
            })
            .catch(err => console.error("Failed to copy: ", err));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 md:items-center">
            <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-xl">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Share</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {shareOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleShare(option.shareUrl)}
                                className="flex flex-col items-center"
                            >
                                <div className={`${option.color} w-12 h-12 rounded-full flex items-center justify-center mb-2`}>
                                    <span className="material-symbols-outlined text-white">{option.icon}</span>
                                </div>
                                <span className="text-xs text-slate-700">{option.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <div className="flex-1 bg-slate-100 rounded-lg px-4 py-3 text-sm text-slate-600 truncate">
                            {currentUrl}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareSheet;