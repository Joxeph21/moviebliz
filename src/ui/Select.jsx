function Select({ options, value, onChange,  ...props }) {

  return (
    <select
      value={value}
      onChange={onChange}
      className={`border p-2 text-xs w-40 sm:w-auto  rounded-sm bg-neutral-800 text-gray-50 shadow-sm`}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
