import httpRequest from "@/config/axios/axios.config";

export const getFoodTypes = async () => {
  try {
    const { data } = await httpRequest.get("/food-types");
    return data;
  } catch (error) {
    console.log(error);
  }
};