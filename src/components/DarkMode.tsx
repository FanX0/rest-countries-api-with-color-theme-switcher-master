import moonIcon from "@/assets/110827_moon_icon.svg";
import sunIcon from "@/assets/9025960_sun_icon.svg";
const DarkMode = ({
  darkMode,
  handleDarkMode,
}: {
  darkMode: "dark" | "light";
  handleDarkMode: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={handleDarkMode}
      className="flex items-center"
    >
      {darkMode === "dark" ? (
        <>
          <img src={sunIcon} alt="dark mode icon" className="w-5 h-5 mr-2" />
          Light Mode
        </>
      ) : (
        <>
          <img src={moonIcon} alt="dark mode icon" className="w-7 h-7 mr-2" />
          Dark Mode
        </>
      )}
    </button>
  );
};
export default DarkMode;
