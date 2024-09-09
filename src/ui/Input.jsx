function Input({
  title,
  type,
  placeholder,
  required = false,
  name,
  error,
  value,
  onChange,
  defaultValue,
  onBlur,
  errorMessage,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-50" htmlFor={name}>
        {title}
      </label>
      <input
        className={`w-80 rounded-md p-3 ${error ? `ring-2 ring-red-400` : ""} text-sm text-black placeholder:text-black/60 focus:outline-none focus:ring focus:ring-green-300`}
        type={type}
        required={required}
        defaultValue={defaultValue}
        id={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default Input;
