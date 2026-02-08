import React from "react";

const Breadcrumbs = () => (
    <nav className="flex mb-6 text-sm font-medium text-slate-500">
        <ol className="flex items-center space-x-2">
            <li>
                <a className="hover:text-primary transition-colors" href="#">
                    Home
                </a>
            </li>
            <li>
                <span className="text-slate-300">/</span>
            </li>
            <li>
                <a className="hover:text-primary transition-colors" href="#">
                    Belihuloya
                </a>
            </li>
            <li>
                <span className="text-slate-300">/</span>
            </li>
            <li>
                <span className="text-slate-900">
                    Student Annex near SUSL Main Gate
                </span>
            </li>
        </ol>
    </nav>
);

export default Breadcrumbs;