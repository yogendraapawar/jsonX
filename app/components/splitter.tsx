import React, { useState, useRef } from 'react';

const HorizontalSplitter = () => {
    const [leftWidth, setLeftWidth] = useState('50%');
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;
        // @ts-ignore
        const containerWidth = containerRef?.current?.offsetWidth;
        const newLeftWidth = (e.clientX / containerWidth) * 100;
        setLeftWidth(`${newLeftWidth}%`);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="flex h-screen"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="bg-blue-500" style={{ width: leftWidth }}></div>
            <div
                className="bg-gray-500 w-2 cursor-col-resize"
                onMouseDown={handleMouseDown}
            ></div>
            <div className="bg-red-500 flex-1"></div>
        </div>
    );
};
