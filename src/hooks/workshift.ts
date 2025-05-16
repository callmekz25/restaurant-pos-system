import { getWorkShifts } from "@/services/wokShiftService";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkShifts = () => {
  return useQuery({
    queryKey: ["workshifts"],
    queryFn: getWorkShifts,
  });
};
