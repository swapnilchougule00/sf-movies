/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { Search } from "lucide-react";

export const AutoComplete = ({
  placeholder,
  CustomLoading,
  fetchSuggestions,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const onChangeInput = (event) => {
    setIsSelecting(false);
    setInputValue(event.target.value);
  };

  const getSuggestions = async (query) => {
    setLoading(true);
    if (query.length > 0) {
      try {
        const res = fetchSuggestions(query);
        setSuggestions(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isSelecting) {
      return;
    }
    let timeout;
    if (inputValue.length > 0) {
      timeout = setTimeout(() => {
        getSuggestions(inputValue);
      }, 400);
    } else {
      setSuggestions([]);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <>
      <div className="w-full flex gap-2 border-2 py-2 pr-4 pl-10 rounded-xl relative">
        <input
          className="w-full outline-none"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeInput}
        />
        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2" />
        {inputValue?.length > 0 && suggestions?.length > 0 && !loading && (
          <SuggestionsList
            onSelectItem={onSelect}
            setSuggestions={setSuggestions}
            setIsSelecting={setIsSelecting}
            suggestions={suggestions}
            setInputValue={setInputValue}
          />
        )}
      </div>
      {loading && <p>{CustomLoading}</p>}
    </>
  );
};
