'use client';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processResultSeperately } from '../helpers/findKeys';
import path from 'path';
import { hideToast, showToast } from '@/redux/features/toastSlice';
import {
    setSelectedPathIndex,
    setSelectedPathKeyValue,
} from '@/redux/features/codeSlice';

function PathList() {
    const code = useSelector((state: RootState) => state.codeReducer.code);
    const dispatch = useDispatch<AppDispatch>();
    const selectedPathIndex = useSelector(
        (state: RootState) => state.codeReducer.selectedPathIndex
    );

    const paths = useSelector(
        (state: RootState) => state.codeReducer.paths
    ) as (string | number | object)[][];

    const handlePathClick = useCallback(
        (index: number) => {
            console.log(paths[index]);
            dispatch(setSelectedPathIndex(index));
            dispatch(
                setSelectedPathKeyValue({ pathArray: paths[index], code: code })
            );
        },
        [paths, code, dispatch]
    );

    const handleDoubleClick = useCallback(
        (index: number) => {
            let textToCopy = processResultSeperately(paths[index]);

            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    console.log('Text copied to clipboard:', textToCopy);
                    dispatch(showToast('Copied to clipboard'));
                    setTimeout(() => {
                        dispatch(hideToast(null));
                    }, 1000);
                })
                .catch((err) => {
                    console.error('Failed to copy text to clipboard:', err);
                    // Handle error if clipboard write fails
                });
        },
        [dispatch, paths]
    );

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
        <>
            {paths.length === 0 ? (
                <div className="flex text-sm h-full w-full items-center justify-center">
                    <div className="text-[10px] font-medium uppercase text-center w-full ">
                        Enter the key you want to find
                    </div>
                </div>
            ) : (
                <ul className="flex flex-col gap-2 cursor-pointer">
                    {paths.map((key, index) => (
                        <li
                            key={index}
                            className={`px-4 py-2 text-sm border rounded-md  ${
                                selectedPathIndex === index
                                    ? 'bg-indigo-500 text-white'
                                    : null
                            }`}
                            onClick={(event) => handlePathClick(index)}
                            onDoubleClick={(event) => handleDoubleClick(index)}
                        >
                            <div>{processResultSeperately(key)}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default PathList;
