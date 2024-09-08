import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Empty({ title, message, icon = '⚠️', RouteText, RouteLink = "/" }) {
  const navigate = useNavigate();
  return (
    <div className="items-cdenter inset-0 flex h-screen w-screen justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-10 text-gray-50">
        <h1 className="text-xl md:text-4xl lg:text-5xl">{icon}{title}</h1>
        <p className="text-sm md:text-base text-gray-300">{message}</p>
        {RouteText && (
          <Button type={"secondary"} onClick={() => navigate(RouteLink)}>
            {RouteText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default Empty;
