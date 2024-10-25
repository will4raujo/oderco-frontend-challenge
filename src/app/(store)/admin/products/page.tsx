import AdminProductsComponent from "@/components/organisms/admin-products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "admin - produtos"
};

export default function AdminProductsPage() {
  return (
    <AdminProductsComponent />
  );
};