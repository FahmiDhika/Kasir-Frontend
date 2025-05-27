import { ReactNode } from "react";
import Header from "./header";
import { IUser } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_URL_API } from "@/global";
import { get } from "@/lib/api-bridge";

type itemProps = {
  id: string;
  label: string;
  path: string;
};

type adminProp = {
  children: ReactNode;
  id: string;
  title: string;
  itemProps: itemProps[];
};

const getUser = async (): Promise<IUser | null> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_URL_API}/user/get/foto`;
    const { data } = await get(url, TOKEN);
    if (data?.status) return data.data;
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const AdminTemplate = async ({ children, id, title, itemProps }: adminProp) => {
  const foto: IUser | null = await getUser();

  return (
    <div className="w-full min-h-dvh bg-white">
      <Header id={id} title={title} itemProps={itemProps} user={foto}>
        {children}
      </Header>
    </div>
  );
};

export default AdminTemplate;
