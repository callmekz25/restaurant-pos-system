import IViolationRecordRequest from "@/interfaces/violationRecord/violationRecordRequest";
import {
  addViolationRecord,
  getVRByEmpIdAndWorkingDate,
} from "@/services/violationRecordService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetVRByEmpIdAndWorkingDate = (
  empId: string,
  workingDate: string
) => {
  return useQuery({
    queryKey: ["violation-records", empId, workingDate],
    queryFn: () => getVRByEmpIdAndWorkingDate(empId, workingDate),
    enabled: !!empId && !!workingDate,
  });
};
export const useAddViolationRecord = () => {
  return useMutation({
    mutationFn: (request: IViolationRecordRequest[]) =>
      addViolationRecord(request),
  });
};
