/* eslint-disable react/prop-types */
const SuggestionsList = ({
  suggestions,
  setSuggestions,
  setIsSelecting,
  onSelectItem,
  setInputValue,
}) => {
  return (
    <div className="border w-[500px] absolute z-20 top-0  left-0 *:p-2 *:cursor-pointer">
      {suggestions?.map((item, index) => (
        <p
          className="border bg-white"
          onClick={() => {
            setIsSelecting(true);
            onSelectItem(item);
            setInputValue(item.title);
            setSuggestions([]);
          }}
          key={index}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
};

export default SuggestionsList;
