import httpRequest from "@/config/axios/axios.config";
import IViolationRecordRequest from "@/interfaces/violationRecord/violationRecordRequest";
export const getVRByEmpIdAndWorkingDate = async (
  empId: string,
  workingDate: string
) => {
  try {
    const { data } = await httpRequest.get(
      `/violation-records/employee/${empId}?workingDate=${workingDate}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addViolationRecord = async (
  request: IViolationRecordRequest[]
) => {
  try {
    const { data } = await httpRequest.post("/violation-records", request);
    return data;
  } catch (error) {
    console.log(error);
  }
};
