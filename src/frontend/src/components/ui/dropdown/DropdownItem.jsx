// import { Link } from "react-router";

export function DropdownItem({
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event) => {
    if (tag === "button") {
      event.preventDefault();
    }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === "a" && to) {
    return (
      // <Link to={to} className={combinedClasses} onClick={handleClick}>
      //   {children}
      // </Link>
      <p1 className={combinedClasses} onClick={handleClick}>
        {children}
      </p1>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
}
