import { fetchJsonFromURL } from '@/redux/features/codeSlice';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import downloadIcon from '@/public/icons/toolbarIcons/downloadIcon.svg'
import { RootState } from '@/redux/store';
import CircularButton from './CircularButton';
import Button from '@/app/components/Button';

function FetchLinkFromURL() {
    const [url, setUrl] = useState<string>('');
    // const isVisible=useSelector((state:RootState)=>state.visibilityStatusSlice.fetchJsonFromUrl)
    const dispatch = useDispatch();

    function handleUrlInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setUrl(event.target.value);
    }

    async function handleUrlSubmit(): Promise<void> {
        if (url.trim() === '') {
            return; // Handle empty URL input case if needed
        }
        
        try {
            // Dispatch your async action here
            // @ts-ignore
            await dispatch(fetchJsonFromURL(url));
        } catch (error) {
            console.error('Error fetching JSON:', error);
            // Handle error if needed
        }
    }

    return (
        
        <form onSubmit={handleUrlSubmit} className="w-full"> 
        <div className="flex w-full justify-between items-center gap-2">
            {/* Correct placement of form tag */}
                <div className="relative  shadow-sm w-full">
                <div className="absolute left-0 bg-[#454547] h-full z-10 w-[10px] "></div>
                <div className="absolute right-0 bg-[#29292c] h-full z-10 w-[10px]"></div>
                    <input
                        type="text"
                        name="url"
                        id="url"
                        className="text-white w-full rounded-md border-0 py-3 pl-4 pr-4 focus:outline-none input-box-shadow bg-black sm:text-sm sm:leading-6"
                        placeholder="Enter URL..."
                        value={url}
                        onChange={handleUrlInputChange}
                    />
                </div>
                <Button onclick={handleUrlSubmit} text={"FETCH"} icon={downloadIcon} color={"#b3b1b0"}/>
            
        </div>
        </form>
    );
}

export default FetchLinkFromURL;
