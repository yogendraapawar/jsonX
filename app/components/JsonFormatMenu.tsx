import {
    formatCode,
    minifyCode,
    parseCode,
    setCode,
    stringifyCode,
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
import {
    setFetchJsonfromUrl,
    setFileImportLoader,
    setShowLoadingPage,
} from '@/redux/features/visibilityStatusSlice';
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

    function handleStringifyClick(): void {
        try {
            dispatch(stringifyCode(null));
        } catch (error: any) {
            dispatch(showToast(error.message));
            setTimeout(() => {
                dispatch(hideToast(null));
            }, 1000);
        }

        console.log('format clicked');
    }

    function handleMinifyClick(): void {
        try {
            dispatch(minifyCode(null));
        } catch (error: any) {
            dispatch(showToast(error.message));
            setTimeout(() => {
                dispatch(hideToast(null));
            }, 1000);
        }

        console.log('minify clicked');
    }

    function handleImportClick(): void {
        dispatch(setShowLoadingPage(true));
        dispatch(setLoadingPageMessage('Importing file'));
        const fileInput = document.getElementById(
            'jsonFileInput'
        ) as HTMLInputElement;

        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
            const input = event.target;

            if (!input || !input.files || input.files.length === 0) {
                dispatch(setShowLoadingPage(false));
                return;
            }

            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                try {
                    const content = e.target?.result as string;
                    console.log('Parsed JSON object:', content, typeof content);
                    const jsonObject = content;
                    dispatch(setCode(jsonObject));
                    console.log('Parsed JSON object:', jsonObject);
                    dispatch(setShowLoadingPage(false));
                    dispatch(setLoadingPageMessage('Loading...'));
                    // Handle the parsed JSON object as needed
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                    dispatch(showToast('Error parsing JSON file'));
                    dispatch(setShowLoadingPage(false));
                    dispatch(setLoadingPageMessage('Loading...'));
                    setTimeout(() => {
                        dispatch(hideToast(null));
                    }, 1000);
                }
            };

            reader.readAsText(file);
        };

        const onCloseFileInput = () => {
            // Cleanup if user cancels file selection
            dispatch(setShowLoadingPage(false));
            dispatch(setLoadingPageMessage('Loading...'));
        };

        // @ts-ignore
        fileInput.addEventListener('change', onChange);
        fileInput.addEventListener('cancel', onCloseFileInput); // Assuming 'cancel' event

        fileInput.click(); // Simulate click to trigger file selection

        console.log('import clicked');
    }

    function handleFetchJsonFromUrlClick(): void {
        dispatch(setFetchJsonfromUrl(null));
        // Implement URL fetch functionality
    }

    return (
        <div className="flex w-full items-center mb-2 dark:text-white">
            <div className="flex justify-end gap-4 items-center">
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
                    onclick={handleStringifyClick}
                    icon={stringifyIcon}
                />
                <Button
                text='Minify'  
                onclick={handleMinifyClick}
                icon={webIcon}/>
                <Button
                    text="Import"
                    onclick={handleImportClick}
                    icon={importFileIcon}
                />
            </div>

            <input
                id="jsonFileInput"
                type="file"
                style={{ display: 'none' }}
                accept=".json"
            />
        </div>
    );
}

export default JsonFormatMenu;

type ButtonProps = {
    text: string;
    onclick: () => void;
    icon: StaticImageData | null;
};

export function Button(props: ButtonProps) {
    return (
        <div
            onClick={props.onclick}
            className="flex flex-col items-center cursor-pointer gap-1 rounded-md w-20 px-1 py-1 bg-blue-500 dark:bg-blue-500 shadow-md"
        >
            <div className="text-[10px] font-medium uppercase text-white">
                {props.text}
            </div>
        </div>
    );
}
