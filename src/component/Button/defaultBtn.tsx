"use client"

interface defaultBtnProps {
    name: string;
    fn: () => void;
}

export default function DefaultBtn({name, fn}: defaultBtnProps) {
  return (
    <button
        className='rounded-md border border-[#b3b3b34b] w-fit p-2'
        onClick={fn}>
        {name}
    </button>
  )
}
