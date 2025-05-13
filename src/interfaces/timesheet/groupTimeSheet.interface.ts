import ITimeSheetEntry from "./timeSheetEntry.interface";
interface IGroupTimeSheet {
  empId: string;
  empName: string;
  empTypeName: string;
  timesheets: ITimeSheetEntry[];
}
export default IGroupTimeSheet;
