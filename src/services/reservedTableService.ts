import httpRequest from "@/config/axios/axios.config";
import IReservedTable from "@/interfaces/table/reservedTable.interface";

export const getReservedTables = async () => {
  try {
    const { data } = await httpRequest.get(`/booked-seats`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createReservedTable = async (requestData: IReservedTable) => {
  try {
    const { data } = await httpRequest.post(`/booked-seats`, requestData);

    return data;
  } catch (error) {
    console.log(error);
  }
};
