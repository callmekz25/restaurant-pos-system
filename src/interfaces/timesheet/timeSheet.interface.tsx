interface ITimeSheet {
  empId: string;
  empName: string;
  empTypeName: string;
  workingDate: Date;
  workShiftId: string;
  workingHours: number;
  overtimeWorkingHours: number;
}
export default ITimeSheet;
