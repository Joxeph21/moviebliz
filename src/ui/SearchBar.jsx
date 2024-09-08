import { forwardRef } from "react";
import { HiX } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";


const SearchBar = forwardRef(({ value, onSubmit, onCancel, onChange }, ref) => {

 
  return (
    <div className="flex w-32 items-center rounded-sm justify-between bg-gray-200 px-2 py-[0.4em] sm:w-40 sm:rounded-3xl sm:px-6 md:w-72">
      <form onSubmit={onSubmit}>
        <input
          className="w-20 bg-gray-200 text-xs text-neutral-900 placeholder:text-xs placeholder:text-neutral-900 focus:outline-none sm:w-24 md:w-auto"
          value={value}
          onChange={onChange}
          ref={ref}
          type="text"
          placeholder="Search here..."
          enterKeyHint="enter"
        />
      </form>
      {value.length === 0 ? (
        <LuSearch cursor={"pointer"} />
      ) : (
        <HiX onClick={onCancel} cursor={"pointer"} />
      )}
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
