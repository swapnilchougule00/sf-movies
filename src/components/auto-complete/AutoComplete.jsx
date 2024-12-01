/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import SelectedItems from "./SelectedItems";
import { Search } from "lucide-react";

export const AutoComplete = ({
  placeholder,
  CustomLoading,
  fetchSuggestions,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChangeInput = (event) => {
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

  const onSelect = (value) => {
    setSelected([...selected, value.title]);
  };


  const handleKeyPress = (event) => {
    if (
      inputValue.length === 0 &&
      selected?.length > 0 &&
      event.key === "Backspace"
    ) {
      const newSelected = [...selected];
      newSelected.pop();
      setSelected(newSelected);
    }
  };

  const unselect = (id) => {
    setSelected(selected.filter((_, index) => id !== index));
  };

  useEffect(() => {
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
          onKeyDown={handleKeyPress}
          onChange={onChangeInput}
        />
        <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2"/>
        {inputValue?.length > 0 && suggestions?.length > 0 && !loading && (
          <SuggestionsList onSelectItem={onSelect} suggestions={suggestions} />
        )}
      </div>
      {loading && <p>{CustomLoading}</p>}
        
    </>
  );
};
