import Filter from "../ui/Filter";

function Box({ title }) {
  return (
    <div className="flex w-dvw items-center justify-between px-4 py-2 md:px-20">
      <h1 className="text-sm sm:text-base font-semibold text-gray-50">{title}</h1>
      <Filter />
    </div>
  );
}

export default Box;
