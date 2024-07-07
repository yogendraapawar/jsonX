'use client';
import React, { MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import MonacoEditor from '../components/MonacoEditor';
import { PathManager } from '../helpers/findKeys';
import {
  resetKeys,
  resetPaths,
  setKeys,
  setPaths,
} from '@/redux/features/inputJsonDetailsSlice';
import PathList from '../components/PathList';
import Split from '@uiw/react-split';
import JsonFormatMenu from '../components/JsonFormatMenu';

function Page() {
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const paths = useSelector((state: RootState) => state.inputJsonReducer.paths);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    setInputValue(event.target.value);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // Dispatch actions to reset paths and keys
    dispatch(resetPaths());
    dispatch(resetKeys());
    const pathmanager = new PathManager();
    pathmanager.clearKeys();
    let result = pathmanager.penetrateJson(JSON.parse(code), inputValue);
    console.log('finl_result', result);
    // Dispatch actions to set final_paths and final_keys
    dispatch(setPaths(result));
    // dispatch(setKeys(Array.from(final_keys)));
    // Log final_keys for debugging
    // console.log("final_keys", final_keys);
  };

  return (
    <div className="w-screen bg-yellow h-full p-4">
      <Split>
        {/* Left column */}
        <div
          className={`relative w-full h-full overflow-hidden`}
        >
          <JsonFormatMenu/>
          <MonacoEditor />
          
        </div>

        {/* Right column */}
        <div className="w-full border flex flex-col h-full p-2 overflow-hidden">
          {/* <Menu/> */}
          <div className="p-4">
          <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Search for the key
                </label>
            <div className="flex w-full justify-between gap-2">
              <div className='w-full'>
                <div className="mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="key..."
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                className="px-3 py-1  mt-2 bg-teal-500 text-white border border-teal-500 rounded-md hover:bg-teal-600 focus:outline-none"
                onClick={handleButtonClick}
              >
                Continue
              </button>
            </div>
            <div className='flex justify-between'>
            <div className="text-xs mt-2">Found {paths.length} items</div>
            <div className="text-xs mt-2">Double click on path to copy to clipboard</div>
            </div>
            
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
