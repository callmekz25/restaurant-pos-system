import { getTimeSheetByMonth } from "@/services/timeKeepingService";
import { useQuery } from "@tanstack/react-query";

export const useGetTimeSheetByMonth = (month: string, year: string) => {
  return useQuery({
    queryKey: ["time-sheets", month, year],
    queryFn: () => getTimeSheetByMonth(month, year),
    enabled: !!month && !!year,
  });
};
