import React from "react";

const StudentTestimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Chisom Okorie",
            university: "EBSU",
            text: "Found my apartment and roommate in just two days with campusEase!",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&auto=format&fit=crop&crop=face",
            rating: 5
        },
        {
            id: 2,
            name: "Femi Adebayo",
            university: "LASU",
            text: "I found affordable gadgets and even sold my old phone through the CampusEase marketplace. It's the best place for student deals!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&crop=face",
            rating: 5
        },
        {
            id: 3,
            name: "Hene Ugnong",
            university: "UNICAL",
            text: "Such a lifesaver for off-campus housing searches!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop&crop=face",
            rating: 5
        },
        {
            id: 4,
            name: "Priya Sharma",
            university: "SUSL",
            text: "The transport service saved me so much time getting to campus from Belihuloya. Highly recommended!",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop&crop=face",
            rating: 5
        },
    ];

    return (
        <section className="px-4 my-20 md:px-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">What Students Say</h2>
                <p className="text-slate-600 text-lg">Join thousands of satisfied users</p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-primary/50 transition-shadow group"
                    >
                        {/* Rating Stars */}
                        <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                                <span key={i} className="material-symbols-outlined text-yellow-400 text-sm">
                                    star
                                </span>
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-slate-700 italic mb-6 text-sm leading-relaxed">
                            "{testimonial.text}"
                        </p>

                        {/* Student Info */}
                        <div className="flex items-center gap-3">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <div>
                                <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                                <p className="text-slate-600 text-sm">{testimonial.university}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 bg-gradient-to-r from-primary/5 to-blue-50 rounded-2xl p-8 border border-primary/10 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to Simplify Your Campus Life?</h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    Join thousands of SUSL students who've found their perfect accommodation and transport solutions
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
                        Find Accommodation
                    </button>
                    <button className="px-8 py-3 border border-primary/30 hover:bg-primary/10 text-primary font-semibold rounded-lg transition-colors">
                        Browse Transport Options
                    </button>
                </div>
                <p className="text-slate-600 text-sm mt-6">
                    No hidden fees • Verified listings • Student discounts available
                </p>
            </div>

        </section>
    );
};

export default StudentTestimonials;