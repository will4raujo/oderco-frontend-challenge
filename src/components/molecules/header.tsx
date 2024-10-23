'use client';
import logo from "../../../public/logo.svg";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useRouter, usePathname } from "next/navigation";
import ReactLoading from 'react-loading';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { items } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const user = localStorage.getItem('@wa-store:user');
  const [loading, setLoading] = useState(false);

  const handleNavigateToLogin = () => {
    setLoading(true);
    router.push('/login');
  }

  const handleNavigateToHome = () => {
    router.push('/');
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (pathname === '/admin/products' && user !== null) {
      setIsAuthenticated(true);
    }
  }, [pathname]);

  return (
    <header className=" bg-[#141034] h-16 p-4 flex justify-between items-center border-b-white border-b-[1px]">
      <Menu className="lg:hidden" color="#14b7dc" />
      <div className="cursor-pointer" onClick={handleNavigateToHome}>
        <Image src={logo} alt="logo" className="hidden md:block w-[200px]" />
      </div>
      <div className="flex items-center gap-4 md:gap-14">
        {isAuthenticated ? (
            <>
              {user !== null && <span className="text-white text-sm">Olá, {JSON.parse(user).email}</span>}
              <Avatar className="h-8">
                <div className="  bg-[#14b7dc] border-[#141034] border-[1px] rounded-full w-8 h-8 flex justify-center items-center">
                  <User color="#141034" />
                </div>
              </Avatar>
            </>
        ) : (
          <>
            <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
              <ShoppingCart color="#14b7dc" />
              <span className="rounded-xl bg-white absolute -right-2 -top-1 w-4 h-3 text-sm flex items-center justify-center font-bold">{items.length}</span>
            </div>
            <Button onClick={handleNavigateToLogin} variant="outline" className="w-[150px]" disabled={loading}>
              {loading ? <ReactLoading type="spin" color="#14b7dc" height={20} width={20} /> : 'Entrar'}
            </Button>
          </>
        )}
      </div>
    </header>
  )
}