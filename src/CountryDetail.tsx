import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Country } from "@/types/Country";
import CountryLayout from "@/components/layout/CountryLayout";
import backWhite from "@/assets/back_white.svg";
import backBlack from "@/assets/back_black.svg";

const CountryDetail = () => {
  const params = useParams();
  const rawParam = params.name ?? "";
  // Decode percent-encoded route param (e.g., %20 → space)
  const countryName = decodeURIComponent(rawParam);

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
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
        const json: Country[] = await res.json();
        const match = json.find((item) => item.name === countryName);
        setCountry(match ?? null);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <CountryLayout darkMode={darkMode} handleDarkMode={handleDarkMode}>
      <main>
        <article className="flex flex-col gap-12 mx-[1.5rem] mb-[2rem]">
          <header>
            <a
              href="/"
              className="flex gap-2 items-center bg-white dark:bg-[#2a3743] w-fit px-5 py-1 mt-[2rem] rounded-lg shadow-xs"
            >
              {darkMode === "dark" ? (
                <img src={backWhite} alt="" className="w-5 h-5" />
              ) : (
                <img src={backBlack} alt="" className="w-5 h-5" />
              )}
              Back
            </a>
          </header>
          <section>
            {loading && <p>Loading…</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && (
              <>
                {country ? (
                  <div className="flex flex-col gap-8">
                    <img src={country.flag} alt={country.name} />
                    <h1 className="text-2xl font-bold">{country.name}</h1>
                    <div>
                      <p>Native Name: {country.nativeName}</p>
                      <p>Population: {country.population}</p>
                      <p>Region: {country.region}</p>
                      <p>Sub Region: {country.subregion}</p>
                      <p>Capital: {country.capital}</p>
                    </div>
                    <div>
                      <p>Top Level Domain: {country.topLevelDomain}</p>
                      <p>
                        Currencies:{" "}
                        {Array.isArray(country.currencies) && country.currencies.length > 0
                          ? country.currencies.map((item) => item.name).join(", ")
                          : "N/A"}
                      </p>
                      <p>
                        Languages:{" "}
                        {Array.isArray(country.languages) && country.languages.length > 0
                          ? country.languages.map((item) => item.name).join(", ")
                          : "N/A"}
                      </p>
                    </div>
                    {Array.isArray(country.borders) &&
                    country.borders.length > 0 ? (
                      <div className="grid grid-cols-3 gap-4 lg:grid-cols-8 text-center ">
                        {country.borders.map((item) => (
                          <div
                            key={item}
                            className="bg-white dark:bg-[#2a3743] text-[0.7rem] dark:text-Grey-400 px-2 py-1 shadow-xs"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        No border countries
                      </p>
                    )}
                  </div>
                ) : (
                  <p>Country not found.</p>
                )}
              </>
            )}
          </section>
        </article>
      </main>
    </CountryLayout>
  );
};
export default CountryDetail;
