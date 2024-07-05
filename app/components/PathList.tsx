import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

function PathList() {
  const keysPath: Array<string> = useSelector(
    (state: RootState) => state.keyPathSlice.path
  );

  return (
    <div>
      {keysPath.length === 0 ? (
        <div>Ohh!!! Come on, enter the key you want to find</div>
      ) : (
        <ul>
          {keysPath.map((key, index) => (
            <li key={index} style={{ fontSize: '12px', marginBottom: '8px' }}>
              {key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PathList;
