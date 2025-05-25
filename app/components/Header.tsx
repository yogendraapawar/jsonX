'use client';
import React from 'react';
import Image from 'next/image';
import jsonxLogo from '../../public/jsonxLogo.svg';
import githubDark from '../../public/github-mark.svg';
import jsonIcon from '@/public/logo_icon.svg';
import { useRouter } from 'next/navigation';
import Toggle from 'react-toggle';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '@/redux/features/otherVariables';
import ThemeSwitcher from '../utils/ThemeSwitcher';

function Header() {
    return (
        <div className="flex w-full justify-between px-4 py-1 align-center bg-blue-500">
            <div className="flex gap-2">
                <div>
                    <Image src={jsonIcon} height={40} alt="github-logo" />
                </div>
                <div>
                    <Image src={jsonxLogo} alt="logo" height={30} />
                </div>
            </div>
            {/* <a
                href="https://github.com/yogendraapawar/jsonX"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="flex gap-2 items-center">
                    <div>
                        <Image src={githubDark} height={30} alt="github-logo" />
                    </div>

                    <div className="text-xs font-medium">Contribute</div>
                </div>
            </a> */}
        </div>
    );
}

export default Header;

function ToggleButton() {
    const mode = useSelector(
        (state: RootState) => state.otherVariables.darkMode
    ); // Adjust selector if needed
    const dispatch = useDispatch();

    return (
        <div>
            <Toggle
                checked={mode} // Use `checked` for controlled components
                icons={{
                    checked: <span>OD</span>, // You can use JSX for icons
                    unchecked: null,
                }}
                onChange={() => {
                    dispatch(setDarkMode(!mode));
                }}
            />
        </div>
    );
}
