import { formatCode, parseCode, setCode } from '@/redux/features/codeSlice';
import { hideToast, showToast } from '@/redux/features/toastSlice';
import { AppDispatch } from '@/redux/store';
import React, { ChangeEvent, useState } from 'react';
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
import Button from '@/app/components/Button'

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
        dispatch(setShowLoadingPage(true));
        dispatch(setLoadingPageMessage('Importing file'));
        const fileInput = document.getElementById(
            'jsonFileInput'
        ) as HTMLInputElement;

        const onChange = (event: ChangeEvent<HTMLInputElement>) => {
            const input = event.target;

            if (!input || !input.files || input.files.length === 0) {
                dispatch(setShowLoadingPage(false))
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
        // dispatch(setFetchJsonfromUrl(null));
        // Implement URL fetch functionality
    }

    return (
        <div className="flex justify-end w-full items-center py-2 pr-4">
            <FetchLinkFromURL />
            <div className="flex justify-end gap-4 items-center py-2 pl-4">
                <Button
                    text="Parse"
                    onclick={handleParseClick}
                    icon={parseIcon}
                    color={"#FF3C00"}
                />
                <Button
                    text="Format"
                    onclick={handleFormatClick}
                    icon={formatIcon}
color={"#FF3C00"}
                />
                <Button
                    text="Stringify"
                    onclick={handleFormatClick}
                    icon={stringifyIcon}
color={"#FF3C00"}
                />

                <Button
                    text="Import"
                    onclick={handleImportClick}
                    icon={importFileIcon}
                    color={"#FF3C00"}
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