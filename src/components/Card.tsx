import type { Country } from "@/types/Country";

const Card = ({ country }: { country: Country }) => {
  return (
    <li className="bg-[#fefffe] dark:bg-[#2a3743] text-black dark:text-white w-full rounded-xl overflow-hidden">
      <a href={`/${encodeURIComponent(country.name)}`}>
        <img
          src={country.flags.png}
          alt={country.name}
          className="w-full h-[12rem] object-cover lg:h-[10rem]"
        />
        <div className="flex flex-col gap-[1rem] p-[2rem]">
          <h2 className="text-[1.3rem] font-extrabold">{country.name}</h2>
          <div>
            <p className="text-[1.1rem] font-light">
              <span className="font-semibold">Population:</span>
              {country.population}
            </p>
            <p className="text-[1.1rem] font-light">
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p className="text-[1.1rem] font-light">
              <span className="font-semibold">Capital:</span> {country.capital}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Card;
