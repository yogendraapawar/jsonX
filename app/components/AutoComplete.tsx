import { setSearchKeyValue } from '@/redux/features/codeSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ComboBox() {
    const data = useSelector((state: RootState) => state.codeReducer.keys);
    const dispatch = useDispatch<AppDispatch>();
    const [keySuggestion, setKeySuggestion] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);
    const [mouseOverSuggestions, setMouseOverSuggestions] =
        useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!mouseOverSuggestions) {
                setHideSuggestions(true);
            }
        }, 200); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, [mouseOverSuggestions]);

    function handleAutoCompleteChange(
        event: ChangeEvent<HTMLInputElement>
    ): void {
        let searchInput = event.target.value.toLowerCase().trim();

        if (searchInput === '') {
            setKeySuggestion([]);
            setInputValue('');
            dispatch(setSearchKeyValue(''));
            setHideSuggestions(true);
            return;
        }

        const filteredData = data.filter((item) => {
            const lowerCaseItem = item.toLowerCase();
            return lowerCaseItem.startsWith(searchInput);
        });

        if (filteredData.length !== 0) {
            setKeySuggestion(filteredData);
            setHideSuggestions(false);
        } else {
            setKeySuggestion([]);
            setHideSuggestions(true);
        }

        setInputValue(event.target.value);
        dispatch(setSearchKeyValue(event.target.value));
    }

    function handleSuggestionClick(index: number) {
        setHideSuggestions(true);
        setInputValue(keySuggestion[index]);
        dispatch(setSearchKeyValue(keySuggestion[index]));
    }

    function handleInputBlur() {
        setTimeout(() => {
            if (!mouseOverSuggestions) {
                setHideSuggestions(true);
            }
        }, 200); // Adjust the delay as needed
    }

    return (
        <div className="relative w-full h-full">
            <input
                className="py-1 px-4 h-full block w-full border-2 rounded-lg text-sm focus:outline-none disabled:opacity-50"
                type="text"
                id="keySearchInput"
                data-hs-combo-box-input=""
                value={inputValue}
                onChange={handleAutoCompleteChange}
                onBlur={handleInputBlur}
                onFocus={() => {
                    setHideSuggestions(false);
                }}
                autoComplete="off"
            />
            {!hideSuggestions && (
                <div
                    className="absolute z-50 w-full p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
                    style={{
                        maxHeight: keySuggestion.length == 0 ? '0px' : '200px',
                    }}
                    onMouseEnter={() => setMouseOverSuggestions(true)}
                    onMouseLeave={() => setMouseOverSuggestions(false)}
                >
                    {keySuggestion.length !== 0 &&
                        keySuggestion.map((value, index) => (
                            <div
                                key={index}
                                className="cursor-pointer py-1 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
                                data-hs-combo-box-output-item=""
                                onClick={() => handleSuggestionClick(index)}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span
                                        data-hs-combo-box-search-text={value}
                                        data-hs-combo-box-value=""
                                    >
                                        {value}
                                    </span>
                                    <span className="hidden hs-combo-box-selected:block">
                                        <svg
                                            className="flex-shrink-0 size-3.5 text-blue-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6 9 17l-5-5"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default ComboBox;
