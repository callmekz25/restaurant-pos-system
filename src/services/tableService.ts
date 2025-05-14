import httpRequest from "@/config/axios/axios.config";
import TableStatus from "@/enum/tableStatus";

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
