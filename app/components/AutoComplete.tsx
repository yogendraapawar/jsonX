import Image from 'next/image';
import { setSearchKeyValue } from '@/redux/features/codeSlice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import batteryIcon from '@/public/icons/toolbarIcons/batteryIcon.svg';

function ComboBox() {
    const data = useSelector((state: RootState) => state.codeReducer.keys);
    const code = useSelector((state: RootState) => state.codeReducer.code);
    const dispatch = useDispatch<AppDispatch>();
    const [keySuggestion, setKeySuggestion] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
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
        <div data-hs-combo-box="">
            <div className="relative input-box-shadow">
                <div className="absolute left-0 bg-[#454547] h-full z-10 w-[10px] "></div>
                <div className="absolute left-4 top-1 z-10">
                    <Image src={batteryIcon} alt="" width={12} height={12} />
                </div>
                <div className="absolute right-0 bg-[#29292c] h-full z-10 w-[10px]"></div>
                <input
                    className="py-2 px-4 block w-full  h-[60px] text-base text-white disabled:opacity-50 bg-black input-inner-shadow"
                    type="text"
                    id="keySearchInput"
                    data-hs-combo-box-input=""
                    value={inputValue}
                    onChange={handleAutoCompleteChange}
                    onBlur={handleInputBlur}
                    onFocus={() => {
                        setHideSuggestions(false);
                        setIsInputFocused(true);
                    }}
                />
            </div>
            {!hideSuggestions && (
                <div
                    className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto"
                    onMouseEnter={() => setMouseOverSuggestions(true)}
                    onMouseLeave={() => setMouseOverSuggestions(false)}
                >
                    {keySuggestion.length !== 0 &&
                        keySuggestion.map((value, index) => (
                            <div
                                key={index}
                                className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none "
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
