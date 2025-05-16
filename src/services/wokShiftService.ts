import httpRequest from "@/config/axios/axios.config";

export const getWorkShifts = async () => {
  try {
    const { data } = await httpRequest.get("/work-shifts");
    return data;
  } catch (error) {
    console.log(error);
  }
};
