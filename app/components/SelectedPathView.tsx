import { RootState } from '@/redux/store';
import { Editor } from '@monaco-editor/react';
import React from 'react'
import { useSelector } from 'react-redux';

function SelectedPathView() {
    const selectedPathKeyValue = useSelector(
        (state: RootState) => state.codeReducer.selectedPathKeyValue
    );
  return (
    <div className="w-full h-full overflow-auto p-2">
        <Editor
        height={'100%'}
        width={'100%'}
        value={selectedPathKeyValue}
        theme="vs"
        defaultLanguage="json|text"
        defaultValue="// some comment"
        options={{ minimap: { enabled: false }, formatOnPaste:true, formatOnType:true,  padding:{top:20, bottom:20} }}
      />
    </div>
  )
}

export default SelectedPathView