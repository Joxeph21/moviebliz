function Button({
  type,
  size = "regular",
  onClick,
  children,
  buttonType,
  icon,
  disabled,
  condition = false,
}) {
  const sizes = {
    small: "w-20 rounded-sm",
    regular: "w-40 rounded-md",
    large: "w-80",
  };
  const base =
    sizes[size] +
    ` px-2  justify-center py-2 flex items-center font-semibold gap-2 text-xs`;
  const styles = {
    primary:
      base +
      ` ${condition ? "bg-green-600/50" : "bg-[#328F29] "} text-gray-50 hover:bg-[#18790f] disabled:bg-green-600/50 disabled:cursor-not-allowed`,
    secondary: base + ` bg-[#1E1E1E] hover:bg-[#1b1a1a] text-gray-50`,
    danger: base + ` bg-red-700`,
    login: base + ` text-gray-50`
  };

  return (
    <button className={styles[type]} onClick={onClick} disabled={disabled} type={buttonType}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
