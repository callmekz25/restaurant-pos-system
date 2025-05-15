import IViolationRequest from "../violation/violationRequest";

interface IViolationRecord {
  violationRecordId: string;
  empId: string;
  workingDate: string;
  violation: IViolationRequest;
  violationTime: string;
}
export default IViolationRecord;
