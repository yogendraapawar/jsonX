'use client';
import React, { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import MonacoEditor from '../components/MonacoEditor';
import { PathManager } from '../helpers/findKeys';
import {
    resetKeys,
    resetPaths,
    setKeys,
    setPaths,
} from '@/redux/features/codeSlice';
import PathList from '../components/PathList';
import JsonFormatMenu from '../components/JsonFormatMenu';
import { setSelectedPathIndex } from '@/redux/features/codeSlice';
import FetchLinkFromURL from '../components/FetchLinkFromURL';
import Split from '@uiw/react-split';
import ComboBox from '../components/AutoComplete';
import SearchKey from '../components/SearchKey';
import SelectedPathView from '../components/SelectedPathView';
import LoadingPage from '../components/LoadingPage';

function Page() {

    return (
        <div className="relative bg-yellow h-screen w-screen bg-[#e5e5e5] rounded-md p-6">
            <div className='h-full w-full outer-shadow rounded-md'>
            <LoadingPage/>
            <Split className=''>
                {/* Left column */}
                <div className={`flex flex-col w-[70%] h-full overflow-hidden bg-[#b6b4b2] main-container-left-top-shadow rounded-md`}>
                    <MonacoEditor />
                </div>

                {/* Right column */}
                <div className='h-full w-[30%] main-container-left-top-shadow rounded-md bg-[#b6b4b2]'>
                <Split mode="vertical">
                    <div className="w-full flex flex-col h-full overflow-hidden">
                        <SearchKey/>
                        <div className="h-full pb-4 overflow-auto ">
                            <PathList />
                        </div>
                    </div>
                    <SelectedPathView/>
                </Split>
                </div>
            </Split>
            </div>
        </div>
    );
}

export default Page;
