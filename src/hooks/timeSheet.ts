import IAttendanceRequest from "@/interfaces/timesheet/attendanceRequest";
import ITimeSheet from "@/interfaces/timesheet/timeSheet.interface";
import {
  attendance,
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

export const useAttendance = () => {
  return useMutation({
    mutationFn: (data: IAttendanceRequest) => attendance(data),
  });
};
