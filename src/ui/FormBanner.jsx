function FormBanner({ children }) {
  return (
    <div className="flex flex-col px-2 h-screen w-full gap-8 items-center justify-start">
      {children}
    </div>
  );
}

export default FormBanner;
