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
} from "../ui/dialog";
import formatDate from "@/utils/formatDate";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useAttendance } from "@/hooks/timeSheet";
import { useQueryClient } from "@tanstack/react-query";
import IGroupTimeSheet from "@/interfaces/timesheet/groupTimeSheet.interface";

interface Ts extends IGroupTimeSheet {
  index: number;
}
const TimeSheetModal = ({
  ts,
  open,
  onOpenchange,
}: {
  ts: Ts;
  open: boolean;
  onOpenchange: () => void;
}) => {
  const queryClient = useQueryClient();
  const [month, setMonth] = useState("MAY");
  const [year, setYear] = useState("2025");
  const [statusTimeSheet, setStatusTimeSheet] = useState("work");
  const [menuTimeSheet, setMenuTimeSheet] = useState("attendance");
  const [workingHours, setWorkingHours] = useState<number>(8);
  const { mutate, isPending } = useAttendance();

  const timesheet = ts.timesheets[ts.index];
  console.log(timesheet);

  const handleAttendance = () => {
    const data = {
      empId: ts.empId,
      // workingHours,
      workingDate: timesheet.workingDate,
    };
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["time-sheets", month, year],
        });
        onOpenchange(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenchange}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className=" outline-none rounded px-5 py-5 flex flex-col min-w-[700px] ">
        <DialogDescription className="hidden"></DialogDescription>
        <h3 className="text-xl font-semibold text-center">Time Sheet</h3>
        <div className="flex justify-between items-start ">
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-medium">
              Employee Name:{" "}
              <span className="font-semibold text-[16px] ">{ts.empName}</span>
            </h4>
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium">Work Shifts:</span>
              <Select defaultValue={ts.workShiftId}>
                <SelectTrigger className=" border border-gray-300  rounded outline-none shadow-none  text-black ">
                  <SelectValue placeholder="Chọn ca làm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F1">F1 (10:00 - 18:00)</SelectItem>
                  <SelectItem value="F2">F2 (14:00 - 22:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium">Time:</span>
            <span className="text-[16px] ">{formatDate(new Date())}</span>
          </div>
        </div>
        <div className="">
          <div className=" border-b border-gray-400 pb-2 text-sm mt-5">
            <ul className="flex items-center ">
              <li
                onClick={() => setMenuTimeSheet("attendance")}
                className={`px-5 cursor-pointer ${
                  menuTimeSheet === "attendance"
                    ? "text-blue-700 opacity-100"
                    : "opacity-70 "
                }`}
              >
                Attendance
              </li>
              <li
                className={`px-5 cursor-pointer ${
                  menuTimeSheet === "violation"
                    ? "text-blue-700 opacity-100"
                    : "opacity-70 "
                }`}
                onClick={() => setMenuTimeSheet("violation")}
              >
                Violation
              </li>
              <li
                onClick={() => setMenuTimeSheet("reward")}
                className={`px-5 cursor-pointer ${
                  menuTimeSheet === "reward"
                    ? "text-blue-700 opacity-100"
                    : "opacity-70 "
                }`}
              >
                Reward
              </li>
            </ul>
          </div>
          <div className="">
            {menuTimeSheet === "attendance" && (
              <>
                <div className="flex items-center gap-10 mt-5 text-[13px]">
                  <span>Attendance</span>
                  <Select
                    value={statusTimeSheet}
                    onValueChange={(e) => setStatusTimeSheet(e)}
                  >
                    <SelectTrigger className=" border border-gray-300  text-[13px] rounded outline-none shadow-none  text-black ">
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {statusTimeSheet === "work" && (
                  <div className="flex items-center gap-10 text-[13px] mt-5">
                    <label htmlFor="hours">Work Hours</label>
                    <input
                      id="hours"
                      type="number"
                      value={workingHours}
                      className="outline-none border border-gray-300 rounded px-2 py-1.5 w-20"
                    />
                  </div>
                )}
              </>
            )}
            {statusTimeSheet === "violation" && (
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
          <button
            onClick={() => handleAttendance()}
            className="px-4 py-2 bg-red-800 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeSheetModal;
