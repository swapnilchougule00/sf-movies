/* eslint-disable react/prop-types */
import { Search } from "lucide-react";

const SuggestionsList = ({
  suggestions,
  setSuggestions,
  setIsSelecting,
  onSelectItem,
  setInputValue,
}) => {
  return (
    <div className="border bg-white shadow-lg rounded-xl overflow-hidden w-full absolute left-0 translate-y-full -bottom-2 z-20 py-2">
      {suggestions?.map((item, index) => (
        <div
          className="px-5 py-3 cursor-pointer flex items-center justify-start gap-4 hover:bg-slate-50"
          key={index}
          onClick={() => {
            setIsSelecting(true);
            onSelectItem(item);
            setInputValue(item.title);
            setSuggestions([]);
          }}
        >
          <Search className="h-4 w-4" />

          <p className="" onClick={() => onSelectItem(item)} key={index}>
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsList;
