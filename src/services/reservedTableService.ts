import httpRequest from "@/config/axios/axios.config";

export const getReservedTables = async () => {
  try {
    const { data } = await httpRequest.get(`/booked-seats`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
