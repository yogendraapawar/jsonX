import { formatCode, parseCode } from '@/redux/features/codeSlice';
import { hideToast, showToast } from '@/redux/features/toastSlice';
import { AppDispatch } from '@/redux/store';
import React from 'react';
import { useDispatch } from 'react-redux';

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
    dispatch(formatCode(null))
    console.log("format clicked")
  }

  return (
    <div className="flex w-full justify-end py-2 px-4 items-center">
      <Button text="Parse" onclick={handleParseClick} />
      <Button text="Format" onclick={handleFormatClick}/>
    </div>
  );
}

export default JsonFormatMenu;

type ButtonProps = {
  text: string;
  onclick: () => void;
};
function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-xs px-2 py-1 me-2 mb-2 focus:outline-none"
      onClick={props.onclick}
    >
      {props.text}
    </button>
  );
}
