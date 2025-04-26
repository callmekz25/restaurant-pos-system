import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="px-30   py-3 flex items-center border-b border-gray-300 justify-between shadow">
      <div className="">Logo</div>
      <div className="flex items-center max-w-[40%] flex-1 rounded-md bg-[#f7f7f7] shadow">
        <Select>
          <SelectTrigger className=" border-none  outline-none shadow-none font-medium text-black min-w-[100px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="h-[20px] bg-gray-400 w-[1px]"></div>
        <div className="relative w-full ">
          <input
            type="text"
            className="w-full py-2.5 pl-2.5 outline-none text-sm font-normal   "
            placeholder="Tìm kiếm..."
          />
          <button className="absolute right-2 top-[50%] -translate-y-1/2 flex items-center justify-center">
            <SearchIcon className="size-4.5" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button>Profile</button>
      </div>
    </div>
  );
};

export default Header;
