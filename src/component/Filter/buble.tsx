"use client";

interface bubleItemFilterProps {
    filter: string;
    fn: (filter: string) => void;
    isActive: boolean;
}

export default function BubleItemFilter({filter, fn, isActive}: bubleItemFilterProps) {

  return (
    <div
        className={`rounded-2xl border border-[#4e4e4e4b] min-w-14.5 text-center p-2 default-shadow cursor-pointer ${isActive ? "bg-[#121212] text-white" : "bg-white text-[#121212]"}`}
        onClick={() => fn(filter)}>
        <p>{filter}</p>
    </div>
  )
}
