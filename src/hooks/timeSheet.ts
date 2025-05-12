import {
  getTimeSheetByMonth,
  initTimeSheet,
} from "@/services/timeSheetService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTimeSheetByMonth = (month: string, year: string) => {
  return useQuery({
    queryKey: ["time-sheets", month, year],
    queryFn: () => getTimeSheetByMonth(month, year),
    enabled: !!month && !!year,    
  });
};

export const useInitTimeSheet = () => {
  return useMutation({
    mutationFn: initTimeSheet,    
  });
};
