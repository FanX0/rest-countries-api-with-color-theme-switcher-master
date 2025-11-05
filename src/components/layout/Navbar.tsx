import DarkMode from "../DarkMode";

const Navbar = ({
  darkMode,
  handleDarkMode,
}: {
  darkMode: "dark" | "light";
  handleDarkMode: () => void;
}) => {
  return (
    <header className="flex justify-between items-center px-[1.5rem] py-[2rem] lg:px-[5rem] bg-[#fefffe] dark:bg-[#2a3743] shadow-xs">
      <h1 className=" font-semibold">Where in the world?</h1>
      <div>
        <DarkMode darkMode={darkMode} handleDarkMode={handleDarkMode} />
      </div>
    </header>
  );
};
export default Navbar;
