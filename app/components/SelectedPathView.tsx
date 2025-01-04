import { AppDispatch, RootState } from '@/redux/store';
import { Editor } from '@monaco-editor/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './JsonFormatMenu';
import { OutLinedButton } from './OutLinedButton';
import { hideToast, showToast } from '@/redux/features/toastSlice';

function SelectedPathView() {
    const selectedPathKeyValue = useSelector(
        (state: RootState) => state.codeReducer.selectedPathKeyValue
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleCopyToClipboard = () => {
        if (selectedPathKeyValue) {
            navigator.clipboard
                .writeText(selectedPathKeyValue)
                .then(() => {
                    console.log(
                        'Text copied to clipboard:',
                        selectedPathKeyValue
                    );
                    dispatch(showToast('Copied to clipboard'));
                    setTimeout(() => {
                        dispatch(hideToast(null));
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Failed to copy:', error);
                });
        }
    };

    return (
        <div className="w-full h-full overflow-auto p-2 relative border-2">
            <Editor
                height={'100%'}
                width={'100%'}
                value={selectedPathKeyValue}
                theme="vs-light"
                defaultLanguage="json|text"
                defaultValue="// some comment"
                options={{
                    minimap: { enabled: false },
                    formatOnPaste: true,
                    formatOnType: true,
                    padding: { top: 20, bottom: 20 },
                }}
            />
            {(selectedPathKeyValue != null ||
                selectedPathKeyValue !== undefined) && (
                <div className="absolute bottom-2 right-2 p-2">
                    <OutLinedButton
                        text="Copy"
                        onclick={handleCopyToClipboard}
                        icon={null}
                    />
                </div>
            )}
        </div>
    );
}

export default SelectedPathView;
