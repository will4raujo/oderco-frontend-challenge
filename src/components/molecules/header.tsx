'use client';
import logo from "../../../public/logo.svg";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  return (
    <header className=" bg-[#141034] h-16 p-4 flex justify-between items-center">
        <Menu className="lg:hidden" color="#14b7dc"/>
        <div className="">
        <Image src={logo} alt="logo" className="hidden md:block w-[200px]" />
        </div>
        <div className="flex items-center gap-4 md:gap-14">
          <div className="relative">
            <ShoppingCart color="#14b7dc"/>
            <span className="rounded-xl bg-white absolute -right-2 -top-1 w-4 h-3 text-sm flex items-center justify-center font-bold">1</span>
          </div>
          {isAuthenticated ? (
            <>
            <Avatar className="h-8">
              <div className="  bg-[#14b7dc] border-[#141034] border-[1px] rounded-full w-8 h-8 flex justify-center items-center">
                <User color="#141034" />
              </div>
            </Avatar>
            </>
          ) : (
            <Button>Entrar</Button>
          )}
        </div>
      </header>
  )
}