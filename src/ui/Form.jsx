function Form({ children, title, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col w-fit h-fit items-center justify-center gap-2 bg-black/80 p-4 pb-10">
      <h2 className="my-4 text-center text-2xl font-bold text-gray-50">
          {title}
        </h2>
     
      {children}
    </form>
  );
}

export default Form;
