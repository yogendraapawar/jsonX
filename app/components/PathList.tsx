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
    <div>
      {paths.length === 0 ? (
        <div className="text-sm ">
          Enter the key you want to find
        </div>
      ) : (
        <ul className="flex flex-col gap-2 cursor-pointer">
          {paths.map((key, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-sm border rounded-md  ${selectedPathIndex===index?'bg-indigo-500 text-white':null}`}
              onClick={(event) => handlePathClick( index)}
              onDoubleClick={(event) => handleDoubleClick( index)}
            >
              <div>{processResultSeperately(key)}</div>
              {/* <div>
                {typeof key[key.length - 1] === 'object' ? (
                  <span>{JSON.stringify(key[key.length - 1])}</span>
                ) : (
                  //@ts-ignore
                  <span>{key[key.length - 1]}</span>
                )}{' '}
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PathList;
