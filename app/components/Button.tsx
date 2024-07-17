import { color } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { FormEvent, useState } from "react";

type ButtonProps = {
    text: string;
    onclick: () => void | ((event: FormEvent<HTMLFormElement>) => Promise<void>);
    icon: StaticImageData;
    color:string
};

export default function Button(props: ButtonProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        // After 1 second, reset isClicked state to false
        setTimeout(() => {
            setIsClicked(false);
        }, 90);
    };
    return (
        <div className="bg-black p-[2px]">
            <div
                className={`custom-shadow rounded-md h-[45px] w-[60px] flex flex-col z-10 ${
                    isClicked ? 'no-shadow' : ''
                }`}
                style={{backgroundColor:props.color}}
                onClick={() => {
                    props.onclick();
                    handleClick();
                }}
            >
                <div className="flex-1 text-[10px] font-normal text-white pl-1 py-1" style={{userSelect:'none'}}>
                    {props.text.toUpperCase()}
                </div>
                <div className="pl-1 pb-1 " style={{userSelect:'none'}}>
                    <Image
                        src={props.icon}
                        alt={'icon'}
                        width={15}
                        height={15}
                    />
                </div>
            </div>
        </div>
    );
}
