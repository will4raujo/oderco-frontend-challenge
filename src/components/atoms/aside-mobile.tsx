'use client'
import { Menu } from "lucide-react";
import { ReactNode } from "react";

interface AsideMobileProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export default function AsideMobile({ children, isOpen, setIsOpen }: AsideMobileProps) {
  const handleToggle = () => {
    setIsOpen!(!isOpen);
  }
  return (
    <>
      <Menu className="lg:hidden absolute top-5 left-4 z-50" color="#14b7dc" onClick={handleToggle} />
      <aside className={`transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} lg:hidden w-screen h-10 bg-[#141034] absolute top-14 left-0 z-20 flex-col gap-4 transition-all duration-300 ease-in-out`}>
        {children}
      </aside>
    </>
  )
}