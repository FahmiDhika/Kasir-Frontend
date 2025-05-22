"use client";

import { BASE_URL_API } from "@/global";
import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { storeCookie } from "@/lib/client-cookie";

// icon import
import { FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [nama, setNama] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_URL_API}/user/login`;
      const payload = JSON.stringify({ nama, password });

      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.status == true) {
        toast(data.message, {
          hideProgressBar: false,
          containerId: "toastLogin",
          type: "success",
        });

        storeCookie("id", data.data.id);
        storeCookie("nama", data.data.nama);
        storeCookie("role", data.data.role);
        storeCookie("token", data.token);

        let role = data.data.role;

        if (role == "ADMIN") {
          setTimeout(() => router.push(`/admin/dashboard`), 1000);
        } else if (role == "KASIR") {
          setTimeout(() => router.push(`kasir/dashboard`), 1000);
        }
      } else {
        toast(data.message, {
          hideProgressBar: false,
          type: "warning",
          containerId: "toastLogin",
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Error dari server`, {
        hideProgressBar: false,
        type: "error",
        containerId: "toastLogin",
      });
    }
  };

  return (
    <div className="bg-[#FAF6E9] w-full min-h-dvh flex justify-center items-center px-6 lg:px-0">
      <div className="w-full lg:w-1/3 text-center bg-[#FFFDF6] px-6 lg:px-14 py-9 rounded-3xl shadow-xl">
        <h1 className="font-bold tracking-wide text-4xl mb-2">Kasir Mura 5</h1>
        <p className="text-lg mb-9">login terlebih dahulu.</p>

        <form onSubmit={handleSubmit}>
          <div className="text-start mb-4">
            <label className="block text-lg text-gray-600">Nama</label>
            <input
              type="text"
              value={nama}
              id="nama"
              placeholder="admin"
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border-[#A0C878] bg-gray-200 focus:outline-none rounded-xl"
            />
          </div>
          <div className="text-start mb-4">
            <label className="block text-lg text-gray-600">Password</label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                id="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-[#A0C878] bg-gray-200 focus:outline-none rounded-l-xl"
              />
              <button
                type="button"
                className="bg-black px-2 rounded-r-xl text-white cursor-pointer"
                onClick={togglePassword}
              >
                <FaEyeSlash size={24} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-fit hover:bg-[#A0C878] border-2 border-[#A0C878] px-14 py-2 rounded-full mt-9 cursor-pointer ease-in-out duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
