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
    const handleButtonClick: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        dispatch(setLoadingSearchingPaths(true)); // Start loading state
        setButtonLoading(true); // Set loading to true immediately
    
        try {
            dispatch(resetPaths());
            dispatch(setSelectedPathIndex(null));
            const pathManager = new PathManager();
            pathManager.clearKeys();
            dispatch(setPaths())
            
        } catch (error) {
            console.error('Error searching paths:', error);
        } finally {
            setTimeout(() => {
                setButtonLoading(false);
            }, 3000);
           
            // Set loading to false after completion

        }
    };
    
    return (
        <div className="relative">
            <div className="p-4">
                <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Search for the key
                </label>

                <form onSubmit={handleButtonClick}>
                    <div className="flex w-full justify-between gap-2">
                        <div className="w-full">
                            <div className="mt-2 rounded-md shadow-sm">
                                <ComboBox />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="px-3 py-1 mt-2 bg-teal-500 text-white border border-teal-500 rounded-md hover:bg-teal-600 focus:outline-none"
                        >
                            {buttonLoading ? '...' : 'Continue'}
                        </button>
                    </div>
                </form>

                <div className="flex justify-between">
                    <div className="text-xs mt-2">
                        Found items
                    </div>
                    <div className="text-xs mt-2">
                        Double click on path to copy to clipboard
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchKey;
