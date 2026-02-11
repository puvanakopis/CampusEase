import React from "react";

const MapSection = () => (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-sm border border-[#e7edf3] mb-20">

        <iframe
            title="Office Map"
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.392540645362!2d80.79209357581793!3d6.716575921877168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae46f2d607eb4e1%3A0xe778f8f797e04488!2sFaculty%20of%20Computing%20-%20SUSL!5e0!3m2!1sen!2slk!4v1707749233891!"
        ></iframe>

        <div className="absolute bottom-6 left-6 md:left-10 md:bottom-10 max-w-[340px] bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-sm">
            <h4 className="text-primary font-bold text-lg mb-2">Visit Our Office</h4>
            <p className="text-sm font-medium mb-4 leading-relaxed">
                Faculty of Computing, <br />
                Sabaragamuwa University of Sri Lanka, <br />
                Pambahinna, Belihuloya, 70140.
            </p>
            <a
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                href="https://www.google.com/maps/dir/?api=1&destination=Faculty+of+Computing+Sabaragamuwa+University"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="material-symbols-outlined text-[20px]">directions</span>
                Get Directions
            </a>
        </div>

        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-primary text-white p-2 rounded-full shadow-lg ring-4 ring-primary/20 animate-pulse">
                <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <div className="w-1 h-4 bg-primary rounded-full -mt-1 shadow-md"></div>
            <div className="bg-primary/20 w-8 h-2 rounded-full blur-[2px] mt-1"></div>
        </div>
    </div>
);

export default MapSection;