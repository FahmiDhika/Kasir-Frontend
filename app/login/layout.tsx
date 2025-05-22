import { ToastContainer } from "react-toastify";

export const metadata = {
  title: `Login | Kasir `,
  description: `Build & Develop by Fahmi Dhika`,
};

type PropsLayout = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: PropsLayout) => {
  return (
    <div>
      {children}
      <ToastContainer
        containerId={`toastLogin`}
        autoClose={2000}
        position="top-center"
      />
    </div>
  );
};

export default RootLayout;
