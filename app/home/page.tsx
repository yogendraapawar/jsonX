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
        <div className="relative w-screen bg-yellow h-full p-4 ">
            <LoadingPage/>
            <Split>
                {/* Left column */}
                <div className={`flex flex-col w-[70%] h-full overflow-hidden`}>
                    <MonacoEditor />
                </div>

                {/* Right column */}
                <div className='h-full w-[30%]'>
                <Split mode="vertical">
                    <div className="w-full border flex flex-col h-full overflow-hidden">
                        <SearchKey/>
                        <div className="h-full pb-4 overflow-auto bg-[#b6b4b2]">
                            <PathList />
                        </div>
                    </div>
                    <SelectedPathView/>
                </Split>
                </div>
            </Split>
        </div>
    );
}

export default Page;
