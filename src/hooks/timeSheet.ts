import IAttendanceRequest from "@/interfaces/timesheet/attendanceRequest";
import ITimeSheet from "@/interfaces/timesheet/timeSheet.interface";
import {
  absent,
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
    mutationFn: (request: IAttendanceRequest) => attendance(request),
  });
};

export const useAbsent = () => {
  return useMutation({
    mutationFn: (request: IAttendanceRequest) => absent(request),
  });
};
