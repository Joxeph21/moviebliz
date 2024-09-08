import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate()
  return (
    <img
      className="max-w-36 md:max-w-48 cursor-pointer"
      src="/footerlogo.png"
      alt="moviebliz_main_logo"
      onClick={() => navigate('/')}
    />
  );
}

export default Logo;
