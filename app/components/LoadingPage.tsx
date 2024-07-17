import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import fileinput from '@/public/Animation - 1721237170181.gif'

function LoadingPage() {
    const loadingPageMessage=useSelector((state:RootState)=>state.otherVariables.loadingPageMessage)
    const showLoadingPage=useSelector((state:RootState)=>state.visibilityStatusSlice.showLoadingPage)
  return (
    showLoadingPage&&
    <div className='absolute w-full h-full z-50 bg-opacity-60 backdrop-blur-sm'>
        <div className='flex w-full h-full items-center justify-center'>
          {loadingPageMessage}
        </div>
        <Image src={fileinput} alt='' width={60} height={60}/>
    </div>
  )
}

export default LoadingPage