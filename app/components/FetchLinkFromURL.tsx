import { fetchJsonFromURL } from '@/redux/features/codeSlice';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import downloadIcon from '@/public/icons/toolbarIcons/downloadIcon.svg';
import { RootState } from '@/redux/store';
import { OutLinedButton } from './OutLinedButton';

function FetchLinkFromURL() {
    const [url, setUrl] = useState<string>('');
    const dispatch = useDispatch();

    function handleUrlInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setUrl(event.target.value);
    }

    async function handleUrlSubmit(
        event: FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        if (url.trim() === '') {
            return;
        }

        try {
            // @ts-ignore
            await dispatch(fetchJsonFromURL(url));
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }

    return (
        <form onSubmit={handleUrlSubmit} className="w-full">
            <div className="flex w-full justify-between items-center gap-2">
                {/* Correct placement of form tag */}
                <div className="rounded-md shadow-sm w-full">
                    <input
                        type="text"
                        name="url"
                        id="url"
                        className="block border w-full rounded-md py-1 pl-4 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none "
                        placeholder="Enter URL..."
                        value={url}
                        onChange={handleUrlInputChange}
                    />
                </div>
                <OutLinedButton
                    text={'Load'}
                    onclick={handleUrlSubmit}
                    icon={null}
                />
            </div>
        </form>
    );
}

export default FetchLinkFromURL;
