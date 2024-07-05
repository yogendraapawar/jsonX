"use client"
import React, { MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import MonacoEditor from '../components/MonacoEditor';
import { findKeys } from '../helpers/findKeys';
import { resetKeyPaths, setKeyPaths } from '@/redux/features/keyPathSlice';
import PathList from '../components/PathList';
import Split from '@uiw/react-split';

function Page() {
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const keyPaths = useSelector((state: RootState) => state.keyPathSlice.path);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(resetKeyPaths());
    dispatch(setKeyPaths(findKeys(JSON.parse(code), inputValue)));
  };

  return (
    <div className="w-screen bg-yellow h-full p-4">
      <Split>
        {/* Left column */}
        <div
          className={`w-full ${
            true ? 'border-green-600 border-e-8' : 'border-e-8 border-red-600'
          } h-full`}
        >
          <MonacoEditor />
        </div>

        {/* Right column */}
        <div className="w-full border border-black flex flex-col h-full">
          <div className="p-4">
            <div className="text-sm mb-2">Enter a key to find</div>
            <div className="flex w-full justify-between gap-2">
              <input
                id="keyInput"
                type="text"
                className="w-full px-3 py-1 border-2 text-xs"
                placeholder="search for a key..."
                value={inputValue}
                onChange={handleInputChange}
              />

              <button
                className="px-3 py-1 bg-teal-500 text-white border border-teal-500 rounded-md hover:bg-teal-600 focus:outline-none"
                onClick={handleButtonClick}
              >
                Continue
              </button>
            </div>
            <div className="text-xs mt-2">Found {keyPaths.length} items</div>
          </div>

          <div className="h-full p-4 overflow-y-auto">
            <PathList />
          </div>
        </div>
      </Split>
    </div>
  );
}

export default Page;
