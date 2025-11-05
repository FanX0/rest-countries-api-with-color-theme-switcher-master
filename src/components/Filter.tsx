import { useEffect, useRef, useState } from "react";
type Region = "All" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

const options: { label: string; value: Region }[] = [
  { label: "Filter by Region", value: "All" },
  { label: "Africa", value: "Africa" },
  { label: "America", value: "Americas" },
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "Oceania", value: "Oceania" },
];

const Filter = ({ value, onChange }: { value: Region; onChange: (v: Region) => void }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="w-full lg:w-[20%] relative" ref={containerRef}>
      <button
        type="button"
        className="w-full py-[1rem] bg-white dark:bg-[#2a3743] text-black dark:text-white px-[1.5rem] rounded-md shadow-xs flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected.label}</span>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 mt-2 w-full rounded-md bg-white dark:bg-[#2a3743] shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`cursor-pointer px-4 py-2 text-sm ${
                opt.value === value
                  ? "bg-[#eef2ff] text-black dark:bg-[#23303b] dark:text-white"
                  : "text-black dark:text-white"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Filter;
