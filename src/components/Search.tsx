import searchLightIcon from "@/assets/search_black.svg";
import searchDarkIcon from "@/assets/search_white.svg";

interface SearchProps {
  darkMode: "dark" | "light";
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ darkMode, value, onChange }: SearchProps) => {
  return (
    <div className="relative w-full">
      <input
        className="pl-[3rem] bg-[#fefffe] dark:bg-[#2a3743] text-black dark:text-white w-full py-[1rem] lg:w-[35%] rounded-md shadow-xs"
        type="text"
        placeholder="Search for a country..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {darkMode === "dark" ? (
        <img
          src={searchDarkIcon}
          alt="search icon"
          className="w-5 h-5 absolute top-3 left-3"
        />
      ) : (
        <img
          src={searchLightIcon}
          alt="search icon"
          className="w-5 h-5 absolute top-3 left-3"
        />
      )}
    </div>
  );
};
export default Search;
