import Loading from "@/components/ui/loading";
import { useGetTimeSheetByMonth } from "@/hooks/timeSheet";
import getDayFromDate from "@/utils/getDayFromDate";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formatDate from "@/utils/formatDate";
import getDaysByMonthYear from "@/utils/getDaysByMonthYear";
import TimeKeepingModal from "@/components/modal/timeKeeping.modal";
import ITimeSheet from "@/interfaces/timesheet/timeSheet.interface";

const TimeSheet = () => {
  const days = getDaysByMonthYear(6, 2025);
  const [month, setMonth] = useState("JUNE");
  const [year, setYear] = useState("2025");
  const [groupData, setGroupData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectEmp, setSelectEmp] = useState({});
  const { data, isLoading, error } = useGetTimeSheetByMonth(month, year);
  useEffect(() => {
    if (data && data.length > 0) {
      const result = data.reduce((acc, curr) => {
        const found = acc.find((item: ITimeSheet) => item.empId === curr.empId);
        if (found) {
          found.workingDate.push(curr.workingDate);
          found.workingHours.push(curr.workingHours);
          found.workShiftId.push(curr.workShiftId);
          found.overtimeWorkingHours.push(curr.overtimeWorkingHours);
        } else {
          acc.push({
            empId: curr.empId,
            empName: curr.empName,
            empTypeName: curr.empTypeName,
            workingDate: [curr.workingDate],
            workingHours: [curr.workingHours],
            workShiftId: [curr.workShiftId],
            overtimeWorkingHours: [curr.overtimeWorkingHours],
          });
        }
        return acc;
      }, []);
      setGroupData(result);
    } else {
      setGroupData([]);
    }
  }, [data]);

  const handleOpenTimeKeepingModal = (emp: ITimeSheet) => {
    setOpenModal(true);
    setSelectEmp(emp);
  };

  if (isLoading) {
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
              <SelectItem value="JUNE">June</SelectItem>
              <SelectItem value="7">Tháng 7</SelectItem>
              <SelectItem value="8">Tháng 8</SelectItem>
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
              {days.map((d) => (
                <th key={d.day} className="border  border-gray-400 w-10">
                  {d.day}
                </th>
              ))}
            </tr>
            <tr>
              <td className="border  border-gray-400  " colSpan={3}></td>
              {days.map((d, i) => (
                <td
                  key={i}
                  className="border  border-gray-400 py-4 text-[13px] font-medium"
                >
                  {d.weekday}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {groupData.length > 0 &&
              groupData.map((emp: ITimeSheet, index) => (
                <tr key={index}>
                  <td className="border  border-gray-400 py-2 ">{index + 1}</td>
                  <td className="border  border-gray-400     text-left pl-1">
                    {emp.empName}
                  </td>
                  <td className="border  border-gray-400 ">
                    {emp.empTypeName}
                  </td>
                  {days.map((_, i) => (
                    <td
                      onClick={() => handleOpenTimeKeepingModal(emp)}
                      key={i}
                      className={`border border-gray-400 cursor-pointer ${
                        emp.workingDate.some(
                          (w: Date[]) => getDayFromDate(w) === i + 1
                        ) && emp.workingHours[i + 1] > 0
                          ? emp.workShiftId[i + 1] === "F1"
                            ? "bg-blue-300"
                            : "bg-orange-300"
                          : "bg-red-300"
                      }`}
                    >
                      {emp.workingDate.some(
                        (w: Date[]) => getDayFromDate(w) === i + 1
                      ) && emp.workingHours[i + 1] > 0
                        ? emp.workShiftId[i + 1]
                        : "X"}
                    </td>
                  ))}
                </tr>
              ))}

            <tr>
              <td
                className="border py-1  border-gray-400 text-center"
                colSpan={3}
              >
                Total
              </td>
              {days.map((_, i) => (
                <td key={i} className="border  border-gray-400"></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <TimeKeepingModal
        open={openModal}
        onOpenchange={setOpenModal}
        emp={selectEmp}
      />
    </div>
  );
};

export default TimeSheet;
