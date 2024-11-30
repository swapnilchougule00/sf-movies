import { AutoComplete } from "./AutoComplete";

export const Index = () => {
  const fetchSuggestions = async (query) => {
    let response = [];
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      if (!res.ok) {
        throw new Error("network err");
      }
      const data = await res.json();
      response = data;
    } catch (err) {
      response = [];
    }
    return response;
  };

  return (
    <div className="p-10 ">
      <AutoComplete
        placeholder="enter Recipe"
        fetchSuggestions={fetchSuggestions}
        onSelect={() => {}}
        CustomLoading={<>...Loading</>}
        onChange={() => {}}
      />
    </div>
  );
};
