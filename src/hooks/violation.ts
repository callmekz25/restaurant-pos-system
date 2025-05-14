import IViolationRequest from "@/interfaces/violation/violationRequest";
import { addViolation, getViolations } from "@/services/violationService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetViolations = () => {
  return useQuery({
    queryKey: ["violations"],
    queryFn: getViolations,
  });
};
export const useAddViolation = () => {
  return useMutation({
    mutationFn: (request: IViolationRequest) => addViolation(request),
  });
};
