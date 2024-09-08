import { forwardRef } from "react";

const TextExpander = forwardRef(
  (
    {
      collapsedNumWords = 10,
      expandButtonText = "Show more",
      collapseButtonText = "Show less",
      isExpanded,
      setIsExpanded,
      children,
      isLong,
    },
    ref,
  ) => {
    const displayText = isExpanded
      ? children
      : children.split(" ").slice(0, collapsedNumWords).join(" ") + "...";

    return (
      <div ref={ref}>
        <p className="w-fit lg:w-[35rem] space-x-4 text-wrap text-center md:text-justify indent-5 text-xs text-neutral-200 hover:line-clamp-none sm:line-clamp-none md:p-2">
          {displayText}

          {isLong && (
            <a
              href="#"
              onClick={() => setIsExpanded((exp) => !exp)}
              className="text-blue-500"
            >
              {isExpanded ? `..${collapseButtonText}` : `${expandButtonText}`}
            </a>
          )}
        </p>
      </div>
    );
  },
);

TextExpander.displayName = TextExpander;

export default TextExpander;
