'use client'
import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function PathList() {

  const [blinkIndex, setBlinkIndex] = useState<number|null>(null);

  const keysPath: Array<string> = useSelector(
    (state: RootState) => state.keyPathSlice.path
  );

  function handlePathClick(event: MouseEvent, index:number): void {
    console.log(keysPath[index])
    setBlinkIndex(index);

    // Remove the blink effect after 1000ms (1 second)
    setTimeout(() => {
      setBlinkIndex(null);
    }, 1000);
  }

  return (
    <div>
      {keysPath.length === 0 ? (
        <div className="text-sm ">
          Ohh!!! Come on, enter the key you want to find
        </div>
      ) : (
        <ul>
          {keysPath.map((key, index) => (
            <li
              key={index}
              className={blinkIndex === index ? 'blink' : ''}
              style={{
                fontSize: '12px',
                marginBottom: '8px',
              }}
              onClick={(event)=>handlePathClick(event, index)}
            >
              {key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PathList;
