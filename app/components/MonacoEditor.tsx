import React, { useEffect, useMemo, useRef } from 'react';
import { debounce } from 'lodash';
import Editor, { useMonaco } from '@monaco-editor/react';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '@/redux/features/codeSlice';
import { resetKeys, setKeys } from '@/redux/features/codeSlice';
import JsonFormatMenu from './JsonFormatMenu';

export default function MonacoEditor() {
    const code = useSelector((state: RootState) => state.codeReducer.code);
    const isDarkMode = useSelector(
        (state: RootState) => state.otherVariables.darkMode
    );

    const monaco = useMonaco();
    const monacoRef = useRef(null);
    const editorRef = useRef(null);

    const dispatch = useDispatch<AppDispatch>();

    function handleEditorWillMount(monaco: any) {}

    function handleEditorDidMount(editor: any, monaco: any) {
        monacoRef.current = monaco;
        editorRef.current = editor;
    }

    function handleOnChange(value: any, event: any) {
        console.log('HANDLE_MONACO_CHANGE', value);
        let formattedJsonString = value;
        console.log(formattedJsonString);
        dispatch(resetKeys());
        dispatch(setCode(formattedJsonString));
    }

    const delayedDispatch = useMemo(
        () =>
            debounce(() => {
                console.log('Executing debounced dispatch');
                dispatch(resetKeys());
                dispatch(setKeys());
            }, 2000),
        [dispatch]
    );

    useEffect(() => {
        try {
            delayedDispatch();
        } catch (error) {
            console.error('Error parsing code:', error);
        } finally {
        }
    }, [code, delayedDispatch, dispatch]);

    return (
        <>
            <JsonFormatMenu />

            <div className="h-full w-full overflow-hidden border-2">
                <Editor
                    height={'100%'}
                    width={'100%'}
                    value={code}
                    theme={isDarkMode ? 'vs-light' : 'vs-light'}
                    defaultLanguage="json"
                    defaultValue="// some comment"
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorDidMount}
                    onChange={handleOnChange}
                    options={{
                        minimap: { enabled: false },
                        formatOnPaste: false,
                        padding: { top: 20, bottom: 20 },
                        fontSize: 12,
                    }}
                />
            </div>
        </>
    );
}
