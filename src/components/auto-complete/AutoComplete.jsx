/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import SuggestionsList from "./SuggestionsList";

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
      <div className="w-[500px] flex flex-wrap gap-2 border-2 p-2 rounded-md">
        <input
          className="w-full outline-none"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={onChangeInput}
        />
      </div>
      {loading && <p>{CustomLoading}</p>}
      <div className="relative">
        {suggestions?.length > 0 && !loading && (
          <SuggestionsList
            onSelectItem={onSelect}
            setSuggestions={setSuggestions}
            setIsSelecting={setIsSelecting}
            suggestions={suggestions}
            setInputValue={setInputValue}
          />
        )}
      </div>
    </>
  );
};
