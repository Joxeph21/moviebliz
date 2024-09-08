import { useState } from "react";
import Loader from "./Loader";

function Iframe({ movieName, trailerKey }) {
  const [isLoading, setIsLoading] = useState(true);

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <div className="relative h-60 w-96 md:h-96 md:w-[40em]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <Loader />
        </div>
      )}
      {trailerKey && (
        <iframe
          onLoad={handleLoad}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title={movieName}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mt-2 rounded-md"
        ></iframe>
      )}
    </div>
  );
}

export default Iframe;
