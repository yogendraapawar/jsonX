'use client';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processResultSeperately } from '../helpers/findKeys';
import path from 'path';
import { hideToast, showToast } from '@/redux/features/toastSlice';

function PathList() {
  const [blinkIndex, setBlinkIndex] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const paths = useSelector(
    (state: RootState) => state.inputJsonReducer.paths
  ) as (string | number | object)[][];

  function handlePathClick(
    event: React.MouseEvent<Element, MouseEvent>,
    index: number
  ): void {
    console.log(paths[index]);
    setBlinkIndex(index);

    setTimeout(() => {
      setBlinkIndex(null);
    }, 100);
  }

  function handleDoubleClick(
    event: React.MouseEvent<Element, MouseEvent>,
    index: number
  ): void {
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
  }

  return (
    <div>
      {paths.length === 0 ? (
        <div className="text-sm ">
          Ohh!!! Come on, enter the key you want to find
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {paths.map((key, index) => (
            <li
              key={index}
              className={`px-4 py-2 text-sm border rounded-md  ${
                blinkIndex === index ? 'blink' : ''
              }`}
              onClick={(event) => handlePathClick(event, index)}
              onDoubleClick={(event) => handleDoubleClick(event, index)}
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
