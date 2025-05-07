import {
  HomeIcon,
  ListIcon,
  ConciergeBellIcon,
  TableIcon,
  AlignJustifyIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="border-t w-full border-gray-300 mx-auto flex items-center  justify-center bg-white   fixed bottom-0">
        <div className="flex items-center gap-40 text-md font-medium">
          <Link to="/" className="flex items-center gap-3 ">
            <HomeIcon />
            <span>Home</span>
          </Link>
          <Link to="/serving/orders" className="flex items-center gap-3  ">
            <ListIcon />
            <span>Orders</span>
          </Link>
          <Link
            to="/serving/orders/add"
            className="flex -translate-y-1/2 items-center   justify-center bg-[#ebc01c] p-4.5  rounded-full "
          >
            <ConciergeBellIcon className="size-6 text-black" />
          </Link>
          <Link
            to="/serving/orders/tables"
            className="flex items-center gap-3 "
          >
            <TableIcon />
            <span>Tables</span>
          </Link>
          <button className="flex items-center gap-3 ">
            <AlignJustifyIcon />
            <span>More</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Footer;
