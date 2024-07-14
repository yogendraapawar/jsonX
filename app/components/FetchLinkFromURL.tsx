import { fetchJsonFromURL } from '@/redux/features/codeSlice';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import downloadIcon from '@/public/icons/toolbarIcons/downloadIcon.svg'
import { RootState } from '@/redux/store';

function FetchLinkFromURL() {
    const [url, setUrl] = useState<string>('');
    const isVisible=useSelector((state:RootState)=>state.visibilityStatusSlice.fetchJsonFromUrl)
    const dispatch = useDispatch();

    function handleUrlInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setUrl(event.target.value);
    }

    async function handleUrlSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault(); // Prevent default form submission
        if (url.trim() === '') {
            return; // Handle empty URL input case if needed
        }
        
        try {
            // Dispatch your async action here
            await dispatch(fetchJsonFromURL(url));
        } catch (error) {
            console.error('Error fetching JSON:', error);
            // Handle error if needed
        }
    }

    return (
        isVisible &&
        <form onSubmit={handleUrlSubmit} className="w-full"> 
        <div className="flex w-full justify-between items-center gap-2">
            {/* Correct placement of form tag */}
                <div className="rounded-md shadow-sm w-full">
                    <input
                        type="text"
                        name="url"
                        id="url"
                        className="block w-full rounded-md border-0 py-1 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter URL..."
                        value={url}
                        onChange={handleUrlInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className=" px-3 py-1 text-white hover:bg-teal-600 focus:outline-none"
                >
                    <Image src={downloadIcon} alt='' height={30}/>
                </button>
            
        </div>
        </form>
    );
}

export default FetchLinkFromURL;
