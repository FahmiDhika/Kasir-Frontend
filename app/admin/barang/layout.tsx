import AdminTemplate from "@/components/adminTemplate";
import itemList from "../itemList";

export const metadata = {
  title: "Barang | Admin Kasir",
  description: "Build & Develop by Fahmi Dhika",
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <div>
      <AdminTemplate id="barang" title="Barang" itemProps={itemList}>
        {children}
      </AdminTemplate>
    </div>
  );
};

export default RootLayout;
