import React, { FormEventHandler, useState } from 'react';
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
    const paths = useSelector(
        (state: RootState) => state.codeReducer.paths
    ) as (string | number | object)[][];
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleButtonClick: FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        setButtonLoading(true);
        dispatch(setLoadingSearchingPaths(true));

        try {
            dispatch(resetPaths());
            dispatch(setSelectedPathIndex(null));
            const pathManager = new PathManager();
            pathManager.clearKeys();
            setTimeout(() => {
                dispatch(setPaths());
                setButtonLoading(false); // Stop button loading after completion
                dispatch(setLoadingSearchingPaths(false)); // Stop loading state
            }, 1000);
        } catch (error) {
            console.error('Error searching paths:', error);
            setButtonLoading(false); // Stop button loading on error
            dispatch(setLoadingSearchingPaths(false)); // Stop loading state on error
        }
    };

    return (
        <div className="relative">
            <div className="">
                <label
                    htmlFor="price"
                    className="block text-xs font-medium leading-6 uppercase"
                >
                    Search for the key
                </label>

                <form onSubmit={handleButtonClick}>
                    <div className="flex w-full justify-between gap-2">
                        <ComboBox />
                        <Button
                            onClick={handleButtonClick}
                            load={buttonLoading}
                        />
                    </div>
                </form>

                <div className="flex justify-between mb-2">
                    <div className="text-xs mt-2">
                        Found items {paths?.length ?? 0}
                    </div>
                    <div className="text-xs mt-2">
                        Double click on path to copy to clipboard
                    </div>
                </div>
            </div>
        </div>
    );
}

function Button({ load, onClick }: { load: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="px-3 h-full py-0.5 bg-blue-500 text-white border-blue-400 rounded-md hover:bg-blue-400 focus:outline-none"
            disabled={load} // Disable the button when loading
        >
            {load ? 'Loading...' : 'Search'}
        </button>
    );
}

export default SearchKey;
