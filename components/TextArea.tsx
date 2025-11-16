import React, { ChangeEvent } from "react";

interface TextAreaProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ value, onChange }: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder="Paste your text here..."
            className="w-full p-3 border rounded-lg focus:outline-none h-40"
        />
    );
}
