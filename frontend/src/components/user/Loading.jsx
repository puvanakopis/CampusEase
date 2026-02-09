import React from "react";

const Loading = () => {
    return (
        <div className="bg-white font-display flex items-center justify-center h-[80vh] overflow-hidden">
            <div className="flex flex-col items-center justify-center max-w-md w-full px-6">
                {/* Logo & Title */}
                <div className="mb-12 flex flex-col items-center">
                    <div className="animate-pulse bg-blue-50 p-6 rounded-full mb-6">
                        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <span className="material-symbols-outlined text-white text-5xl">
                                school
                            </span>
                        </div>
                    </div>
                    <h1 className="text-[#0d141b] text-4xl font-bold tracking-tight flex items-center gap-2">
                        CampusEase <span className="text-3xl">🌐</span>
                    </h1>
                    <p className="text-[#4c739a] text-sm mt-2 font-medium">
                        Your Sabaragamuwa University Companion
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-[240px] mb-8">
                    <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full animate-loading"
                            style={{ width: "40%" }}
                        ></div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="text-center h-16">
                    <p className="text-[#0d141b] text-lg font-medium animate-fade">
                        Finding the best boarding places near Pambahinna...
                    </p>
                    <p className="text-[#4c739a] text-xs mt-3 uppercase tracking-widest font-bold">
                        Please wait a moment
                    </p>
                </div>
            </div>

            {/* Tailwind CSS Animations */}
            <style>
                {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }

          @keyframes loading {
            0% { left: -40%; }
            100% { left: 100%; }
          }

          .animate-fade {
            animation: fadeInOut 3s infinite;
          }

          .animate-loading {
            animation: loading 2s ease-in-out infinite;
          }
        `}
            </style>
        </div>
    );
};

export default Loading;