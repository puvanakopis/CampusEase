import React from "react";

const Breadcrumbs = ({ items }) => (
    <nav className="flex mb-6 text-sm font-medium text-slate-500">
        <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <li>
                        {item.link ? (
                            <a className="hover:text-primary transition-colors" href={item.link}>
                                {item.label}
                            </a>
                        ) : (
                            <span className="text-slate-900">{item.label}</span>
                        )}
                    </li>
                    {index < items.length - 1 && (
                        <li>
                            <span className="text-slate-300">/</span>
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ol>
    </nav>
);

export default Breadcrumbs;