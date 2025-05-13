import IGroupTimeSheet from "@/interfaces/timesheet/groupTimeSheet.interface";
import getDayFromDate from "./getDayFromDate";
// Ham render da cham cong hay chua va hien ca lam
const markTimeSheet = (group: IGroupTimeSheet, index: number) => {
  const today = getDayFromDate(new Date().toISOString().slice(0, 10));
  // Chi render nhung ngay nho hon ngay hien tai
  if (index > today) return;

  const timesheet = group.timesheets.find(
    (ts) => getDayFromDate(ts.workingDate) === index
  );

  if (!timesheet) return;
  if (!timesheet.status) return;

  return timesheet.workingHours > 0 ? timesheet.workShiftId : "X";
};

export default markTimeSheet;
