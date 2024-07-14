import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

function LoadingPage() {
    const loadingPageMessage=useSelector((state:RootState)=>state.otherVariables.loadingPageMessage)
    const showLoadingPage=useSelector((state:RootState)=>state.visibilityStatusSlice.showLoadingPage)
  return (
    showLoadingPage&&
    <div className='absolute w-full h-full z-50 '>
        <div className='flex w-full h-full items-center justify-center'>
        {loadingPageMessage}
        </div>
    </div>
  )
}

export default LoadingPage