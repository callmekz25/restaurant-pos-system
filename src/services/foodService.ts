import httpRequest from "@/config/axios/axios.config";

export const getFoods = async () => {
  try {
    const { data } = await httpRequest.get("/foods");
    return data;
  } catch (error) {
    console.log(error);
  }
};