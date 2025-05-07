import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import formatDate from "@/utils/formatDate";
import { PlusIcon, TrashIcon } from "lucide-react";
const TimeKeepingModal = ({
  empId,
  open,
  onOpenchange,
}: {
  empId: string;
  open: boolean;
  onOpenchange: () => void;
}) => {
  const [statusTimeKeeping, setStatusTimeKeeping] = useState("work");
  const [menuTimeKeeping, setMenuTimeKeeping] = useState("timekeeping");
  return (
    <Dialog open={open} onOpenChange={onOpenchange}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className=" outline-none rounded px-5 py-5 flex flex-col min-w-[700px] ">
        <DialogDescription className="hidden"></DialogDescription>
        <h3 className="text-xl font-semibold text-center">Chấm công</h3>
        <h4>
          Nhân viên: <span className="font-semibold">{empId}</span>
        </h4>
        <div className="flex justify-between ">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Thời gian:</span>
              <span>{formatDate(new Date())}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Ca làm việc:</span>
              <Select defaultValue="F1">
                <SelectTrigger className=" border border-gray-300  rounded outline-none shadow-none  text-black ">
                  <SelectValue placeholder="Chọn ca làm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F1">Sáng (10:00 - 18:00)</SelectItem>
                  <SelectItem value="F2">Tối (14:00 - 22:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <textarea
            name="note"
            id="note"
            className="border border-gray-300 min-h-[70px] flex-[0_0_45%] rounded placeholder:text-sm p-2 text-sm outline-none"
            placeholder="Ghi chú..."
          ></textarea>
        </div>
        <div className="">
          <div className=" border-b border-gray-400 pb-2 text-sm mt-5">
            <ul className="flex items-center ">
              <li
                onClick={() => setMenuTimeKeeping("timekeeping")}
                className={`px-5 cursor-pointer ${
                  menuTimeKeeping === "timekeeping"
                    ? "text-blue-700 opacity-100"
                    : "opacity-70 "
                }`}
              >
                Chấm công
              </li>
              <li
                className={`px-5 cursor-pointer ${
                  menuTimeKeeping === "violation"
                    ? "text-blue-700 opacity-100"
                    : "opacity-70 "
                }`}
                onClick={() => setMenuTimeKeeping("violation")}
              >
                Phạt vi phạm
              </li>
              <li
                onClick={() => setMenuTimeKeeping("reward")}
                className={`px-5 cursor-pointer ${
                  menuTimeKeeping === "reward"
                    ? "text-blue-700 opacity-100"
                    : "opacity-70 "
                }`}
              >
                Thưởng
              </li>
            </ul>
          </div>
          <div className="">
            {menuTimeKeeping === "timekeeping" && (
              <>
                <div className="flex items-center gap-10 mt-5 text-[13px]">
                  <span>Chấm công</span>
                  <Select
                    value={statusTimeKeeping}
                    onValueChange={(e) => setStatusTimeKeeping(e)}
                  >
                    <SelectTrigger className=" border border-gray-300  text-[13px] rounded outline-none shadow-none  text-black ">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Đi làm</SelectItem>
                      <SelectItem value="off">Nghỉ làm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {statusTimeKeeping === "work" && (
                  <div className="flex items-center gap-11.5 text-[13px] mt-5">
                    <label htmlFor="hours">Số giờ làm</label>
                    <input
                      id="hours"
                      type="number"
                      className="outline-none border border-gray-200 rounded px-2 py-1.5 w-22"
                    />
                  </div>
                )}
              </>
            )}
            {menuTimeKeeping === "violation" && (
              <>
                <div className="mt-5 text-sm">
                  <div className="flex items-center font-medium ">
                    <p className="w-[45%] px-4">Nội dung vi phạm</p>
                    <p className="w-[25%] px-4">Mức áp dụng</p>
                    <p className="w-[25%] px-4">Thành tiền</p>
                    <p className="flex-1 px-4"></p>
                  </div>
                  <div className="flex items-center text-[13px] mt-4">
                    <div className="px-4 w-[45%]">
                      <input
                        type="text"
                        name=""
                        id=""
                        className=" outline-none w-full  px-1  border-b border-gray-400"
                      />
                    </div>
                    <div className="px-4 w-[25%]">
                      <input
                        type="text"
                        name=""
                        id=""
                        className=" outline-none w-full  px-1  border-b border-gray-400"
                      />
                    </div>
                    <div className="px-4 w-[25%]">
                      <input
                        type="text"
                        readOnly
                        name=""
                        id=""
                        className=" outline-none w-full  px-1 border-b border-gray-400"
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <button>
                        <TrashIcon className="size-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 mt-10 text-[12px] border border-gray-400 rounded px-2 py-1.5">
                    <PlusIcon className="size-3" />
                    Thêm vi phạm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center text-sm justify-end gap-5">
          <button
            onClick={() => onOpenchange(false)}
            className="px-4 py-1.5 border border-gray-300 rounded"
          >
            Huỷ
          </button>
          <button className="px-4 py-2 bg-red-800 text-white rounded">
            Lưu
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeKeepingModal;
