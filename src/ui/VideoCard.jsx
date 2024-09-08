// import { CiMenuKebab } from "react-icons/ci";
// import { HiPlay } from "react-icons/hi2";

import { textFormatter } from "../utils/helper";
import Iframe from "./Iframe";
import Modal from "./Modal";

function VideoCard({ movieName, trailerKey }) {
  const fallbackThumbnail = `https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`;
  const youtubeThumbnailUrl = `https://i.ytimg.com/vi/${trailerKey}/maxresdefault.jpg`;

  return (
    <Modal>
      <Modal.Open opens={"iframe"}>
        <div className="mx-2 flex flex-col items-center gap-5 rounded-md bg-black/10 p-2 duration-300 ease-in-out hover:scale-105 hover:gap-6 hover:p-4">
          <div
            className="grid h-56 w-[22em] cursor-pointer justify-center sm:h-56 sm:w-80 md:h-52 md:w-96"
            style={{
              backgroundImage: `url(${youtubeThumbnailUrl ? youtubeThumbnailUrl : fallbackThumbnail})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* <div className="absolute m-1 h-8 w-8 cursor-pointer items-center justify-center justify-self-end rounded-full bg-gray-200/50 p-2 hover:inline-flex hover:bg-gray-50">
          <CiMenuKebab className="cursor-pointer" />
          </div>
          <HiPlay className="self-center text-neutral-50/20" size={80} /> */}
          </div>
          <div>
            <h4 className="text-sm font-semibold">
              {textFormatter({ text: movieName, number: 8, elipsis: false })}
            </h4>
          </div>
        </div>
      </Modal.Open>
      <Modal.Window name={"iframe"}>
        <Iframe trailerKey={trailerKey} movieName={movieName} />
      </Modal.Window>
    </Modal>
  );
}

export default VideoCard;
