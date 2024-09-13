import { forwardRef } from "react";
import { toast } from "react-toastify";

const MiniIcons = forwardRef(
  (
    { condition = false, icon, onAdd, onRemove,  disabled = false },
    ref,
  ) => {
    function handleFunc() {
      if (disabled) {
        toast.error("User must be Logged in", {
          autoClose: 1000,
        });
        return;
      }
      if (condition) {
        onRemove();
      } else {
        onAdd();
      }
    }

    return (
      <div
        ref={ref}
        onClick={handleFunc}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${condition ? "bg-[#1c541783] hover:bg-[#18790f]" : "bg-black hover:bg-black"} p-1 transition-colors duration-150 ease-in`}
      >
        {icon}
      </div>
    );
  },
);

MiniIcons.displayName = "MiniIcons";

export default MiniIcons;
