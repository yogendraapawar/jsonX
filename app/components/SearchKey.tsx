import React, { FormEventHandler, useState } from 'react'; // Import useState if needed
import ComboBox from './AutoComplete';
import { resetPaths, setPaths } from '@/redux/features/codeSlice';
import { setSelectedPathIndex } from '@/redux/features/codeSlice';
import { PathManager } from '../helpers/findKeys';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setLoadingSearchingPaths } from '@/redux/features/visibilityStatusSlice';

function SearchKey() {
    const dispatch = useDispatch<AppDispatch>();
    const loadingSearchingPaths = useSelector(
        (state: RootState) => state.visibilityStatusSlice.loadingSearchingPaths
    );
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick: FormEventHandler<HTMLFormElement> = (
        event
    ) => {
        event.preventDefault();
        dispatch(setLoadingSearchingPaths(true)); 
        setButtonLoading(true); 

        try {
            dispatch(resetPaths());
            dispatch(setSelectedPathIndex(null));
            const pathManager = new PathManager();
            pathManager.clearKeys();
            dispatch(setPaths());
        } catch (error) {
            console.error('Error searching paths:', error);
        } finally {
            setButtonLoading(false);
        }
    };

    return (
        <div className="relative bg-[#b6b4b2]">
            <div className="py-4">
                <label
                    htmlFor="price"
                    className="block text-sm font-normal leading-6 text-gray-900 px-4 uppercase"
                >
                    Search for the key
                </label>

                <form onSubmit={handleButtonClick}>
                    
                        <div className="w-full">
                            <div className="rounded-md shadow-sm">
                                <ComboBox />
                            </div>
                        </div>
                        <div className='w-full flex justify-end mt-4 px-4'>
                        <div className="flex justify-between w-full">
                    <div className="text-xs mt-2 uppercase">
                        Double click on path to copy to clipboard
                    </div>
                </div>
                        <div className="p-[2px] bg-black">
                            <button
                                type="submit"
                                className={`find-button-shadow text-white pl-1 py-1 w-[90px] z-10 h-[30px] bg-[#1c1c1c] text-[10px] rounded-md focus:outline-none ${isClicked ? 'no-shadow' : ''}`}
                                onClick={()=>{
                                    console.log("clicked find")
                                    setIsClicked(true);
                                    setTimeout(() => {
                                        setIsClicked(false);
                                    }, 100);
                                }}
                            >
                                FIND
                            </button>
                            </div>
                        </div>
                </form>

                
            </div>
        </div>
    );
}

export default SearchKey;
