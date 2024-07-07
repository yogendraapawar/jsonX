'use client';
import React from 'react';
import Image from 'next/image';
import jsonxLogo from '../../public/jsonxLogo.svg';
import githubDark from '../../public/github-mark.svg';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between px-4 py-4 align-center border-[#808080] border-b-4">
      <Image src={jsonxLogo} alt="logo" height={30} />
      <a
        href="https://github.com/yogendraapawar/jsonX"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="flex gap-2 items-center">
          <div>
            <Image src={githubDark} height={30} alt="github-logo" />
          </div>
          <div className='text-xs font-bold'>Contribute</div>
        </div>
      </a>
    </div>
  );
}

export default Header;
