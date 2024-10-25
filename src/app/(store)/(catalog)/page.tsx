import CatalogComponent from "@/components/organisms/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "catálogo"
};

export default function CatalogPage() {
  return (
      <CatalogComponent />    
  );
};