import React, { useState } from "react";

type FAQItemProps = {
    number: number;
    question: string;
    children: React.ReactNode;
};

export function FAQItem({ number, question, children }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-primary-20 hover:bg-primary-30 transition-all duration-200 text-left border border-primary-40 group"
            >
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 text-white font-semibold text-sm">
                    {number}
                </span>
                <span className="flex-1 text-grey-90 font-medium">{question}</span>
                <svg
                    className={`w-5 h-5 text-primary-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="mt-1 p-4 pl-16 rounded-lg bg-grey-20 border border-grey-30 text-grey-80">
                    {children}
                </div>
            )}
        </div>
    );
}

type FAQProps = {
    children: React.ReactNode;
};

export function FAQ({ children }: FAQProps) {
    return (
        <div className="my-6">
            {children}
        </div>
    );
}

export default FAQ;
