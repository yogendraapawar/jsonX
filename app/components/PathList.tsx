'use client';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processResultSeperately } from '../helpers/findKeys';
import path from 'path';
import { hideToast, showToast } from '@/redux/features/toastSlice';
import { setSelectedPathIndex, setSelectedPathKeyValue } from '@/redux/features/codeSlice';

function PathList() {
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const dispatch = useDispatch<AppDispatch>();
  const selectedPathIndex = useSelector((state: RootState) => state.codeReducer.selectedPathIndex);

  const paths = useSelector(
    (state: RootState) => state.codeReducer.paths
  ) as (string | number | object)[][];

  const handlePathClick = useCallback(
    (index: number) => {
      console.log(paths[index]);
      dispatch(setSelectedPathIndex(index))
      dispatch(setSelectedPathKeyValue({ pathArray: paths[index], code: code }));
    
    },
    [paths, code, dispatch]
  );

  const handleDoubleClick=useCallback((index:number)=>{
    let textToCopy = processResultSeperately(paths[index]);
    
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard:', textToCopy);
        dispatch(showToast('Copied path to clipboard'));
        setTimeout(() => {
          dispatch(hideToast(null));
        }, 1000);
      })
      .catch((err) => {
        console.error('Failed to copy text to clipboard:', err);
        // Handle error if clipboard write fails
      });
  },[dispatch, paths])

  // function handleDoubleClick(
  //   event: React.MouseEvent<Element, MouseEvent>,
  //   index: number
  // ): void {
  //   let textToCopy = processResultSeperately(paths[index]);
    
  //   navigator.clipboard
  //     .writeText(textToCopy)
  //     .then(() => {
  //       console.log('Text copied to clipboard:', textToCopy);
  //       dispatch(showToast('Copied path to clipboard'));
  //       setTimeout(() => {
  //         dispatch(hideToast(null));
  //       }, 1000);
  //     })
  //     .catch((err) => {
  //       console.error('Failed to copy text to clipboard:', err);
  //       // Handle error if clipboard write fails
  //     });
  // }

  
  return (
    <div className='relative input-inner-shadow bg-black h-full overflow-auto  input-box-shadow w-full'>
      <div className="absolute left-0 bg-[#454547] h-full z-10 w-[10px] "></div>
      <div className="absolute right-0 bg-[#29292c] h-full z-10 w-[10px]"></div>
      {paths.length === 0 ? (
  <div className="absolute inset-0 flex items-center justify-center text-sm text-[#54a9d8] uppercase">
          Key Please
        </div>
      ) : (
        <ul className="flex px-4 flex-col gap-2 cursor-pointer">
          {paths.map((key, index) => (
            <li
              key={index}
              className={` py-2 text-sm rounded-md  ${selectedPathIndex===index?'text-[#FF3C00]':'text-white'}`}
              onClick={(event) => handlePathClick( index)}
              onDoubleClick={(event) => handleDoubleClick( index)}
            >
              <div>{processResultSeperately(key)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PathList;
