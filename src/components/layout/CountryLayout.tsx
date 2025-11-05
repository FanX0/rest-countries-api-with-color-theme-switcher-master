import type { ReactNode } from "react";
import Navbar from "./Navbar";

const CountryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default CountryLayout;
