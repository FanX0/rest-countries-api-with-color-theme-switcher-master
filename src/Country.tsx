import CountryLayout from "@/components/layout/CountryLayout";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Card from "./components/Card";
import type { Country as CountryModel } from "@/types/Country";

const Country = () => {
  const [country, setCountry] = useState<CountryModel[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<
    "All" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania"
  >("All");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "dark" ? "dark" : "light";
  });

  const handleDarkMode = () => {
    setDarkMode(darkMode === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (darkMode === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/data.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: CountryModel[] = await res.json();
        setCountry(json);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const filtered = (country ?? []).filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesRegion = region === "All" || item.region === region;
    return matchesName && matchesRegion;
  });

  return (
    <CountryLayout darkMode={darkMode} handleDarkMode={handleDarkMode}>
      <main className="flex items-center w-full px-[1.5rem] py-[2rem] lg:px-[5rem] ">
        <article className="w-full ">
          <header className="flex flex-col  lg:flex-row lg:justify-between gap-6">
            <Search darkMode={darkMode} value={query} onChange={setQuery} />
            <Filter value={region} onChange={setRegion} />
          </header>
          <section className="mt-[4rem] mx-[2rem] lg:mx-0">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul className="grid grid-cols-1 gap-[2rem] lg:grid-cols-4 lg:gap-[4rem]">
              {filtered.map((item) => (
                <Card key={item.name} country={item} />
              ))}
            </ul>
          </section>
        </article>
      </main>
    </CountryLayout>
  );
};

export default Country;
