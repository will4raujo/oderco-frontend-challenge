import LoginComponent from "@/components/organisms/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "login"
};

export default function LoginPage() {
  return (
    <LoginComponent />
  );
};