import {
    formatCode,
    parseCode,
    setCode,
} from '@/redux/features/codeSlice';
import { hideToast, showToast } from '@/redux/features/toastSlice';
import { AppDispatch } from '@/redux/store';
import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import Image, { StaticImageData } from 'next/image';
import formatIcon from '@/public/icons/toolbarIcons/format.svg';
import parseIcon from '@/public/icons/toolbarIcons/parse.svg';
import stringifyIcon from '@/public/icons/toolbarIcons/stringify.svg';
import webIcon from '@/public/icons/toolbarIcons/webIcon.svg';
import FetchLinkFromURL from './FetchLinkFromURL';
import importFileIcon from '@/public/icons/toolbarIcons/import.svg';
import { setFetchJsonfromUrl, setFileImportLoader, setShowLoadingPage } from '@/redux/features/visibilityStatusSlice';
import { setLoadingPageMessage } from '@/redux/features/otherVariables';

function JsonFormatMenu() {
    const dispatch = useDispatch<AppDispatch>();

    function handleParseClick(): void {
        try {
            dispatch(parseCode(null));
        } catch (error: any) {
            dispatch(showToast(error.message));
            setTimeout(() => {
                dispatch(hideToast(null));
            }, 1000);
        }

        console.log('parse clicked');
    }

    function handleFormatClick(): void {
        try {
            dispatch(formatCode(null));
        } catch (error: any) {
            dispatch(showToast(error.message));
            setTimeout(() => {
                dispatch(hideToast(null));
            }, 1000);
        }

        console.log('format clicked');
    }

    function handleImportClick(): void {
        dispatch(setShowLoadingPage(true))
        dispatch(setLoadingPageMessage("Importing file"))
        const fileInput = document.getElementById('jsonFileInput') as HTMLInputElement;

        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
            
            const input = event.target;
            
            if (!input || !input.files || input.files.length === 0) {
                return;
            }
            
            const file = input.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                try {
                    const content = e.target?.result as string;
                    console.log('Parsed JSON object:', content, typeof content);
                    const jsonObject = content;
                    dispatch(setCode(jsonObject))
                    console.log('Parsed JSON object:', jsonObject);
                    dispatch(setShowLoadingPage(false));
                    dispatch(setLoadingPageMessage("Loading..."));
                    // Handle the parsed JSON object as needed
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                    dispatch(showToast('Error parsing JSON file'));
                    dispatch(setShowLoadingPage(false));
                    dispatch(setLoadingPageMessage("Loading..."));
                    setTimeout(() => {
                        dispatch(hideToast(null));
                    }, 1000);
                }
            };
    
            reader.readAsText(file);
            
        };
        // @ts-ignore
        fileInput.addEventListener('change', onChange);
        fileInput.click(); // Simulate click to trigger file selection

        console.log('import clicked');
    }

    function handleFetchJsonFromUrlClick(): void {
        dispatch(setFetchJsonfromUrl(null))
        // Implement URL fetch functionality
    }

    return (
        <div className="flex justify-end w-full items-center py-2">
            <FetchLinkFromURL/>
            <div className="flex justify-end px-4 gap-4 items-center py-2">
                <Button
                    text="Parse"
                    onclick={handleParseClick}
                    icon={parseIcon}
                />
                <Button
                    text="Format"
                    onclick={handleFormatClick}
                    icon={formatIcon}
                />
                <Button
                    text="Stringify"
                    onclick={handleFormatClick}
                    icon={stringifyIcon}
                />
                <Button
                    text="URL"
                    onclick={handleFetchJsonFromUrlClick}
                    icon={webIcon}
                />
                <Button
                    text="Import"
                    onclick={handleImportClick}
                    icon={importFileIcon}
                />
            </div>
            
            <input id="jsonFileInput" type="file" style={{display: 'none'}} accept=".json" />
        </div>
    );
}

export default JsonFormatMenu;

type ButtonProps = {
    text: string;
    onclick: () => void;
    icon: StaticImageData;
};

function Button(props: ButtonProps) {
    return (
        <div
            onClick={props.onclick}
            className="flex flex-col items-center cursor-pointer gap-1"
        >
            <div>
                <Image src={props.icon} alt={'icon'} width={15} height={15} />
            </div>
            <div className="text-xs font-medium">{props.text}</div>
        </div>
    );
}
