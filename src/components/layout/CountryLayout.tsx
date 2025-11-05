import type { ReactNode } from "react";
import Navbar from "./Navbar";

const CountryLayout = ({
  children,
  darkMode,
  handleDarkMode,
}: {
  children: ReactNode;
  darkMode: "dark" | "light";
  handleDarkMode: () => void;
}) => {
  return (
    <>
      <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} />
      {children}
    </>
  );
};
export default CountryLayout;
