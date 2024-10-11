import Header from "@/components/molecules/header";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {  
  return (
    <div className="bg-zinc-50 min-h-screen grid grid-rows-[4rem_auto] max-w-full">
      <Header />
      {children}
    </div>
  )
}