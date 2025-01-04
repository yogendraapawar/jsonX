import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import scanninng_file from '@/public/icons8-portrait-mode-scanning.gif';

function LoadingPage() {
    const loadingPageMessage = useSelector(
        (state: RootState) => state.otherVariables.loadingPageMessage
    );
    const showLoadingPage = useSelector(
        (state: RootState) => state.visibilityStatusSlice.showLoadingPage
    );
    return (
        showLoadingPage && (
            <div className="absolute w-full h-full z-50 ">
                <div className="flex flex-col gap-4 w-full text-xs font-semibold h-full items-center justify-center uppercase">
                    <div>
                        <Image src={scanninng_file} alt="" />
                    </div>
                    <div> {loadingPageMessage}</div>
                </div>
            </div>
        )
    );
}

export default LoadingPage;
