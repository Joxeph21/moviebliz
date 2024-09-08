
function Banner({ children }) {
  return (
    <div className="mt-16 flex max-w-screen h-max flex-col items-center justify-center px-2 text-gray-50 sm:mt-24 md:px-4">
      {children}
    </div>
  );
}

export default Banner;
