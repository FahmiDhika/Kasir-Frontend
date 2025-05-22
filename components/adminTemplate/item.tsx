import Link from "next/link";

interface itemProps {
  label: string;
  path: string;
  active?: boolean;
}

const Item = ({ label, path, active }: itemProps) => {
  return (
    <Link
      href={path}
      className={`flex items-center space-x-2 px-4 py-2 rounded ${
        active ? "bg-[#DDEB9D]" : "bg-auto"
      }`}
    >
      <p>{label}</p>
    </Link>
  );
};

export default Item;
