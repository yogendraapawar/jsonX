import { formatCode, parseCode } from '@/redux/features/codeSlice';
import { hideToast, showToast } from '@/redux/features/toastSlice';
import { AppDispatch } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import formatIcon from '@/public/icons/toolbarIcons/format.svg'
import parseIcon from '@/public/icons/toolbarIcons/parse.svg'
import stringifyIcon from '@/public/icons/toolbarIcons/stringify.svg'

function JsonFormatMenu() {

  const dispatch=useDispatch<AppDispatch>()

  function handleParseClick(): void {
    try{
      dispatch(parseCode(null))
    }catch(error:any){
      dispatch(showToast(error.message));
      setTimeout(() => {
        dispatch(hideToast(null));
      }, 1000);
    }
    
    console.log("parse cicked")
  }

  function handleFormatClick(): void {
    try{
      dispatch(formatCode(null))
    }catch(error:any){
      dispatch(showToast(error.message));
      setTimeout(() => {
        dispatch(hideToast(null));
      }, 1000);
    }
    console.log("format clicked")
  }

  return (
    <div className="flex w-full justify-end py-2 px-4 gap-4 items-center">
      <Button text="Parse" onclick={handleParseClick} icon={parseIcon}/>
      <Button text="Format" onclick={handleFormatClick} icon={formatIcon}/>
      <Button text="Stringify" onclick={handleFormatClick} icon={stringifyIcon}/>
    </div>
  );
}

export default JsonFormatMenu;

type ButtonProps = {
  text: string;
  onclick: () => void;
  icon:any;
};
function Button(props: ButtonProps) {
  return (
    <div
      onClick={props.onclick}
      className='flex flex-col items-center cursor-pointer gap-1 '
    >
      <div>
      <Image src={props.icon} alt={"icon"} width={20}/>
      </div>
      <div className='text-xs font-semibold'>{props.text}</div>
    </div>
  );
}
