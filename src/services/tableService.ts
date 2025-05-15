import httpRequest from "@/config/axios/axios.config";
import TableStatus from "@/enum/tableStatus";
import toDatetimeLocalString from "@/utils/toDatetimeLocalString";

// GET
export const getTables = async (statusList: TableStatus[]) => {
  try {
    let queryString = "";

    statusList.forEach((status) => {
      queryString += `${queryString == "" ? "" : "&"}stt=${status}`;
    });

    const { data } = await httpRequest.get(`/seats/filter?${queryString}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getReservableTables = async (requestData: {
  resersedDate: string;
  slots: number;
}) => {
  try {
    const { data } = await httpRequest.get(
      `/seats/reservable-seats?rd=${requestData.resersedDate!}&s=${requestData.slots!}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
