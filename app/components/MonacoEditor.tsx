import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import Editor, { Monaco } from '@monaco-editor/react';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '@/redux/features/codeSlice';
import { validateJson } from '../helpers/validateJson';

export default function MonacoEditor() {
  const code = useSelector((state: RootState) => state.codeReducer.code);

  const monacoRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();

  function handleEditorWillMount(monaco: any) {
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    monacoRef.current = monaco;
  }

  function handleOnChange(value: any, event: any) {
    let formattedJsonString = value
    dispatch(setCode(formattedJsonString));
  }

  return (
    <div className="h-full w-full">
      <Editor
        height={'100%'}
        width={'100%'}
        value={code}
        theme="vs-dark"
        defaultLanguage="json"
        defaultValue="// some comment"
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleOnChange}
        options={{ minimap: { enabled: false }, formatOnPaste:true }}
      />
    </div>
  );
}
