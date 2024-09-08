import { ScaleLoader } from "react-spinners";

function Loader({ modal }) {
  return (
    <div
      className={`flex ${modal ? "h-auto" : "h-screen"} w-full items-center justify-center`}
    >
      <ScaleLoader height={40} width={8} color="#fff" />
    </div>
  );
}

export default Loader;
