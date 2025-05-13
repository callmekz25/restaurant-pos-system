import httpRequest from "@/config/axios/axios.config";
import TableStatus from "@/enum/tableStatus";

export const getTables = async (status?: TableStatus) => {
  try {
    const { data } = await httpRequest.get(`/seats/filter?stt=${status ?? ""}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
