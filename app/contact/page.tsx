"use client";

import { useState } from "react";

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! (demo functionality)");
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full p-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Your message"
                    className="w-full p-3 border rounded h-32"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
