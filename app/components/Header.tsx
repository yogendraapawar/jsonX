import React from 'react'
import Image from 'next/image'
import jsonxLogo from '../../public/jsonxLogo.svg'

function Header() {
  return (
    <div className='w-full p-2'>
        <Image src={jsonxLogo} alt='logo' height={30}/>
    </div>
  )
}

export default Header