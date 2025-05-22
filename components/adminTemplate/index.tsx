import { ReactNode } from "react";
import Header from "./header";

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

const AdminTemplate = async ({ children, id, title, itemProps }: adminProp) => {
  return (
    <div className="w-full min-h-dvh bg-white">
      <Header id={id} title={title} itemProps={itemProps}>
        {children}
      </Header>
    </div>
  );
};

export default AdminTemplate;
