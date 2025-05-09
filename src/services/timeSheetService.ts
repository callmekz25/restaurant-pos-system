import httpRequest from "@/config/axios/axios.config";

export const getTimeSheetByMonth = async (month: string, year: string) => {
  try {
    const { data } = await httpRequest.get(
      `/timesheets/get-all-by-month?month=${month}&year=${year}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const initTimeSheet = async () => {
  try {
    const { data } = await httpRequest.post("/timesheets/init-timesheet");
    return data;
  } catch (error) {
    console.log(error);
  }
};
