import { ScaleLoader } from "react-spinners";

function MiniLoader({ color = "white" }) {
  return <ScaleLoader height={10} width={2} color={color} />;
}

export default MiniLoader;
