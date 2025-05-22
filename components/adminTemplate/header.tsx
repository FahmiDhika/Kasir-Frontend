"use client";

import { ReactNode, useState, useEffect } from "react";
import { removeCookie } from "@/lib/client-cookie";
import { BASE_URL_API } from "@/global";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/client-cookie";
import Item from "./item";
import Image from "next/image";

// icon import
import { IoMenu } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

type itemProps = {
  id: string;
  label: string;
  path: string;
};

type adminProps = {
  children: ReactNode;
  id: string;
  title: string;
  itemProps: itemProps[];
};

const Header = ({ children, id, title, itemProps }: adminProps) => {
  const [nama, setNama] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    const nama = getCookie("nama");
    if (nama) {
      setNama(nama);
    }
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    removeCookie("id");
    removeCookie("nama");
    removeCookie("role");
    removeCookie("token");
    router.replace(`/login`);
  };

  return (
    <div className="w-full min-h-dvh">
      <header className="w-full h-fit flex justify-between items-center gap-5 px-6 py-4 bg-[#FAF6E9] shadow-xl">
        <button className="w-fit lg:hidden" onClick={() => setIsShow(true)}>
          <IoMenu size={32} />
        </button>
        <div className="w-full relative flex justify-between items-center">
          {/* Kiri: Info Admin (hanya tampil di desktop) */}
          <h1 className="hidden lg:block text-xl tracking-wider">
            Admin,{" "}
            <span className="font-bold text-2xl text-[#A0C878]">{nama}</span>
          </h1>

          {/* Tengah: Title */}
          {/* Versi mobile: tampil biasa */}
          <h1 className="font-bold text-2xl tracking-wider lg:hidden px-2 border-b-4">
            {title}
          </h1>

          {/* Versi desktop: posisinya absolut di tengah */}
          <h1 className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 font-bold text-2xl tracking-wider px-2 border-b-4">
            {title}
          </h1>

          {/* Kanan: Logout button (hanya di desktop) */}
          <button
            onClick={handleLogout}
            className="hidden lg:block bg-red-500 px-4 py-2 font-bold text-white rounded-full cursor-pointer hover:bg-red-700"
          >
            Log out
          </button>
        </div>

        <div
          className={`w-3/4 bg-[#FAF6E9] fixed top-0 right-full h-full z-50 transition-transform duration-300 ease-in-out ${
            isShow ? `translate-x-full` : ``
          }`}
        >
          <div className="w-full flex-col justify-center items-center text-center py-3 px-3">
            <div className="w-full text-end mb-3">
              <button onClick={() => setIsShow(false)}>
                <MdCancel size={32} />
              </button>
            </div>

            <h1 className="font-bold tracking-wide text-3xl mb-14">
              Kasir Mura 5
            </h1>

            <p className="mb-14">
              Admin, <br />
              <span className="font-bold text-[#A0C878] text-2xl border-b-4 px-2">
                {nama}
              </span>
            </p>

            <div className="mb-14">
              {itemProps.map((item, index) => (
                <Item
                  label={item.label}
                  path={item.path}
                  active={item.id === id}
                  key={`keyItem${index}`}
                />
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-1/2 bg-red-500 py-2 font-bold text-white rounded-full"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-4">{children}</div>
    </div>
  );
};

export default Header;
