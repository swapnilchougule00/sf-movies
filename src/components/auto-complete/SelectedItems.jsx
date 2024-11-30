/* eslint-disable react/prop-types */

const SelectedItems = ({ selected, unselect }) => {
  return (
    <div className="flex gap-2  flex-wrap">
      {selected?.map((item, index) => (
        <div
          key={index}
          className="px-2 flex overflow-hidden items-center pr-5 py-0.5 text-nowrap relative bg-gray-300 rounded-lg w-fit"
        >
          {item}
          <span
            onClick={() => unselect(index)}
            className="absolute cursor-pointer right-0 bg-red-500 p-1 text-white text-sm"
          >
            X
          </span>
        </div>
      ))}
    </div>
  );
};

export default SelectedItems;
