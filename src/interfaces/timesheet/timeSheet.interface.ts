interface ITimeSheet {
  empId: string;
  empName: string;
  status: boolean;
  empTypeName: string;
  workingDate: string;
  workShiftId: string;
  workingHours: number;
  overtimeWorkingHours: number;
}

export default ITimeSheet;
