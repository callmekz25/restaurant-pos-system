interface ITimeSheetEntry {
  workingDate: string;
  workingHours: number;
  workShiftId: string;
  overtimeWorkingHours: number;
  status: boolean;
}
export default ITimeSheetEntry;
