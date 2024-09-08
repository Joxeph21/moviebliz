import { textFormatter } from "../utils/helper";

function Reviews({ review }) {
  const { author, content, created_at } = review;

  const isLong = content.length / 15 > 15;

  return (
    <div className="w-80 max-w-sm flex flex-col bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-neutral-700 cursor-pointer">
      <div className="p-4 text-gray-50">
        <p className="text-sm leading-relaxed">
          {isLong ? textFormatter({ text: content }) : content}
        </p>
      </div>
      <div className="border-t border-neutral-700 p-4">
        <h4 className="text-lg font-semibold text-brandGreen">{author}</h4>
        <p className="text-xs font-medium text-neutral-400">
          {created_at?.split("-")[0]}
        </p>
      </div>
    </div>
  );
}

export default Reviews;
