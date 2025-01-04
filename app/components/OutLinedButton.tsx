import { StaticImageData } from 'next/image';
import React, { FormEvent } from 'react';
import { text } from 'stream/consumers';

type ButtonProps = {
    text: string | null;
    onclick: any;
    icon: StaticImageData | null;
};

export function OutLinedButton(props: ButtonProps) {
    return (
        <div
            onClick={props.onclick}
            className="flex flex-col items-center cursor-pointer gap-1 rounded-md w-20 px-1 py-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-shadow shadow-md"
        >
            {/* Render icon if it's provided */}
            {props.icon && (
                <img src={props.icon.src} alt="icon" className="w-5 h-5" />
            )}
            {props.text && (
                <div className="text-[11px] font-medium uppercase">
                    {props.text}
                </div>
            )}
        </div>
    );
}
