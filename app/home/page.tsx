'use client';
import React, {
  MouseEventHandler,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import MonacoEditor from '../components/MonacoEditor';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { findKeys } from '../helpers/findKeys';
import { validateJson } from '../helpers/validateJson';
import { resetKeyPaths, setKeyPaths } from '@/redux/features/keyPathSlice';
import { stat } from 'fs';
import PathList from '../components/PathList';

function Page() {
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const keyPaths = useSelector((state: RootState) => state.keyPathSlice.path);
  console.log('from page', code);
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<string>('');
  const [isJsonValid, setIsJsonValid] = useState<boolean>(false);
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    dispatch(resetKeyPaths());
    dispatch(setKeyPaths(findKeys(JSON.parse(code), inputValue)));
  };

  return (
    <div className="flex bg-yellow flex-1 h-full p-4">
      {/* Left column */}
      <div
        className={`w-3/5 ${
          isJsonValid
            ? 'border-green-600 border-e-8'
            : 'border-e-8 border-red-600'
        } h-full`}
      >
        <MonacoEditor />
      </div>

      {/* Right column */}
      <div className="w-2/5 border border-black flex flex-col h-full">
        <div className='p-4'>
          <FormControl>
            <FormLabel>Enter a key to find</FormLabel>
            <div className="flex w-full justify-between gap-2">
              <Input
                width={'100%'}
                placeholder="Basic usage"
                onChange={handleInputChange}
                paddingY={5}
                paddingX={10}
                border={'2px'}
              />
              <Button
                isLoading={false}
                loadingText="Loading"
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="end"
                onClick={handleButtonClick}
              >
                Continue
              </Button>
            </div>
            <div>
              Found {keyPaths.length} items
            </div>
          </FormControl>
        </div>

        <div className="h-full p-4 overflow-y-auto">
          <PathList />
        </div>
      </div>
    </div>
  );
}

export default Page;
