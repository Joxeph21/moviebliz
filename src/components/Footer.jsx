import { FaXTwitter } from "react-icons/fa6";
import Logo from "../ui/Logo";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

function Footer() {
  return (
    <footer className="flex mt-10 w-full flex-col items-center justify-between gap-5 p-8 px-10 text-neutral-500 ring-1 ring-neutral-800 md:mt-32 md:flex-row">
      <div className="flex w-full flex-col items-center space-y-8 md:w-fit">
        <ul className="flex gap-3 text-sm">
          <li>About</li>
          <li>Help</li>
          <li>API</li>
          <li>Contact</li>
        </ul>
        <Logo />
        <p className="text-center text-xs">
          @moviebliz limited. Made by{" "}
          <a href="#" className="underline">
            Joe
          </a>
          . Movie data from{" "}
          <a
            href="https://developer.themoviedb.org/reference/intro/getting-started"
            target="_blank"
            className="text-brandGreen underline"
          >
            TMDB
          </a>
        </p>
      </div>
      <div className="flex gap-4">
        <FaXTwitter
          size={22}
          onClick={() => window.open("https://x.com/joeweb_dev", "_blank")}
        />
        <FaInstagram
          size={22}
          onClick={() => window.open("https://www.instagram.com/j0e_xeph/", "_blank")}
        />
        <FaLinkedin
          size={22}
          onClick={() => window.open("https://www.linkedin.com/in/joseph-adenugba21/", "_blank")}
        />
        <FiGithub
          size={22}
          onClick={() => window.open("https://github.com/Joxeph21/", "_blank")}
        />
      </div>
    </footer>
  );
}

export default Footer;
