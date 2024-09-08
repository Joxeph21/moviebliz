import VideoCard from "./VideoCard";

function VideoGrid({ array }) {
  return (
    <div className="max-w m-4 grid h-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:p-3">
      {array?.map((el) => (
        <VideoCard key={el.id} movieName={el.name} trailerKey={el?.key} />
      ))}
    </div>
  );
}

export default VideoGrid;
