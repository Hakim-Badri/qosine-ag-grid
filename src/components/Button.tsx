import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export default function Button({ children, ...rest }: Props) {
    return (
        <button
            {...rest}
            className={`px-4 py-2 rounded-md shadow-sm bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60 ${rest.className ?? ""}`}
        >
            {children}
        </button>
    );
}
