import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import Editor, { Monaco, useMonaco } from '@monaco-editor/react';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '@/redux/features/codeSlice';
import { validateJson } from '../helpers/validateJson';
import { PathManager } from '../helpers/findKeys';
import { resetKeys, setKeys } from '@/redux/features/codeSlice';
import JsonFormatMenu from './JsonFormatMenu';
import { setShowLoadingPage } from '@/redux/features/visibilityStatusSlice';
import { setLoadingPageMessage } from '@/redux/features/otherVariables';

export default function MonacoEditor() {
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const monaco = useMonaco();
  const monacoRef = useRef(null);
  const editorRef = useRef(null);

  const dispatch = useDispatch<AppDispatch>();

  function handleEditorWillMount(monaco: any) {
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    monacoRef.current = monaco;
    editorRef.current = editor;

  }

  function handleOnChange(value: any, event: any) {
    console.log("HANDLE_MONACO_CHANGE", value)
    let formattedJsonString = value
    console.log(formattedJsonString)
    dispatch(resetKeys())
    dispatch(setCode(formattedJsonString));
  }

  useEffect(() => {
    dispatch(setLoadingPageMessage("Updating keys..."));
    try {
      dispatch(resetKeys())
      dispatch(setKeys())
      dispatch(setLoadingPageMessage("Keys updated successfully"));
    } catch (error) {
      console.error('Error parsing code:', error);
      dispatch(setLoadingPageMessage("Error updating keys"));
    } finally {
      setLoadingPageMessage("Fetched all the keys")
    }
  }, [code, dispatch]);

  return (
    <>
    <JsonFormatMenu/>
    <div className="h-full w-full border">
      
      <Editor
        height={'100%'}
        width={'100%'}
        value={code}
        theme="vs"
        defaultLanguage="json"
        defaultValue="// some comment"
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleOnChange}
        options={{ minimap: { enabled: false }, formatOnPaste:false, padding:{top:20, bottom:20} }}
      />
    </div>
   </>
  );
}
