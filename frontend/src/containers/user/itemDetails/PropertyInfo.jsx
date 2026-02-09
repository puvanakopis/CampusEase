import React from 'react';

const PropertyInfo = ({ title, subtitle, tags, description }) => {
    return (
        <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-center py-6 border-b border-slate-200">
                <div>
                    <h2 className="text-xl font-semibold mb-1">{title}</h2>
                    <p className="text-slate-500">{subtitle}</p>
                </div>
                <div
                    className="bg-center bg-cover rounded-full h-14 w-14 border border-slate-200"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCll1WbBJ4WI7cUN_WpLkkhIpq6OU3LynAzcTtVe3s769F5dbHZYqqFbgl0P5gGzA2dlUtz1tTJ62rqKPV_F0tQEDBxI1AN1JOaX00jvRR8h4UYttxQXrCaoCbdcY6eUn03HPJ-CZ92OJQpit3aGai0kZnw5EETG6f1EXRdw5OxOHgzjMJ7Y2JghbwtO4RK8TXqpcjVgVWm-my4CZtIaqtnXgr0rw04tHGzRNp5vHxc5K0B0CCWKYTfHTj3M9DPjJ6JLdTXsOp9Bsg")' }}
                ></div>
            </div>

            <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className={`flex items-center gap-2 px-3 py-1.5 ${tag.bg} ${tag.textColor} rounded-md border ${tag.border}`}
                    >
                        <span className="material-symbols-outlined text-lg">{tag.icon}</span>
                        <span className="text-sm font-medium">{tag.text}</span>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-bold mb-4">About this place</h3>
                <div className="prose prose-slate max-w-none text-slate-600">
                    {description.paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-4">
                            {paragraph}
                        </p>
                    ))}
                </div>
                <button
                    className="flex items-center gap-1 mt-2 font-semibold decoration-primary text-slate-900 hover:text-primary transition-colors"
                >
                    Show more
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default PropertyInfo;