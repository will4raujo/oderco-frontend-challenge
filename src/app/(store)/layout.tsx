import { ReactNode } from "react";
export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1>Store Layout</h1>
      {children}
    </>
  )
}