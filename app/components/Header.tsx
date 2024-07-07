import React from 'react'
import Image from 'next/image'
import jsonxLogo from '../../public/jsonxLogo.svg'

function Header() {
  return (
    <div className='flex w-full justify-between px-4 py-2 align-center'>
        <Image src={jsonxLogo} alt='logo' height={30}/>
        <div className='flex gap-4'>
          <div>Parse json</div>
          <div>Parse json</div>
          <div>Parse json</div>
        </div>
    </div>
  )
}

export default Header