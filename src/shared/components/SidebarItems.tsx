import { IconType } from "react-icons";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
interface ISidebarItems {
  data: { icon: IconType; name: string; path?: string; onClick?: () => void };
  active: boolean;
}
const SidebarItems = ({ data, active }: ISidebarItems) => {
  const navigate = useNavigate();
  const Icon = data.icon;
  const baseStles =
    "hover:bg-blue-200 w-full h-12 rounded-md flex items-center hover:text-blue-900 cursor-pointer text-black pl-2 mb-4";
  const combinedStles = clsx(baseStles, {
    "bg-blue-200 text-blue-900": active,
  });
  return (
    <>
      <div
        className={combinedStles}
        onClick={() => (data.onClick ? data.onClick() : navigate(data.path!))}
      >
        <Icon className="text-2xl" />
        <p className="ml-5">{data.name}</p>
      </div>
    </>
  );
};

export default SidebarItems;
