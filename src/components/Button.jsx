export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-[#FF2020]
        hover:bg-red-700
        transition-all
        duration-300
        px-8
        py-3
        rounded-xl
        font-semibold
        text-white
        hover:shadow-lg hover:cursor-pointer
      "
    >
      {children}
    </button>
  );
}
