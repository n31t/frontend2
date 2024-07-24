'use client'
import { JapaneseYenIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/app/context/context";
import { useEffect } from "react";

export function Header() {
  const { isLoggedIn, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    console.log('Header isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header className="flex shadow-lg md:py-2 px-4 sm:px-10 bg-white min-h-[80px] md:min-h-[100px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Link href="/" className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <img src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/warmhometext2.png" alt="logo" className="h-14 md:h-24" />
        </Link>

        <div id="collapseMenu" className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          {/* <button id="toggleClose" className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-black" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
            </svg>
          </button> */}

          <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {/* <li className="mb-6 hidden max-lg:block">
              <Link href="#">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className="w-36" />
              </Link>
            </li> */}
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link href="/" className="hover:text-[#CB5200] text-[#FF7024] block font-semibold text-[15px]">
                Главная
              </Link>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <Link href="/about" className="hover:text-[#CB5200] text-[#FF7024] block font-semibold text-[15px]">
                О нас
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center ml-auto space-x-3 md:space-x-6">
        {isLoggedIn ? (
          <Link href="/profile">
            <UserCircle className="w-8 h-8 text-[#382AAF] hover:text-[#CB5200] transition-colors duration-300" />
          </Link>
        ) : (
          <Link href="/login">
            <Button className="px-4 py-2 text-sm rounded-sm font-bold text-[#FFFFFF] border-2 border-[#382AAF] bg-[#382AAF] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
              <span className="text-[#ffffff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#382AAF]">Войти</span>
            </Button>
          </Link>
        )}
          {/* <Link href="/register">
          <Button className="px-4 py-2 text-sm rounded-sm font-bold text-[#FFFFFF] border-2 border-[#4A00E0] bg-[#4A00E0] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#4A00E0]">
            Регистрация
          </Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
