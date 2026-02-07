import React from 'react';

const MissionSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-black mb-6">Our Mission</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-10 italic">
                        "To revolutionize the student experience at SUSL by providing an integrated digital ecosystem that simplifies finding quality accommodation and reliable transport, allowing students to focus on what matters most: their education."
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                        <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                            <span className="material-symbols-outlined text-blue-600 text-3xl shrink-0">home_work</span>
                            <div>
                                <h4 className="font-bold mb-2">Safe Housing</h4>
                                <p className="text-sm text-gray-600">Ensuring every student has access to affordable and secure living spaces near Pambahinna.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                            <span className="material-symbols-outlined text-blue-600 text-3xl shrink-0">commute</span>
                            <div>
                                <h4 className="font-bold mb-2">Smart Commute</h4>
                                <p className="text-sm text-gray-600">Streamlining transportation options to and from the Belihuloya region for the university community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;