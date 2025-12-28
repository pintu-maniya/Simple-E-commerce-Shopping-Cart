import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success' }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!show) return null;

    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-600',
    };

    return (
        <div className={`fixed top-5 right-5 z-50 text-white px-6 py-3 rounded shadow-lg ${colors[type]}`}>
            {message}
        </div>
    );
}
