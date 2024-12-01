import { Search } from "lucide-react";

/* eslint-disable react/prop-types */
const SuggestionsList = ({ suggestions, onSelectItem }) => {
  return (
    <div className="border bg-white shadow-lg rounded-xl overflow-hidden w-full absolute left-0 translate-y-full -bottom-2 z-20 py-2">
      {suggestions?.slice(0,10)?.map((item, index) => (
        <div className="px-5 py-3 cursor-pointer flex items-center justify-start gap-4 hover:bg-slate-50" key={index}  onClick={() => onSelectItem(item)}>
          <Search className="h-4 w-4"/>
        <p className="leading-none">
        {item.title}
      </p>
      </div>
      ))}
    </div>
  );
};

export default SuggestionsList;
