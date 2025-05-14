import Loading from "@/components/ui/loading";
import { useGetTimeSheetByMonth, useInitTimeSheet } from "@/hooks/timeSheet";
import getDayFromDate from "@/utils/getDayFromDate";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import getDaysByMonthYear from "@/utils/getDaysByMonthYear";
import markTimeSheet from "@/utils/markTimeSheet";
import TimeSheetModal from "@/components/modal/timeSheet.modal";
import IGroupTimeSheet from "@/interfaces/timesheet/groupTimeSheet.interface";
import ITimeSheetEntry from "@/interfaces/timesheet/timeSheetEntry.interface";
import ITimeSheet from "@/interfaces/timesheet/timeSheet.interface";
interface Ts extends IGroupTimeSheet {
  index: number;
}
const TimeSheet = () => {
  const days = getDaysByMonthYear(6, 2025);
  const [month, setMonth] = useState("MAY");
  const [year, setYear] = useState("2025");
  const [groupData, setGroupData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectTimeSheet, setSelectTimeSheet] = useState<Ts | null>(null);
  const { data, isLoading, error, refetch } = useGetTimeSheetByMonth(
    month,
    year
  );

  const { mutate, isPending } = useInitTimeSheet();
  // Kiểm tra có time sheet tháng năm hiện tại có trong db, chưa thì khởi tạo và refetch lại
  useEffect(() => {
    if (!isLoading && data.length === 0 && !error) {
      mutate(undefined, {
        onSuccess: () => {
          console.log("Init Success!");
          refetch();
        },
      });
    }
  }, [data, isLoading, error, mutate, refetch]);
  // Group time sheet thành dạng IGroupTimeSheet
  useEffect(() => {
    if (data && data.length > 0) {
      const result = data.reduce((acc: IGroupTimeSheet[], curr: ITimeSheet) => {
        const found = acc.find((item) => item.empId === curr.empId);

        const timeSheetEntry: ITimeSheetEntry = {
          workingDate: curr.workingDate,
          workingHours: curr.workingHours,
          workShiftId: curr.workShiftId,
          overtimeWorkingHours: curr.overtimeWorkingHours,
          status: curr.status,
        };

        if (found) {
          found.timesheets.push(timeSheetEntry);
        } else {
          acc.push({
            empId: curr.empId,
            empName: curr.empName,
            empTypeName: curr.empTypeName,
            timesheets: [timeSheetEntry],
          });
        }

        return acc;
      }, []);

      setGroupData(result);
    } else {
      setGroupData([]);
    }
  }, [data]);
  // Hàm xử lý mở modal chấm công và truyền vào time sheet vừa chọn
  const handleOpenTimeSheetModal = (ts: IGroupTimeSheet, index: number) => {
    setOpenModal(true);
    setSelectTimeSheet({ ...ts, index: index });
  };

  if (isLoading || isPending) {
    return <Loading />;
  }

  return (
    <div className=" px-5 py-10 bg-white min-h-[500px]">
      <h2 className="text-center text-2xl font-bold mb-4 uppercase">
        Time Sheet
      </h2>
      <div className="flex items-center mb-4 justify-between">
        <p className="text-center ">
          {month}, {year}
        </p>
        <div className="flex items-center gap-4">
          <Select
            defaultValue="6"
            value={month}
            onValueChange={(e) => setMonth(e)}
          >
            <SelectTrigger className="border border-gray-300 rounded outline-none shadow-none font-medium text-black ">
              <SelectValue placeholder="Chọn tháng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MAY">May</SelectItem>
              <SelectItem value="JUNE">June</SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue="2025"
            value={year}
            onValueChange={(e) => setYear(e)}
          >
            <SelectTrigger className="border border-gray-300 rounded outline-none shadow-none font-medium text-black ">
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table-fixed border  mb-4 border-black text-sm w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="border  border-gray-400 w-10 ">STT</th>
              <th className="border  border-gray-400 w-40 p-5">Full Name</th>
              <th className="border  border-gray-400 w-32">Position</th>
              {days.map((d, i) => (
                <th
                  key={d.day}
                  className={`border  border-gray-400 w-10 ${
                    i + 1 ===
                    getDayFromDate(new Date().toISOString().slice(0, 10))
                      ? "bg-yellow-300"
                      : ""
                  }`}
                >
                  {d.day}
                </th>
              ))}
            </tr>
            <tr>
              <td className="border  border-gray-400  " colSpan={3}></td>
              {days.map((d, i) => (
                <td
                  key={i}
                  className={`border  border-gray-400 py-4 text-[13px] font-medium ${
                    i + 1 ===
                    getDayFromDate(new Date().toISOString().slice(0, 10))
                      ? "bg-yellow-300"
                      : ""
                  }`}
                >
                  {d.weekday}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {groupData.length > 0 &&
              groupData.map((ts: IGroupTimeSheet, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 py-2">{index + 1}</td>
                  <td className="border border-gray-400 text-left pl-1">
                    {ts.empName}
                  </td>
                  <td className="border border-gray-400">{ts.empTypeName}</td>

                  {days.map((_, i) => {
                    const shift = markTimeSheet(ts, i + 1);
                    let bgColor = "";

                    if (shift === "X") {
                      bgColor = "bg-red-300";
                    } else if (shift === "F1") {
                      bgColor = "bg-blue-300";
                    } else if (shift) {
                      bgColor = "bg-orange-300";
                    }

                    return (
                      <td
                        key={i}
                        onClick={() => handleOpenTimeSheetModal(ts, i)}
                        className={`border border-gray-400 cursor-pointer ${bgColor}`}
                      >
                        {shift}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {openModal && selectTimeSheet && (
        <TimeSheetModal
          open={openModal}
          onOpenChange={setOpenModal}
          ts={selectTimeSheet}
        />
      )}
    </div>
  );
};

export default TimeSheet;
